import type { Sheet } from '@/types/models';
import { bookingCardView } from '@/hooks/viewHelpers';
import { pad } from '@/lib/dates';
import { useViewContext, type View } from '@/hooks/useViewContext';

// Display values and handlers for the navigate-to-pickup sheet.
export function useMapsView() {
  const { common, store, s } = useViewContext();
  const v: View = { ...common };
  const S: Sheet = s.sheet || ({} as Sheet);
  if (S.type === 'maps') {
    const b = store.booking(S.bid);
    if (b) {
      const q = `${b.loc}, ${b.pc}`;
      v.mp = {
        ...bookingCardView(store, b),
        url: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(q)}&travelmode=driving`,
        storeUrl: 'https://apps.apple.com/gb/app/google-maps/id585027354',
        opened: !!S.opened,
        open: () => store.setState({ sheet: { ...S, opened: true } }),
        copy: () => {
          try {
            navigator.clipboard.writeText(q);
          } catch {
            // Best effort: not available in every browser or context.
          }
          store.showToast('Address copied');
        },
        steps: (
          [
            ['NexDrive', 'Lesson selected'],
            ['Google Maps', 'Opens with destination'],
            ['Destination', b.pc],
            ['Start', 'Tap Start in Maps'],
          ] as const
        ).map((x, i) => ({
          n: pad(i + 1),
          t: x[0],
          d: x[1],
          c: S.opened || i === 0 ? '#7C3AED' : '#CFCFD8',
        })),
      };
    }
  }
  return v;
}
