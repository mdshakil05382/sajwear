"use client";

import { create } from "zustand";

type AddedProductSummary = {
  name: string;
  image_url: string | null;
  variant_details?: string;
};

type AddToCartDialogState = {
  open: boolean;
  product: AddedProductSummary | null;
  openDialog: (product: AddedProductSummary) => void;
  closeDialog: () => void;
};

export const useAddToCartDialogStore = create<AddToCartDialogState>((set) => ({
  open: false,
  product: null,
  openDialog: (product) => set({ open: true, product }),
  closeDialog: () => set({ open: false }),
}));

