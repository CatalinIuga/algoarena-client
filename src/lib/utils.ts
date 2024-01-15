import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
// @ts-expect-error
import { camelize, getCurrentInstance, toHandlerKey } from 'vue'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
