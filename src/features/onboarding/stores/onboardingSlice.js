import { generateReferralCode } from '@/domain/referrals';
import { TODAY, addDays, addMonths, formatDate, formatDayMonth, formatShortDateYear } from '@/lib/dates';
import { isValidEmail, isValidUkMobile } from '@/lib/validation';

// Onboarding: registration, phone verification, instructor details, plan, referral code.
// A Zustand slice: actions read the store with get() and write with get().setState(update, callback).
export const createOnboardingSlice = (set, get) => ({
  checkRef(code) {
    const c = (code || '').trim().toUpperCase().replace(/\s/g, '');
    if (!c) return null;
    // The code lookup is provided by the demo slice until the API exists.
    const r = get().lookupReferralCode(c);
    if (!r) return 'invalid';
    if (!r.active) return 'inactive';
    const ph = (get().reg.phone || '').replace(/\D/g, '').replace(/^44/, '0');
    const em = (get().reg.email || '').trim().toLowerCase();
    if ((r.phone && ph === r.phone) || (r.email && em === r.email)) return 'self';
    if (get().isReferralPhoneUsed(ph)) return 'used';
    return 'valid';
  },
  startRefOnboarding(code, via, extra = {}) {
    clearTimeout(get().timers.pt);
    const n = get().init('onboarding', 'empty');
    get().setState({ ...n, vw: get().vw, vh: get().vh, ...extra, ref: { code, status: null, via } }, () =>
      get().setState((st) => ({ ref: { ...st.ref, status: get().checkRef(code) } })),
    );
  },
  regErr(r) {
    const e = {};
    if (!r.name.trim()) e.name = 'Enter your full name';
    if (!isValidUkMobile(r.phone))
      e.phone = r.phone.trim() ? 'Enter a UK mobile number, like 07700 900123' : 'Enter your mobile number';
    if (!isValidEmail(r.email))
      e.email = r.email.trim()
        ? 'Enter a valid email address, like name@example.co.uk'
        : 'Enter your email address';
    if (r.password.length < 8 || !/\d/.test(r.password) || !/[a-z]/i.test(r.password)) e.password = 'x';
    if (!r.terms) e.terms = 'Accept the terms to continue';
    return e;
  },
  detErr(d) {
    const e = {};
    if (!/^\d{6}$/.test(d.adi.trim()))
      e.adi = d.adi.trim()
        ? 'ADI numbers are 6 digits — check your badge'
        : 'Enter your ADI registration number';
    if (
      !d.areas
        .split(',')
        .map((x) => x.trim())
        .filter(Boolean).length
    )
      e.areas = 'Add at least one postcode area';
    if (!(parseFloat(d.rate) > 0)) e.rate = 'Enter an hourly rate above £0';
    return e;
  },
  obNext() {
    const s = get();
    if (s.ob === 'register') {
      const rs = s.ref.code.trim() ? get().checkRef(s.ref.code) : null;
      if (rs !== s.ref.status) get().setState({ ref: { ...s.ref, status: rs } });
      if (Object.keys(get().regErr(s.reg)).length) return get().setState({ regTried: true });
      if (rs && rs !== 'valid') return;
      return get().setState({ ob: 'verify', otp: '', otpErr: '' });
    }
    if (s.ob === 'verify') {
      if (s.otp.replace(/\D/g, '') === '482913') return get().setState({ ob: 'details' });
      return get().setState({
        otpErr:
          s.otp.length < 6 ? 'Enter all 6 digits' : 'That code doesn’t match. Check the SMS and try again.',
      });
    }
    if (s.ob === 'details') {
      if (Object.keys(get().detErr(s.det)).length) return get().setState({ detTried: true });
      return get().setState({ ob: 'plan' });
    }
    if (s.ob === 'plan') {
      if (!s.obCard) return get().setState({ obCardTried: true });
      return get().setState({ ob: 'started' });
    }
  },
  obBack() {
    const order = ['welcome', 'register', 'verify', 'details', 'plan', 'started'];
    const i = order.indexOf(get().ob);
    get().setState({ ob: order[Math.max(0, i - 1)] });
  },
  finishOb(add) {
    const s = get();
    const r = s.reg,
      d = s.det;
    const name = r.name.trim() || 'Daniel Wilson';
    const inst = {
      ...get().newInstructorProfile(),
      name,
      phone: r.phone || '07700 900123',
      email: r.email || 'daniel@wilsondriving.co.uk',
      adi: d.adi || '482913',
      status: d.status,
      business: d.business,
      areas: d.areas
        .split(',')
        .map((x) => x.trim().toUpperCase())
        .filter(Boolean),
      defaultDur: d.dur,
    };
    inst.rates = inst.rates.map((x) => (x.key === 'std' ? { ...x, rate: parseFloat(d.rate) || 40 } : x));
    const n = get().init('app', 'empty');
    get().setState(
      {
        ...n,
        vw: s.vw,
        vh: s.vh,
        inst,
        sub: {
          plan: s.obPlan,
          state: 'trial',
          trialEnd: addDays(TODAY, 14),
          start: TODAY,
          card: 'Visa •••• 4242',
          refBonus: s.ref.status === 'valid',
        },
        refCode: generateReferralCode(name),
        notifs: [
          ...(s.ref.status === 'valid'
            ? [
                {
                  id: 'nr0',
                  cat: 'rewards',
                  icon: 'gift',
                  title: 'Referral applied — 1 month free',
                  body: `Thanks to your referral, your free month runs from ${formatDayMonth(addDays(TODAY, 14))} to ${formatDate(addMonths(addDays(TODAY, 14), 1))}, straight after your 14-day trial.`,
                  time: 'now',
                  unread: true,
                  act: { screen: 'subscription' },
                },
              ]
            : []),
          {
            id: 'n0',
            cat: 'billing',
            icon: 'check',
            title: 'Your 14-day free trial has started',
            body: `Full access until ${formatShortDateYear(addDays(TODAY, 14))}. Cancel any time in Account → Subscription.`,
            time: 'now',
            unread: true,
            act: { screen: 'subscription' },
          },
        ],
      },
      () => {
        if (add) get().openLearnerForm(null, null);
      },
    );
  },
});
