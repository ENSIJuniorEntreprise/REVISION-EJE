// src/lib/utils.js
// Ported from layout-whiz-kit-main/src/lib/utils.ts
// Used by shadcn/ui components if you choose to add them later.
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
