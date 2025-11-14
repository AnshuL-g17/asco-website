"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Product } from "./products"

export interface InquiryItem {
  product: Product & { selectedVariant?: string; actualPrice?: number }
  quantity: number
  notes?: string
}

interface InquiryCartStore {
  items: InquiryItem[]
  addItem: (product: Product, quantity?: number, notes?: string, actualPrice?: number) => void
  removeItem: (productId: string, variant?: string) => void
  updateQuantity: (productId: string, variant: string | undefined, quantity: number) => void
  updateNotes: (productId: string, variant: string | undefined, notes: string) => void
  updateVariant: (productId: string, oldVariant: string | undefined, newVariant: string) => void
  clearCart: () => void
  getTotalItems: () => number
}

export const useInquiryCart = create<InquiryCartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, quantity = 1, notes = "", actualPrice) => {
        set((state) => {
          const productKey = product.selectedVariant ? `${product.id}-${product.selectedVariant}` : product.id
          const existingItem = state.items.find((item) => {
            const itemKey = item.product.selectedVariant
              ? `${item.product.id}-${item.product.selectedVariant}`
              : item.product.id
            return itemKey === productKey
          })

          if (existingItem) {
            return {
              items: state.items.map((item) => {
                const itemKey = item.product.selectedVariant
                  ? `${item.product.id}-${item.product.selectedVariant}`
                  : item.product.id
                return itemKey === productKey
                  ? {
                      ...item,
                      quantity: item.quantity + quantity,
                      notes: notes || item.notes,
                      product: { ...item.product, actualPrice: actualPrice || item.product.actualPrice },
                    }
                  : item
              }),
            }
          }

          return {
            items: [
              ...state.items,
              {
                product: { ...product, actualPrice },
                quantity,
                notes,
              },
            ],
          }
        })

        if (typeof window !== "undefined") {
          const productName = product.selectedVariant ? `${product.name} (${product.selectedVariant})` : product.name
          const event = new CustomEvent("cart-updated", {
            detail: { message: `${productName} added to inquiry cart` },
          })
          window.dispatchEvent(event)
        }
      },

      removeItem: (productId, variant) => {
        set((state) => ({
          items: state.items.filter((item) => {
            if (variant) {
              return !(item.product.id === productId && item.product.selectedVariant === variant)
            }
            return item.product.id !== productId
          }),
        }))
      },

      updateQuantity: (productId, variant, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId, variant)
          return
        }

        set((state) => ({
          items: state.items.map((item) => {
            const matches = variant
              ? item.product.id === productId && item.product.selectedVariant === variant
              : item.product.id === productId && !item.product.selectedVariant
            return matches ? { ...item, quantity } : item
          }),
        }))
      },

      updateNotes: (productId, variant, notes) => {
        set((state) => ({
          items: state.items.map((item) => {
            const matches = variant
              ? item.product.id === productId && item.product.selectedVariant === variant
              : item.product.id === productId && !item.product.selectedVariant
            return matches ? { ...item, notes } : item
          }),
        }))
      },

      updateVariant: (productId, oldVariant, newVariant) => {
        set((state) => ({
          items: state.items.map((item) => {
            const matches = oldVariant
              ? item.product.id === productId && item.product.selectedVariant === oldVariant
              : item.product.id === productId && !item.product.selectedVariant
            return matches ? { ...item, product: { ...item.product, selectedVariant: newVariant } } : item
          }),
        }))
      },

      clearCart: () => {
        set({ items: [] })
      },

      getTotalItems: () => {
        return get().items.length
      },
    }),
    {
      name: "inquiry-cart-storage",
    },
  ),
)
