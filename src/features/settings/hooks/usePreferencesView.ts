import { choiceColors } from '@/lib/inline-styles';
import { useViewContext, type View } from '@/hooks/useViewContext';

// Display values and handlers for the preferences screen.
export function usePreferencesView() {
  const { common, store, s, is, tog } = useViewContext();
  const v: View = { ...common };
  if (is.prefs) {
    const pr = s.prefs;
    const set = (k) => () => store.setState({ prefs: { ...pr, [k]: !pr[k] } });
    v.pp = {
      t: {
        reminder: tog(pr.reminder, set('reminder')),
        bookingAlerts: tog(pr.bookingAlerts, set('bookingAlerts')),
        billing: tog(pr.billing, set('billing')),
        learnerAlerts: tog(pr.learnerAlerts, set('learnerAlerts')),
        askSend: tog(pr.askSend, set('askSend')),
      },
      mins: ['15', '30', '60'].map((x) => ({
        t: x + ' min',
        ...choiceColors(pr.mins === x),
        pick: () => store.setState({ prefs: { ...pr, mins: x } }),
      })),
      chans: ['SMS', 'WhatsApp', 'Email'].map((x) => ({
        t: x,
        ...choiceColors(pr.channel === x),
        pick: () => store.setState({ prefs: { ...pr, channel: x } }),
      })),
      showMins: pr.reminder,
    };
  }
  return v;
}
