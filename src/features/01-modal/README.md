# 01 — Modal

A reusable modal built with a portal, a focus trap, and escape-to-close.

## Concepts covered

- **Portals** (`createPortal`) — render outside the parent DOM hierarchy so `overflow: hidden` / `z-index` on ancestors can't clip or bury the modal
- **Focus trap** — Tab/Shift+Tab cycle only within the modal while it's open, instead of escaping into the page behind it
- **Focus restoration** — the element that opened the modal regains focus when it closes
- **Escape to close** + **backdrop click to close**
- **Body scroll lock** while open
- **Accessibility**: `role="dialog"`, `aria-modal="true"`, `aria-labelledby` pointing at the title

## Likely interview follow-ups

- "Why use a portal instead of just rendering the modal in place?" → stacking context / clipping issues from ancestor CSS
- "How would you handle nested modals?" → each modal needs its own focus trap scope; escape should close only the top one
- "What if the modal content changes after open (e.g. async data)?" → re-query focusable elements, or refocus explicitly after content loads
- "How would you test this?" → RTL: assert focus moves in on open, Escape calls `onClose`, Tab wraps at the boundaries
- "What's missing for production?" → animation/transition, `aria-describedby` for longer content, handling multiple simultaneous modals

## Files

- `Modal.jsx` — the reusable component
- `App.jsx` — minimal usage example
- `modal.css`
