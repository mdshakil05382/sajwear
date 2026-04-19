"use client";

import Lottie from "lottie-react";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import { Link, type Locale } from "@/i18n/routing";
import { formatMoney } from "@/lib/format";
import type { PaperbaseOrderCreateResponse } from "@/types/paperbase";

import type { CheckoutMfsSuccessProvider } from "./checkout-storage-keys";

const CHECKOUT_SUCCESS_LOTTIE_URL =
  "/assets/gopay%20succesfull%20payment/animations/12345.json";

function CheckoutSuccessLottie() {
  const [animationData, setAnimationData] = useState<object | null>(null);

  useEffect(() => {
    let cancelled = false;
    void fetch(CHECKOUT_SUCCESS_LOTTIE_URL)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load animation");
        return res.json() as Promise<object>;
      })
      .then((data) => {
        if (!cancelled) setAnimationData(data);
      })
      .catch(() => {
        if (!cancelled) setAnimationData(null);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!animationData) {
    return <div className="mx-auto size-64 max-w-full animate-pulse rounded-lg bg-neutral-100" />;
  }

  return (
    <div className="mx-auto w-full max-w-xs">
      <Lottie animationData={animationData} loop className="size-full max-h-72" />
    </div>
  );
}

export type CheckoutOrderSuccessPaymentMethod = "cod" | "mfs";

type CheckoutOrderSuccessProps = {
  order: PaperbaseOrderCreateResponse;
  paymentMethod: CheckoutOrderSuccessPaymentMethod;
  /** When payment was MFS, which app the customer paid with (from checkout handoff). */
  mfsProvider?: CheckoutMfsSuccessProvider | null;
};

/**
 * Order-placed success panel (Lottie, summary card, actions) — same layout as COD checkout success.
 */
export function CheckoutOrderSuccess({ order, paymentMethod, mfsProvider }: CheckoutOrderSuccessProps) {
  const t = useTranslations("checkout");
  const locale = useLocale() as Locale;

  return (
    <div className="flex flex-col items-center text-center">
      <CheckoutSuccessLottie />
      <h2 className="mt-6 text-xl font-semibold tracking-tight text-neutral-950">{t("orderSuccessTitle")}</h2>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-neutral-600">{t("orderSuccessMessage")}</p>

      <div className="mt-8 w-full max-w-md rounded-lg bg-neutral-50/80 px-4 py-5 text-start md:px-5">
        <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">{t("orderSuccessDeliveryTo")}</p>
        <p className="mt-1 text-sm text-neutral-800">
          <span className="font-semibold text-neutral-950">{order.customer_name}</span>
          <span className="text-neutral-300"> · </span>
          <span className="tabular-nums">{order.phone}</span>
        </p>

        <dl className="mt-5 space-y-3 border-t border-neutral-200/60 pt-5 text-sm">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <dt className="text-neutral-600">{t("orderNumberLabel")}</dt>
            <dd className="font-semibold tabular-nums text-neutral-950">{order.order_number}</dd>
          </div>
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <dt className="text-neutral-600">{t("orderConfirmPaymentMethod")}</dt>
            <dd className="font-medium text-neutral-950">
              {paymentMethod === "cod"
                ? t("paymentMethodCod")
                : mfsProvider === "bkash"
                  ? t("paymentMethodBkash")
                  : mfsProvider === "nagad"
                    ? t("paymentMethodNagad")
                    : t("paymentMethodMfs")}
            </dd>
          </div>
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <dt className="text-neutral-600">{t("total")}</dt>
            <dd className="font-semibold tabular-nums text-neutral-950">{formatMoney(order.total, locale)}</dd>
          </div>
        </dl>

        <div className="mt-5 border-t border-neutral-200/60 pt-4">
          <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">{t("orderSummary")}</p>
          <ul className="mt-2 space-y-2 text-sm text-neutral-700">
            {order.items.slice(0, 3).map((item, index) => (
              <li key={`${item.product_name}-${index}`} className="flex justify-between gap-3">
                <span className="min-w-0 truncate">
                  {item.product_name}
                  <span className="text-neutral-400"> ×{item.quantity}</span>
                </span>
              </li>
            ))}
          </ul>
          {order.items.length > 3 ? (
            <p className="mt-2 text-xs text-neutral-500">
              {t("orderSuccessMoreItems", { count: order.items.length - 3 })}
            </p>
          ) : null}
        </div>
      </div>

      <button
        type="button"
        className="mt-8 inline-flex h-12 w-full max-w-xs items-center justify-center rounded-md border border-neutral-300 bg-white px-6 text-sm font-semibold text-neutral-800 transition-colors hover:bg-neutral-50"
        onClick={() => {
          /* Receipt download — not yet implemented */
        }}
      >
        {t("downloadReceipt")}
      </button>

      <div className="mt-4 flex w-full max-w-xs justify-center">
        <Link
          href="/"
          className="inline-flex h-12 w-full items-center justify-center rounded-md bg-primary px-6 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
        >
          {t("continueShoppingAfterOrder")}
        </Link>
      </div>
    </div>
  );
}
