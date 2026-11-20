import { BORDER_COLOR, ERROR_COLOR } from '@/lib/inline-styles';
import { useViewContext } from '@/hooks/useViewContext';

// Display values and handlers for the add / edit learner form.
export function useLearnerFormView() {
  const { common, store, s, is } = useViewContext();
  const v = { ...common };
  if (is.learnerForm && s.lf) {
    const l = s.lf;
    const strict = s.lfStrict || s.lfRet === 'booking';
    const e = s.lfTried ? store.lfErr(l, strict) : {};
    const f = (k) => store.setIn('lf', k);
    const n = Object.keys(e).length;
    const b = {};
    ['name', 'phone', 'email', 'address', 'postcode', 'licence', 'theory'].forEach(
      (k) => (b[k] = e[k] ? ERROR_COLOR : BORDER_COLOR),
    );
    v.lfm = {
      title: l.id ? 'Edit learner' : 'Add learner',
      l,
      e,
      b,
      h: {
        name: f('name'),
        phone: f('phone'),
        email: f('email'),
        address: f('address'),
        postcode: f('postcode'),
        licence: f('licence'),
        theory: f('theory'),
        notes: f('notes'),
      },
      fromBooking: s.lfRet === 'booking',
      hasErr: n > 0,
      errText: `Check ${n} field${n > 1 ? 's' : ''} highlighted below`,
      save: () => store.saveLearner(false),
      saveBook: () => store.saveLearner(true),
      primary: s.lfRet === 'booking' ? 'Save & continue booking' : 'Save & schedule lesson',
      showSecondary: s.lfRet !== 'booking',
      secondary: l.id ? 'Save changes' : 'Save learner',
    };
  }
  return v;
}
