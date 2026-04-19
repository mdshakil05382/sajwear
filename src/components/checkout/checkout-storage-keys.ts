import type { PaperbaseOrderCreateResponse } from "@/types/paperbase";

/**
 * sessionStorage key for the shipping-step checkout draft consumed by the payment step.
 */
export const CHECKOUT_DRAFT_STORAGE_KEY = "paperbase-checkout-draft";

/**
 * localStorage key for the last MFS checkout order `public_id` (`ord_...`), set when
 * the user continues from the payment stub so refresh / back navigation can recover the id.
 */
export const MFS_PENDING_ORDER_PUBLIC_ID_KEY = "paperbase-mfs-pending-order-public-id";

export function readMfsPendingOrderPublicId(): string | null {
  if (typeof window === "undefined") return null;
  try {
    const v = window.localStorage.getItem(MFS_PENDING_ORDER_PUBLIC_ID_KEY);
    return v && v.startsWith("ord_") ? v : null;
  } catch {
    return null;
  }
}

export function writeMfsPendingOrderPublicId(publicId: string): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(MFS_PENDING_ORDER_PUBLIC_ID_KEY, publicId);
  } catch {
    /* quota / private mode */
  }
}

export function clearMfsPendingOrderPublicId(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(MFS_PENDING_ORDER_PUBLIC_ID_KEY);
  } catch {
    /* ignore */
  }
}

/**
 * sessionStorage key for the resolved prepayment type for the pending order.
 * Value is one of `ProductPrepaymentType` ("none" | "delivery_only" | "full").
 *
 * Captured at shipping-submit time so the payment step reflects the actual items
 * being ordered even after the Buy Now session map is cleared.
 */
export const CHECKOUT_PREPAYMENT_STORAGE_KEY = "paperbase-checkout-prepayment";

/**
 * One-shot handoff from `/checkout/payment/mfs` to `/checkout/payment` when an order
 * completes without `requires_payment` so the payment page can show the success state.
 */
export const CHECKOUT_SUCCESS_HANDOFF_KEY = "paperbase-checkout-success-handoff";

export type CheckoutMfsSuccessProvider = "bkash" | "nagad";

export type CheckoutSuccessHandoffPayload = {
  order: PaperbaseOrderCreateResponse;
  payment_method: "cod" | "mfs";
  /** Present when `payment_method` is MFS so the success screen can show bKash vs Nagad. */
  mfs_provider?: CheckoutMfsSuccessProvider;
};

/**
 * In-memory copy survives React Strict Mode remounts: the first effect pass reads
 * sessionStorage and clears it; the second pass must still see the same payload.
 * Cleared after the payment page applies it to React state (see `clearCheckoutSuccessHandoffMemory`).
 */
let checkoutSuccessHandoffMemory: CheckoutSuccessHandoffPayload | null = null;

/** Read and consume sessionStorage handoff, or replay from memory after Strict remount. */
export function peekCheckoutSuccessHandoff(): CheckoutSuccessHandoffPayload | null {
  if (typeof window === "undefined") return checkoutSuccessHandoffMemory;
  const raw = window.sessionStorage.getItem(CHECKOUT_SUCCESS_HANDOFF_KEY);
  if (raw) {
    try {
      checkoutSuccessHandoffMemory = JSON.parse(raw) as CheckoutSuccessHandoffPayload;
      window.sessionStorage.removeItem(CHECKOUT_SUCCESS_HANDOFF_KEY);
    } catch {
      window.sessionStorage.removeItem(CHECKOUT_SUCCESS_HANDOFF_KEY);
      checkoutSuccessHandoffMemory = null;
    }
  }
  return checkoutSuccessHandoffMemory;
}

export function clearCheckoutSuccessHandoffMemory(): void {
  checkoutSuccessHandoffMemory = null;
}
