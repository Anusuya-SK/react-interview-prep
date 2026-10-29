# 02 — Multi-step Form

A 3-step form wizard (personal info → address → review) built with one shared state object and controlled inputs.

## Concepts covered

- **Step as a number** — `step` state (`0`, `1`, `2`) drives which part of the form renders
  - `{step === 0 && <div>...</div>}` → `===` returns a boolean, `&&` short-circuits, React renders nothing for `false`
  - Same idea as the Modal's `isOpen`, but compared against a number instead of a boolean
  - Trap: `{items.length && <List />}` prints a stray `0` when empty. Use `items.length > 0 && ...`
- **Edge guards** — Back is `disabled` on the first step, Next is `disabled` on the last step, so `step` can never go to `-1` or `3`
- **One shared `formData` object** — all fields live in a single state object instead of one `useState` per field
  - Data survives Back / Next because the state lives in the parent component, not inside each step
  - The review step needs no new state, it just reads `formData`
- **Controlled inputs** — `value={formData.x}` + `onChange` keeps the screen and the state in sync
  - Hardcoded `value=""` with no `onChange` makes an input impossible to type in
  - The spread `{ ...formData, [key]: value }` copies the other fields. Without it, state is replaced (not merged) and the other fields are wiped
- **Single `handleChange` for every input** — each input has a `name` matching its key in `formData`, and the handler uses `e.target.name` / `e.target.value` with a computed key `[e.target.name]`
- **Label + input linking** — `htmlFor` on the label matches the `id` on the input, so clicking a label focuses its input (accessibility)
- **Arrow functions have two forms**
  - `=> ( ... )` is an implicit return. The value inside the parentheses is returned automatically
  - `=> { ... }` is a function body. Nothing is returned unless you write `return`
  - Bug to remember: `.map(x => { <div /> })` returns `undefined` for every item, so the list renders nothing and there is no error
- **Rendering the review from data** — `Object.entries(formData).map(([key, value]) => (...))` with `key={key}`, inside a `<dl>` with `<dt>` / `<dd>` instead of `<br />` for spacing

## Likely interview follow-ups

- Why one `formData` object instead of separate state per field?
- If I click Back then Next, does the typed data survive? Why? (state lives in the parent, not in each step)
- Why does `setFormData({ name: value })` lose the other fields?
- What is the difference between `=> ( )` and `=> { }`? Why does `.map` with braces and no `return` render nothing?
- Why `key={key}` and not the array index?
- Why is `disabled={step === 0}` a plain expression and not its own `useState`? (derived value, computed on every render)
- How would you add a progress indicator without adding new state? (derive it from `step`)
- How would you scale this to 10 steps? (a config array of steps with fields and a generic validator)
- Where would validation live, in the Next handler or a separate `validate()` function? Trade-offs?

## Not implemented yet

- Submit button and success message on the last step

## Files

- `MultiStepForm.jsx` — the form component
- `multistep-form.css` — styles
- `App.jsx` — feature-level wrapper used by the root switcher
