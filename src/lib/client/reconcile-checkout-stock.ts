import { apiFetchJson } from "@/lib/client/api";
import type { CartLineMutationScope } from "@/lib/store/cart-store";
import type { CartItem } from "@/types/cart";
import type { ProductDetail } from "@/types/product";

/** Matches `POST /api/v1/orders/` line quantity cap (STOREFRONT_INTEGRATION §7.16). */
const API_MAX_QTY = 1000;

function productRequestId(item: CartItem): string {
  return item.product_slug ?? item.product_public_id;
}

async function fetchProductDetail(item: CartItem): Promise<ProductDetail | null> {
  const id = productRequestId(item);
  try {
    return await apiFetchJson<ProductDetail>(`/products/${encodeURIComponent(id)}`);
  } catch {
    return null;
  }
}

export function effectiveLineCapacity(detail: ProductDetail, item: CartItem): { ok: boolean; max: number } {
  const variants = detail.variants ?? [];
  if (variants.length > 0) {
    const vid = item.variant_public_id;
    if (!vid) return { ok: false, max: 0 };
    const v = variants.find((x) => x.public_id === vid);
    if (!v) return { ok: false, max: 0 };
    if (v.stock_status === "out_of_stock" || v.available_quantity <= 0) {
      return { ok: false, max: 0 };
    }
    if (!detail.stock_tracking) return { ok: true, max: API_MAX_QTY };
    return { ok: true, max: Math.min(v.available_quantity, API_MAX_QTY) };
  }
  if (detail.stock_tracking) {
    if (detail.stock_status === "out_of_stock" || detail.available_quantity <= 0) {
      return { ok: false, max: 0 };
    }
    return { ok: true, max: Math.min(detail.available_quantity, API_MAX_QTY) };
  }
  return { ok: true, max: API_MAX_QTY };
}

/**
 * Re-reads product detail for each cart line and removes or clamps lines so the client
 * cart matches current availability before `POST /pricing/breakdown/` (via `/checkout/initiate`).
 */
export async function reconcileCheckoutStock(
  items: CartItem[],
  opts: {
    setLineQuantity: (
      productPublicId: string,
      variantPublicId: string | undefined,
      quantity: number,
      scope: CartLineMutationScope,
      patch?: { max_quantity?: number; unsetMaxQuantity?: boolean },
    ) => void;
    scope: CartLineMutationScope;
  },
): Promise<boolean> {
  if (items.length === 0) return false;

  const productIds = [...new Set(items.map((i) => i.product_public_id))];
  const detailByPid = new Map<string, ProductDetail>();

  await Promise.all(
    productIds.map(async (pid) => {
      const line = items.find((i) => i.product_public_id === pid);
      if (!line) return;
      const detail = await fetchProductDetail(line);
      if (detail) detailByPid.set(pid, detail);
    }),
  );

  let changed = false;

  for (const item of items) {
    const detail = detailByPid.get(item.product_public_id);
    if (!detail) {
      opts.setLineQuantity(item.product_public_id, item.variant_public_id, 0, opts.scope);
      changed = true;
      continue;
    }

    const { ok, max } = effectiveLineCapacity(detail, item);
    if (!ok) {
      opts.setLineQuantity(item.product_public_id, item.variant_public_id, 0, opts.scope);
      changed = true;
      continue;
    }

    const nextQty = Math.min(item.quantity, max);
    const shouldUnsetMax = !detail.stock_tracking && item.max_quantity != null;
    const nextMax = detail.stock_tracking ? max : undefined;
    const maxMetaChanged = shouldUnsetMax || (detail.stock_tracking && item.max_quantity !== nextMax);

    if (nextQty !== item.quantity || maxMetaChanged) {
      opts.setLineQuantity(item.product_public_id, item.variant_public_id, nextQty, opts.scope, {
        ...(shouldUnsetMax ? { unsetMaxQuantity: true } : {}),
        ...(detail.stock_tracking ? { max_quantity: nextMax } : {}),
      });
      changed = true;
    }
  }

  return changed;
}
