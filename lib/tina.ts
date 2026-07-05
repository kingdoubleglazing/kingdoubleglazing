import { tinaField } from 'tinacms/dist/react'

/**
 * Resolve the TinaCMS inline-edit identifier for a field on a live block/object.
 *
 * `object` must be a node from a `useTina()` result — those carry the internal
 * `_content_source` metadata that Tina uses to map a DOM element back to a form
 * field. Pass the object itself (no `field`) to get the block-level identifier,
 * which makes the whole section selectable in the visual editor so every field —
 * including empty ones, images, booleans and lists — is reachable via the sidebar.
 *
 * Returns `undefined` (rather than `""`) when there's no metadata — e.g. the
 * static JSON fallback render — so the `data-tina-field` attribute is simply
 * omitted instead of emitted empty.
 *
 * @example
 *   <section data-tina-field={tf(block)}>            // select the whole block
 *     <h1 data-tina-field={tf(block, 'headline')}>   // jump straight to a field
 *     {items.map(item => (
 *       <li data-tina-field={tf(item, 'label')}>     // per list-item field
 *     ))}
 */
export function tf(
  object: unknown,
  field?: string,
  index?: number,
): string | undefined {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const id = tinaField(object as any, field as any, index)
  return id || undefined
}
