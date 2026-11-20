import { PLANS, planPeriodLabel, planSaving, planTermLabel } from '@/domain/plans';
import {
  TODAY,
  addDays,
  addMonths,
  formatDate,
  formatDayMonth,
  formatDayMonthLong,
  formatShortDateYear,
  ordinal,
  parseIsoDate,
} from '@/lib/dates';
import { formatGBP } from '@/lib/format';
import { BORDER_COLOR, ERROR_COLOR, choiceColors, radioRing } from '@/lib/inline-styles';
import { useViewContext, type View } from '@/hooks/useViewContext';

// Display values and handlers for the onboarding screens, header and footer.
export function useOnboardingView() {
  const { common, store, s } = useViewContext();
  const v: View = { ...common };
  const regE = s.regTried ? store.regErr(s.reg) : {};
  delete regE.password;
  v.reg = s.reg;
  v.regE = regE;
  v.regB = {
    name: regE.name ? ERROR_COLOR : BORDER_COLOR,
    phone: regE.phone ? ERROR_COLOR : BORDER_COLOR,
    email: regE.email ? ERROR_COLOR : BORDER_COLOR,
    password: s.regTried && store.regErr(s.reg).password ? ERROR_COLOR : BORDER_COLOR,
  };
  v.hReg = {
    name: store.setIn('reg', 'name'),
    phone: store.setIn('reg', 'phone'),
    email: store.setIn('reg', 'email'),
    password: store.setIn('reg', 'password'),
    terms: store.setIn('reg', 'terms'),
  };
  const pw = s.reg.password;
  const rc = (ok) => (ok ? '#166534' : s.regTried ? ERROR_COLOR : '#6B6B7B');
  v.pwRules = [
    { t: '8+ characters', c: rc(pw.length >= 8) },
    { t: 'A letter', c: rc(/[a-z]/i.test(pw)) },
    { t: 'A number', c: rc(/\d/.test(pw)) },
  ];
  v.sampleReg = () => store.fillSampleRegistration();
  v.obGo = { register: () => store.setState({ ob: 'register' }) };
  v.obLogin = () => store.reseed('populated', { tab: 'home' });
  v.obBack = () => store.obBack();
  v.obHeader = ['register', 'verify', 'details', 'plan'].includes(s.ob) && s.phase === 'onboarding';
  const si = ['register', 'verify', 'details', 'plan'].indexOf(s.ob);
  v.step = {
    label: `Step ${si + 1} of 4`,
    bars: [0, 1, 2, 3].map((i) => ({ c: i <= si ? '#7C3AED' : '#E7E7EC' })),
  };
  v.otp = s.otp;
  v.otpErr = s.otpErr;
  v.otpB = s.otpErr ? ERROR_COLOR : BORDER_COLOR;
  v.hOtp = (e) => store.setState({ otp: e.target.value.replace(/\D/g, '').slice(0, 6), otpErr: '' });
  v.fillOtp = () => store.setState({ otp: '482913', otpErr: '' });
  v.resendOtp = () => {
    store.setState({ resent: true });
    store.showToast('New code sent to ' + (s.reg.phone || 'your mobile'));
  };
  v.resendLabel = s.resent ? 'Code resent — resend again' : 'Resend code';
  const detE = s.detTried ? store.detErr(s.det) : {};
  v.det = s.det;
  v.detE = detE;
  v.detB = {
    adi: detE.adi ? ERROR_COLOR : BORDER_COLOR,
    areas: detE.areas ? ERROR_COLOR : BORDER_COLOR,
    rate: detE.rate ? ERROR_COLOR : BORDER_COLOR,
  };
  v.hDet = {
    adi: (e) => store.setState({ det: { ...s.det, adi: e.target.value.replace(/\D/g, '').slice(0, 6) } }),
    business: store.setIn('det', 'business'),
    areas: store.setIn('det', 'areas'),
    rate: store.setIn('det', 'rate'),
  };
  v.detStatus = (
    [
      ['adi', 'Approved Driving Instructor', 'Fully qualified · green badge', '#16A34A'],
      ['pdi', 'Trainee instructor (PDI)', 'Trainee licence · pink badge', '#EC4899'],
    ] as const
  ).map((o) => ({
    t: o[1],
    d: o[2],
    badge: o[3],
    bd: s.det.status === o[0] ? '#7C3AED' : BORDER_COLOR,
    ring: radioRing(s.det.status === o[0]),
    pick: () => store.setState({ det: { ...s.det, status: o[0] } }),
  }));
  v.detDur = (
    [
      [1, '1h'],
      [1.5, '1.5h'],
      [2, '2h'],
    ] as const
  ).map((o) => {
    const c = choiceColors(s.det.dur === o[0]);
    return { t: o[1], bg: c.bg, fg: c.fg, pick: () => store.setState({ det: { ...s.det, dur: o[0] } }) };
  });
  const obp = PLANS.find((x) => x.key === s.obPlan);
  const rst = s.ref.status,
    refOk = rst === 'valid',
    rcd = store.lookupReferralCode((s.ref.code || '').toUpperCase());
  const REFMSG = {
    invalid: 'This referral code is not valid. Please check the code and try again.',
    inactive: 'This referral code is no longer active.',
    used: 'This referral code has already been used.',
    self: 'This referral code cannot be used with this account.',
  };
  v.rfo = {
    code: s.ref.code,
    ok: refOk,
    err: REFMSG[rst] || '',
    bd: refOk ? '#16A34A' : REFMSG[rst] ? ERROR_COLOR : BORDER_COLOR,
    showApply: !refOk,
    by: rcd ? rcd.owner : '',
    h: (e) =>
      store.setState({
        ref: {
          code: e.target.value
            .toUpperCase()
            .replace(/[^A-Z0-9]/g, '')
            .slice(0, 16),
          status: null,
          via: null,
        },
      }),
    apply: () => {
      if (!s.ref.code.trim()) return store.setState({ ref: { ...s.ref, status: 'invalid' } });
      store.setState({ ref: { ...s.ref, via: s.ref.via || 'manual', status: store.checkRef(s.ref.code) } });
    },
    remove: () => store.setState({ ref: { code: '', status: null, via: null } }),
    hint:
      store.cfg().showDemoPanel !== false && !refOk
        ? 'Demo: NEXDANIEL25 is valid · NEXMARK14 is no longer active · mobile 07700 900301 has already used a referral · Daniel’s own number (07700 900123) is a self-referral.'
        : '',
  };
  v.obInvite =
    refOk && (s.ref.via === 'qr' || s.ref.via === 'link')
      ? { code: s.ref.code, by: rcd ? rcd.owner : '', byCaps: (rcd ? rcd.owner : '').toUpperCase() }
      : null;
  v.obPlans = PLANS.map((pl) => {
    const sel = pl.key === s.obPlan;
    return {
      name: pl.name,
      term: planTermLabel(pl),
      price: formatGBP(pl.total),
      per: planPeriodLabel(pl),
      ref: refOk,
      save: planSaving(pl) ? `Save ${formatGBP(planSaving(pl))}` : '',
      bg: sel ? '#F7F5FF' : '#FFFFFF',
      bd: sel ? '2px solid #7C3AED' : '1.5px solid #CFCFD8',
      ring: radioRing(sel),
      pick: () => store.setState({ obPlan: pl.key }),
    };
  });
  v.obCard = s.obCard;
  v.obNoCard = !s.obCard;
  v.obCardErr = s.obCardTried && !s.obCard;
  v.obCardB = v.obCardErr ? ERROR_COLOR : '#6B6B7B';
  v.addCard = () => {
    store.setState({ obCard: true });
    store.showToast('Card saved. You won’t be charged today.');
  };
  const first = (s.reg.name.trim() || 'Daniel').split(' ')[0];
  const tE = addDays(TODAY, 14),
    fE = addMonths(tE, 1),
    fpD = refOk ? fE : tE;
  const ofp = formatDayMonth(fpD);
  v.obSum = {
    first,
    until: formatDayMonthLong(fpD),
    ref: refOk ? { code: s.ref.code, first: formatShortDateYear(fE) } : null,
    tl: refOk
      ? [
          { d: 'Today', t: 'Your 14-day free trial starts. £0 due today.', c: '#6D28D9' },
          { d: formatDayMonth(tE), t: 'Trial ends and your free referral month begins.', c: '#6D28D9' },
          {
            d: formatDayMonth(addDays(fE, -3)),
            t: 'We remind you 3 days before your first payment.',
            c: '#4A4A5A',
          },
          {
            d: formatDayMonth(fE),
            t: `First payment of ${formatGBP(obp.total)} for your ${obp.name.toLowerCase()} plan, unless you cancel.`,
            c: '#4A4A5A',
          },
        ]
      : [
          { d: 'Today', t: 'Trial starts. £0 due today.', c: '#6D28D9' },
          {
            d: formatDayMonth(addDays(tE, -3)),
            t: 'We remind you 3 days before your trial ends.',
            c: '#4A4A5A',
          },
          {
            d: formatDayMonth(tE),
            t: `First payment of ${formatGBP(obp.total)} for your ${obp.name.toLowerCase()} plan, unless you cancel.`,
            c: '#4A4A5A',
          },
        ],
    renew:
      obp.months === 1
        ? `After your ${refOk ? 'trial and free month' : 'trial'}, ${formatGBP(obp.total)} is taken every month on the ${ordinal(parseIsoDate(fpD).getUTCDate())} until you cancel.`
        : `After your ${refOk ? 'trial and free month' : 'trial'}, ${formatGBP(obp.total)} is taken for your ${obp.months}-month term. At the end of the term it renews for another ${obp.months} months at the same price unless you cancel.`,
    rows: [
      { k: 'Plan', v: `${obp.name} · ${formatGBP(obp.total)}` },
      { k: 'Trial ends', v: formatShortDateYear(tE) },
      ...(refOk ? [{ k: 'Referral free month', v: `${formatDayMonth(tE)} – ${formatDate(fE)}` }] : []),
      { k: 'First payment', v: `${formatGBP(obp.total)} on ${ofp}` },
      { k: 'Cancel', v: 'Any time in Account' },
    ],
  };
  const obF = {
    register: { label: 'Continue' },
    verify: { label: 'Verify number' },
    details: { label: 'Continue' },
    plan: { label: 'Start 14-day free trial', note: '£0.00 due today' },
    started: { label: 'Go to dashboard', alt: 'Add your first learner' },
  }[s.ob];
  v.obFooter =
    s.phase === 'onboarding' && obF
      ? {
          ...obF,
          go: s.ob === 'started' ? () => store.finishOb(false) : () => store.obNext(),
          altGo: () => store.finishOb(true),
        }
      : null;
  return v;
}
