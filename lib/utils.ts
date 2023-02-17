import { ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const baseColors = {
  background_color: "white",
  text_major_color: "black",
  text_minor_2_color: "gray",
  text_minor_color: "white"
}