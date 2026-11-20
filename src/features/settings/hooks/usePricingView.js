import { formatDurationLong } from '@/lib/dates';
import { formatGBP } from '@/lib/format';
import { BORDER_COLOR, ERROR_COLOR, choiceColors } from '@/lib/inline-styles';
import { useViewContext } from '@/hooks/useViewContext';

// Display values and handlers for the pricing form.
export function usePricingView() {
  const { common, store, s, is } = useViewContext();
  const v = { ...common };
  if (is.pricing && s.priceForm) {
    const f = s.priceForm;
    const std = parseFloat(f.rates[0].rate) || 0;
    const bad = f.rates.some((r) => !(parseFloat(r.rate) > 0));
    v.pr = {
      rates: f.rates.map((r, i) => ({
        label: r.label,
        note: i === 0 ? 'Default for new bookings' : 'Optional session rate',
        rate: r.rate,
        bd: !(parseFloat(r.rate) > 0) ? ERROR_COLOR : BORDER_COLOR,
        h: (e) => {
          const rates = f.rates.map((x, j) =>
            j === i ? { ...x, rate: e.target.value.replace(/[^\d.]/g, '') } : x,
          );
          store.setState({ priceForm: { ...f, rates } });
        },
      })),
      durs: [
        [1, '1 hour'],
        [1.5, '1.5 hours'],
        [2, '2 hours'],
      ].map((x) => ({
        t: x[1],
        ...choiceColors(f.dur === x[0]),
        pick: () => store.setState({ priceForm: { ...f, dur: x[0] } }),
      })),
      preview: [1, 2, 3].map((x) => ({ k: formatDurationLong(x), v: formatGBP(std * x) })),
      save: () => {
        if (bad) return store.showToast('Enter a price above £0 for every rate', 'err');
        store.setState({
          inst: {
            ...s.inst,
            defaultDur: f.dur,
            rates: f.rates.map((r) => ({ ...r, rate: parseFloat(r.rate) })),
          },
        });
        store.back();
        store.showToast(`Prices saved · new bookings use ${formatGBP(std)}/hr`);
      },
    };
  }
  return v;
}
