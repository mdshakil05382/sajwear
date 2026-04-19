import { apiFetchJson } from "@/lib/client/api";
import type {
  PaperbaseOrderCreateRequest,
  PaperbaseOrderCreateResponse,
  PaperbasePaymentSubmitRequest,
} from "@/types/paperbase";

export function createMfsOrder(
  draft: PaperbaseOrderCreateRequest,
): Promise<PaperbaseOrderCreateResponse> {
  return apiFetchJson<PaperbaseOrderCreateResponse>("/checkout/order", {
    method: "POST",
    body: JSON.stringify({ ...draft, payment_method: "mfs" as const }),
  });
}

export function submitMfsPayment(
  publicId: string,
  body: PaperbasePaymentSubmitRequest,
): Promise<PaperbaseOrderCreateResponse> {
  return apiFetchJson<PaperbaseOrderCreateResponse>(`/orders/${publicId}/payment`, {
    method: "POST",
    body: JSON.stringify(body),
  });
}
