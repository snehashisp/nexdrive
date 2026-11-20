import type { SettingsActions, SliceCreator } from '@/types/store';
// Account settings.
// A Zustand slice: actions read the store with get() and write with get().setState(update, callback).
export const createSettingsSlice: SliceCreator<SettingsActions> = (_set, get) => ({
  openProfile() {
    const s = get();
    get().setState({ profForm: { ...s.inst, areas: s.inst.areas.join(', ') }, profTried: false });
    get().pushScreen('profile');
  },
  openPricing() {
    const s = get();
    get().setState({
      priceForm: {
        rates: s.inst.rates.map((r) => ({ ...r, rate: String(r.rate) })),
        dur: s.inst.defaultDur,
      },
    });
    get().pushScreen('pricing');
  },
  // From the Account tab. (goBank, used from booking messages, also leaves edit mode.)
  openBankDetails() {
    const s = get();
    get().setState({
      bankForm: s.bank ? { ...s.bank } : { holder: s.inst.name, sort: '', acct: '', include: true },
      bankTried: false,
      bankReveal: false,
    });
    get().pushScreen('bank');
  },
  openSecurity() {
    get().setState({ pw: null, pwTried: false });
    get().pushScreen('security');
  },
  goBank() {
    const s = get();
    get().setState({
      bankForm: s.bank ? { ...s.bank } : { holder: s.inst.name, sort: '', acct: '', include: true },
      bankTried: false,
      bankReveal: false,
      bankEdit: false,
    });
    get().pushScreen('bank');
  },
});
