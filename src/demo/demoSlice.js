import { REF_CODES, REF_USED_PHONES } from './referral-codes';
import { seedInst } from './seeds';
import { TODAY, addDays } from '@/lib/dates';

// Demo-only: the workflow shortcuts in the DemoPanel.
// A Zustand slice: actions read the store with get() and write with get().setState(update, callback).
export const createDemoSlice = (set, get) => ({
  // Stand-ins for server lookups, used by the onboarding slice.
  lookupReferralCode(code) {
    return REF_CODES[code];
  },
  isReferralPhoneUsed(phone) {
    return REF_USED_PHONES.includes(phone);
  },
  newInstructorProfile() {
    return seedInst();
  },
  runFlow(k) {
    const f = { flow: k };
    if (k === 'onboarding') {
      clearTimeout(get().timers.pt);
      get().setState({ ...get().init('onboarding', 'empty'), vw: get().vw, vh: get().vh, ...f });
      return;
    }
    if (k === 'learner') return get().reseed('populated', { tab: 'learners', ...f });
    if (k === 'booking') return get().reseed('populated', f, () => get().openBooking('L1'));
    if (k === 'package')
      return get().reseed('populated', f, () => get().openBooking('L1', { count: 5, disc: '10' }));
    if (k === 'calendar') return get().reseed('populated', { tab: 'calendar', calView: 'week', ...f });
    if (k === 'nav') return get().reseed('populated', { tab: 'home', ...f }, () => get().schedulePush(true));
    if (k === 'sub')
      return get().reseed('populated', { tab: 'more', stack: [{ name: 'subscription' }], ...f });
    if (k === 'referral') return get().reseed('populated', { tab: 'home', ...f });
    if (k === 'refManual') {
      clearTimeout(get().timers.pt);
      get().setState({
        ...get().init('onboarding', 'empty'),
        vw: get().vw,
        vh: get().vh,
        ...f,
        ob: 'register',
      });
      return;
    }
    if (k === 'refQr') return get().startRefOnboarding('NEXDANIEL25', 'qr', f);
    if (k === 'reward')
      return get().reseed('populated', { tab: 'home', ...f }, () =>
        setTimeout(() => get().qualify('R6'), 450),
      );
    if (k === 'credit')
      return get().reseed('populated', {
        tab: 'more',
        stack: [{ name: 'subscription' }, { name: 'upgrade' }],
        upPick: '12m',
        useCredit: true,
        ...f,
      });
    if (k === 'incomplete') return get().reseed('populated', f, () => get().openBooking('L4'));
    if (k === 'conflict')
      return get().reseed('populated', f, () => {
        get().openBooking('L5');
        // pickSlot reads the draft from get(), so wait until the new date is in state.
        setTimeout(() => get().setDraft({ date: addDays(TODAY, 1) }, () => get().pickSlot('10:30')), 30);
      });
    if (k === 'empty') return get().reseed('empty', { tab: 'home', ...f });
  },
});
