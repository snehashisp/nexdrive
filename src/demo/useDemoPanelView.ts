import { FLOWS } from './flows';
import { useViewContext } from '@/hooks/useViewContext';
import { TODAY, currentTimeHHMM, formatFullDate, pad } from '@/lib/dates';

// Display values and handlers for the demo workflow panel.
export function useDemoPanelView() {
  const { store, s, ics } = useViewContext();
  return {
    ics,
    clockLabel: `${formatFullDate(TODAY)}, ${currentTimeHHMM()}`,
    flows: FLOWS.map((f, i) => ({
      num: pad(i + 1),
      title: f[1],
      steps: f[2],
      bg: s.flow === f[0] ? '#F3EEFF' : 'transparent',
      go: () => store.runFlow(f[0]),
    })),
    replaySplash: () => store.startSplash(),
  };
}
