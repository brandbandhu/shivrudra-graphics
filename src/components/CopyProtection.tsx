"use client";

import { useEffect } from "react";

const protectedSelector =
  ".protected-content, .protected-media, .product-card, .client-logo, img";

function isEditable(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) {
    return false;
  }

  return Boolean(
    target.closest("input, textarea, select, button, a, [contenteditable='true']"),
  );
}

function isProtected(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) {
    return false;
  }

  return Boolean(target.closest(protectedSelector));
}

export function CopyProtection() {
  useEffect(() => {
    const blockContext = (event: MouseEvent) => {
      if (!isEditable(event.target) || isProtected(event.target)) {
        event.preventDefault();
      }
    };

    const blockDrag = (event: DragEvent) => {
      if (isProtected(event.target)) {
        event.preventDefault();
      }
    };

    const blockCopy = (event: ClipboardEvent) => {
      if (!isEditable(event.target) || isProtected(event.target)) {
        event.preventDefault();
      }
    };

    const blockSelect = (event: Event) => {
      if (!isEditable(event.target) && isProtected(event.target)) {
        event.preventDefault();
      }
    };

    document.addEventListener("contextmenu", blockContext);
    document.addEventListener("dragstart", blockDrag);
    document.addEventListener("copy", blockCopy);
    document.addEventListener("cut", blockCopy);
    document.addEventListener("selectstart", blockSelect);

    return () => {
      document.removeEventListener("contextmenu", blockContext);
      document.removeEventListener("dragstart", blockDrag);
      document.removeEventListener("copy", blockCopy);
      document.removeEventListener("cut", blockCopy);
      document.removeEventListener("selectstart", blockSelect);
    };
  }, []);

  return null;
}
