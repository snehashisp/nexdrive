import type { SettingsActions, SliceCreator } from '@/types/store';
// Account settings.
// A Zustand slice: actions read the store with get() and write with get().setState(update, callback).
export const createSettingsSlice: SliceCreator<SettingsActions> = (_set, get) => ({
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
