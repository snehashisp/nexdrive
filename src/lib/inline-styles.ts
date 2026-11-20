// Shared colour helpers for inline styles. Temporary: these go away as components move to CSS Modules.

/** Colours for a selectable chip/option: violet when selected, white otherwise. */
export const choiceColors = (selected: boolean) => ({
  bg: selected ? '#7C3AED' : '#FFFFFF',
  fg: selected ? '#FFFFFF' : '#0A0A0F',
  bd: selected ? '#7C3AED' : '#CFCFD8',
});
/** Border for a radio-style circle. */
export const radioRing = (selected: boolean): string =>
  selected ? '6px solid #7C3AED' : '1.5px solid #6B6B7B';
export const ERROR_COLOR = '#B91C1C';
export const BORDER_COLOR = '#CFCFD8';
