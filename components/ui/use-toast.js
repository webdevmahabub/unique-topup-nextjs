"use client";

import * as React from "react";
import { toast as sonnerToast, Toaster } from "sonner";

export function useToast() {
  return {
    toast: ({ title, description, ...props }) => {
      sonnerToast(title, {
        description,
        ...props,
      });
    },
  };
}

export { Toaster };