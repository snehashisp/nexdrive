import { DEVICE_SIZES } from './constants';
import { FLOWS } from '@/demo/flows';
import { REF_CODES } from '@/demo/referral-codes';
import { FUTURE_STATUSES, STATUS_STYLES, compareBookings } from '@/domain/bookings';
import {
  PENDING_REFERRAL_STATUSES,
  REFERRAL,
  REFERRAL_STATUS,
  REFERRAL_STEPS,
  referralLink,
  referralReward,
} from '@/domain/referrals';
import { PLANS, planDiscountPercent, planPeriodLabel, planSaving, planTermLabel } from '@/domain/plans';
import { ERROR_COLOR, BORDER_COLOR, choiceColors, radioRing } from '@/lib/inline-styles';
import {
  parseIsoDate,
  WEEKDAYS_SHORT,
  MONTHS_SHORT,
  MONTHS_LONG,
  NOW,
  TODAY,
  addDays,
  addMonths,
  daysBetween,
  formatDurationLong,
  formatDurationShort,
  formatDate,
  formatDayMonth,
  formatDayMonthLong,
  formatFullDate,
  formatLongDate,
  formatShortDate,
  formatShortDateYear,
  minutesToTime,
  toIsoDate,
  currentTimeHHMM,
  ordinal,
  pad,
  shiftDemoDate,
  timeToMinutes,
} from '@/lib/dates';
import { formatLicence, formatGBP, initials } from '@/lib/format';
import { isValidEmail, isValidLicence, isValidPostcode, isValidUkMobile } from '@/lib/validation';
import { iconSet } from '@/components/iconSet';

function rvm(app, r) {
  const pl = PLANS.find((p) => p.key === r.plan);
  const amt = referralReward(pl);
  const st = REFERRAL_STATUS[r.status];
  const aw = r.status === 'awarded',
    no = st.step < 0;
  return {
    id: r.id,
    name: r.name,
    plan: pl ? pl.name + ' plan' : 'Choosing a plan',
    value: pl ? formatGBP(pl.total) : '—',
    date: formatDate(r.joined),
    st,
    reward: aw ? '+' + formatGBP(amt) : no ? '£0' : pl ? `${formatGBP(amt)} pending` : '—',
    amtC: aw ? '#166534' : '#6B6B7B',
    open: () => app.openSheet('referralDetail', { rid: r.id }),
  };
}

function bvm(app, b) {
  const L = app.learner(b.lid) || { name: 'Unknown learner' };
  const st = STATUS_STYLES[b.status];
  const price = b.rate * b.dur,
    fin = Math.max(0, price - b.discount);
  const sm = timeToMinutes(b.start),
    em = sm + Math.round(b.dur * 60);
  return {
    id: b.id,
    lid: b.lid,
    name: L.name,
    first: L.name.split(' ')[0],
    initials: initials(L.name),
    archived: !!L.archived,
    date: formatShortDate(b.date),
    dateLong: formatLongDate(b.date),
    dateFull: formatFullDate(b.date),
    start: b.start,
    end: minutesToTime(em),
    range: `${b.start}–${minutesToTime(em)}`,
    dur: formatDurationLong(b.dur),
    durS: formatDurationShort(b.dur),
    loc: b.loc,
    pc: b.pc,
    price: formatGBP(price),
    rate: `${formatGBP(b.rate)}/hr × ${formatDurationShort(b.dur)}`,
    hasDisc: b.discount > 0,
    disc: '−' + formatGBP(b.discount),
    fin: formatGBP(fin),
    st,
    cancelled: b.status === 'cancelled',
    deco: b.status === 'cancelled' ? 'line-through' : 'none',
    prev: b.prev ? `${formatShortDate(b.prev.date)}, ${b.prev.start}` : '',
    reason: b.reason || '',
    pkg: !!b.pkg,
    pct: Math.max(4, Math.min(100, Math.round(((NOW - sm) / (b.dur * 60)) * 100))),
    dayLabel:
      b.date === TODAY ? 'Today' : b.date === addDays(TODAY, 1) ? 'Tomorrow' : formatShortDate(b.date),
    open: () => app.pushScreen('lesson', { bid: b.id }),
  };
}

export function buildViewModel(app) {
  const s = app.state,
    p = app.props;
  const ic = iconSet(20),
    ics = iconSet(16),
    icl = iconSet(24);
  const devKey = DEVICE_SIZES[p.device] ? p.device : 'phone';
  const dev = DEVICE_SIZES[devKey];
  const tablet = devKey === 'tablet';
  const cfg = app.cfg();
  const frameless = s.vw < 560 || cfg.deviceFrame === false;
  const panel = s.vw >= 1060 && !frameless && cfg.showDemoPanel !== false;
  const bez = frameless ? 0 : 12;
  let fw = dev.w,
    fh = dev.h;
  if (frameless) {
    fw = s.vw;
    fh = s.vh;
  }
  const pd = frameless ? 0 : 24;
  const availW = (panel ? s.vw - 420 : s.vw) - pd * 2,
    availH = s.vh - pd * 2;
  const sc = frameless ? 1 : Math.min(1, availH / (fh + bez * 2), availW / (fw + bez * 2));
  const fr = {
    pad: pd,
    ow: Math.floor((fw + bez * 2) * sc),
    oh: Math.floor((fh + bez * 2) * sc),
    w: fw + bez * 2,
    h: fh + bez * 2,
    sc,
    bez,
    rad: frameless ? 0 : tablet ? 36 : 56,
    irad: frameless ? 0 : tablet ? 24 : 44,
    sw: fw,
    sh: fh,
    shadow: frameless ? 'none' : '0 30px 80px rgba(10,10,15,.22)',
  };
  const statusBar = !frameless;
  const sbH = tablet ? 28 : 50;
  const padB = frameless ? 12 : tablet ? 16 : 28;
  const top = app.cur();
  const scr = s.phase === 'onboarding' ? 'ob_' + s.ob : top.name;
  const prm = top.params || {};
  const names = [
    'ob_welcome',
    'ob_register',
    'ob_verify',
    'ob_details',
    'ob_plan',
    'ob_started',
    'home',
    'calendar',
    'learners',
    'more',
    'learner',
    'learnerForm',
    'booking',
    'lesson',
    'bookings',
    'notifications',
    'subscription',
    'upgrade',
    'upgradeDone',
    'profile',
    'pricing',
    'bank',
    'prefs',
    'security',
    'referrals',
    'referralQr',
    'credit',
  ];
  const is = {};
  names.forEach((n) => (is[n] = scr === n));
  const showNav = s.phase === 'app' && s.stack.length === 0;
  const navItem = (t) => ({
    c: s.tab === t && showNav ? '#6D28D9' : '#6B6B7B',
    bar: s.tab === t && showNav ? 'inset 0 3px 0 #7C3AED' : 'none',
  });
  const nav = {
    home: navItem('home'),
    calendar: navItem('calendar'),
    learners: navItem('learners'),
    more: navItem('more'),
  };
  const sub = app.subState();
  const plan = PLANS.find((x) => x.key === s.sub.plan) || PLANS[1];
  const go = {
    home: () => app.goTab('home'),
    calendar: () => app.goTab('calendar'),
    learners: () => app.goTab('learners'),
    more: () => app.goTab('more'),
    quick: () => app.openSheet('quickAdd'),
    newBooking: () => app.openBooking(null),
    package: () => app.openBooking(null, { count: 5 }),
    addLearner: () => app.openLearnerForm(null, null),
    notifications: () => app.pushScreen('notifications'),
    referrals: () => app.pushScreen('referrals'),
    referralShare: () => app.pushScreen('referralQr'),
    credit: () => app.pushScreen('credit'),
    bookings: () => app.pushScreen('bookings'),
    subscription: () => app.pushScreen('subscription'),
    upgrade: () => {
      app.setState({
        upPick: PLANS.find((x) => x.months > plan.months)
          ? PLANS.find((x) => x.months > plan.months).key
          : plan.key,
      });
      app.pushScreen('upgrade');
    },
    profile: () => {
      app.setState({ profForm: { ...s.inst, areas: s.inst.areas.join(', ') }, profTried: false });
      app.pushScreen('profile');
    },
    pricing: () => {
      app.setState({
        priceForm: {
          rates: s.inst.rates.map((r) => ({ ...r, rate: String(r.rate) })),
          dur: s.inst.defaultDur,
        },
      });
      app.pushScreen('pricing');
    },
    bank: () => {
      app.setState({
        bankForm: s.bank ? { ...s.bank } : { holder: s.inst.name, sort: '', acct: '', include: true },
        bankTried: false,
        bankReveal: false,
      });
      app.pushScreen('bank');
    },
    prefs: () => app.pushScreen('prefs'),
    security: () => {
      app.setState({ pw: null, pwTried: false });
      app.pushScreen('security');
    },
    history: () => {
      app.setState({ bkSeg: 'history' });
      app.pushScreen('bookings');
    },
  };
  const v = {
    ic,
    ics,
    icl,
    fr,
    frameless,
    panel,
    tablet,
    statusBar,
    sbH,
    padB,
    navPadB: frameless ? 0 : tablet ? 8 : 20,
    sbBg: is.ob_welcome ? '#0A0A0F' : '#FFFFFF',
    sbFg: is.ob_welcome ? '#FFFFFF' : '#0A0A0F',
    scrBg: '#FFFFFF',
    offline: !!p.offline && s.phase === 'app',
    is,
    showNav,
    nav,
    go,
    back: () => app.back(),
    stop: (e) => e.stopPropagation(),
    closeSheet: () => app.setState({ sheet: null }),
    flows: FLOWS.map((f, i) => ({
      num: pad(i + 1),
      title: f[1],
      steps: f[2],
      bg: s.flow === f[0] ? '#F3EEFF' : 'transparent',
      go: () => app.runFlow(f[0]),
    })),
    push: s.push && s.phase === 'app',
    pushTop: statusBar ? sbH + 4 : 8,
    pushText: s.pushInfo ? s.pushInfo.text : '',
    pushTitle: s.pushInfo ? s.pushInfo.title : '',
    clockTime: currentTimeHHMM(),
    pwChanged: formatDate(shiftDemoDate('2026-09-26')),
    clockLabel: `${formatFullDate(TODAY)}, ${currentTimeHHMM()}`,
    openPush: () => {
      const id = s.pushInfo && s.pushInfo.bid;
      app.setState({ push: false });
      if (id) app.pushScreen('lesson', { bid: id });
    },
    toastB: showNav ? (frameless ? 76 : 96) : padB + 84,
    toast: s.toast
      ? {
          text: s.toast.text,
          bg: s.toast.kind === 'warn' ? '#92400E' : s.toast.kind === 'err' ? '#991B1B' : '#0A0A0F',
          icon: s.toast.kind === 'warn' || s.toast.kind === 'err' ? ics.warn : ics.check,
        }
      : null,
    sheetOpen: !!s.sheet,
    replaySplash: () => app.startSplash(),
    splash: s.splash
      ? { run: app.splashRun, fadingOut: !!s.splashOut, onSkip: () => app.skipSplash() }
      : null,
  };
  if (s.splash) {
    v.sbBg = '#0A0A0F';
    v.sbFg = '#FFFFFF';
  }
  const sh = {};
  if (s.sheet) sh[s.sheet.type] = true;
  v.sh = sh;

  // ---------- onboarding
  const regE = s.regTried ? app.regErr(s.reg) : {};
  delete regE.password;
  v.reg = s.reg;
  v.regE = regE;
  v.regB = {
    name: regE.name ? ERROR_COLOR : BORDER_COLOR,
    phone: regE.phone ? ERROR_COLOR : BORDER_COLOR,
    email: regE.email ? ERROR_COLOR : BORDER_COLOR,
    password: s.regTried && app.regErr(s.reg).password ? ERROR_COLOR : BORDER_COLOR,
  };
  v.hReg = {
    name: app.setIn('reg', 'name'),
    phone: app.setIn('reg', 'phone'),
    email: app.setIn('reg', 'email'),
    password: app.setIn('reg', 'password'),
    terms: app.setIn('reg', 'terms'),
  };
  const pw = s.reg.password;
  const rc = (ok) => (ok ? '#166534' : s.regTried ? ERROR_COLOR : '#6B6B7B');
  v.pwRules = [
    { t: '8+ characters', c: rc(pw.length >= 8) },
    { t: 'A letter', c: rc(/[a-z]/i.test(pw)) },
    { t: 'A number', c: rc(/\d/.test(pw)) },
  ];
  v.sampleReg = () =>
    app.setState({
      reg:
        s.ref.code || (s.flow || '').startsWith('ref')
          ? {
              name: 'Chloe Adams',
              phone: '07700 900874',
              email: 'chloe@adamsdriving.co.uk',
              password: 'Demo' + Math.random().toString(36).slice(2, 8) + '7',
              terms: true,
            }
          : {
              name: 'Daniel Wilson',
              phone: '07700 900123',
              email: 'daniel@wilsondriving.co.uk',
              password: 'Demo' + Math.random().toString(36).slice(2, 8) + '7',
              terms: true,
            },
    });
  v.obGo = { register: () => app.setState({ ob: 'register' }) };
  v.obLogin = () => app.reseed('populated', { tab: 'home' });
  v.obBack = () => app.obBack();
  v.obHeader = ['register', 'verify', 'details', 'plan'].includes(s.ob) && s.phase === 'onboarding';
  const si = ['register', 'verify', 'details', 'plan'].indexOf(s.ob);
  v.step = {
    label: `Step ${si + 1} of 4`,
    bars: [0, 1, 2, 3].map((i) => ({ c: i <= si ? '#7C3AED' : '#E7E7EC' })),
  };
  v.otp = s.otp;
  v.otpErr = s.otpErr;
  v.otpB = s.otpErr ? ERROR_COLOR : BORDER_COLOR;
  v.hOtp = (e) => app.setState({ otp: e.target.value.replace(/\D/g, '').slice(0, 6), otpErr: '' });
  v.fillOtp = () => app.setState({ otp: '482913', otpErr: '' });
  v.resendOtp = () => {
    app.setState({ resent: true });
    app.showToast('New code sent to ' + (s.reg.phone || 'your mobile'));
  };
  v.resendLabel = s.resent ? 'Code resent — resend again' : 'Resend code';
  const detE = s.detTried ? app.detErr(s.det) : {};
  v.det = s.det;
  v.detE = detE;
  v.detB = {
    adi: detE.adi ? ERROR_COLOR : BORDER_COLOR,
    areas: detE.areas ? ERROR_COLOR : BORDER_COLOR,
    rate: detE.rate ? ERROR_COLOR : BORDER_COLOR,
  };
  v.hDet = {
    adi: (e) => app.setState({ det: { ...s.det, adi: e.target.value.replace(/\D/g, '').slice(0, 6) } }),
    business: app.setIn('det', 'business'),
    areas: app.setIn('det', 'areas'),
    rate: app.setIn('det', 'rate'),
  };
  v.detStatus = [
    ['adi', 'Approved Driving Instructor', 'Fully qualified · green badge', '#16A34A'],
    ['pdi', 'Trainee instructor (PDI)', 'Trainee licence · pink badge', '#EC4899'],
  ].map((o) => ({
    t: o[1],
    d: o[2],
    badge: o[3],
    bd: s.det.status === o[0] ? '#7C3AED' : BORDER_COLOR,
    ring: radioRing(s.det.status === o[0]),
    pick: () => app.setState({ det: { ...s.det, status: o[0] } }),
  }));
  v.detDur = [
    [1, '1h'],
    [1.5, '1.5h'],
    [2, '2h'],
  ].map((o) => {
    const c = choiceColors(s.det.dur === o[0]);
    return { t: o[1], bg: c.bg, fg: c.fg, pick: () => app.setState({ det: { ...s.det, dur: o[0] } }) };
  });
  const obp = PLANS.find((x) => x.key === s.obPlan);
  const rst = s.ref.status,
    refOk = rst === 'valid',
    rcd = REF_CODES[(s.ref.code || '').toUpperCase()];
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
      app.setState({
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
      if (!s.ref.code.trim()) return app.setState({ ref: { ...s.ref, status: 'invalid' } });
      app.setState({ ref: { ...s.ref, via: s.ref.via || 'manual', status: app.checkRef(s.ref.code) } });
    },
    remove: () => app.setState({ ref: { code: '', status: null, via: null } }),
    hint:
      app.cfg().showDemoPanel !== false && !refOk
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
      pick: () => app.setState({ obPlan: pl.key }),
    };
  });
  v.obCard = s.obCard;
  v.obNoCard = !s.obCard;
  v.obCardErr = s.obCardTried && !s.obCard;
  v.obCardB = v.obCardErr ? ERROR_COLOR : '#6B6B7B';
  v.addCard = () => {
    app.setState({ obCard: true });
    app.showToast('Card saved. You won’t be charged today.');
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
          go: s.ob === 'started' ? () => app.finishOb(false) : () => app.obNext(),
          altGo: () => app.finishOb(true),
        }
      : null;

  if (s.phase !== 'app') return v;

  // ---------- common
  const B = s.bookings;
  const active = s.learners.filter((l) => !l.archived);
  const fut = B.filter((b) => ['upcoming', 'rescheduled'].includes(b.status)).sort(compareBookings);
  const unread = s.notifs.filter((n) => n.unread).length;
  const trialDays = daysBetween(TODAY, s.sub.trialEnd);
  const RC = {
    bal: s.credit.reduce((a, t) => a + t.amt, 0),
    earned: s.credit.filter((t) => t.amt > 0).reduce((a, t) => a + t.amt, 0),
    used: -s.credit.filter((t) => t.amt < 0).reduce((a, t) => a + t.amt, 0),
    ok: s.refs.filter((r) => r.status === 'awarded').length,
    pend: s.refs.filter((r) => PENDING_REFERRAL_STATUSES.includes(r.status)).length,
  };

  // ---------- home
  if (is.home) {
    const todayB = B.filter((b) => b.date === TODAY && b.status !== 'cancelled');
    const ongoing = B.find((b) => b.status === 'ongoing');
    const nextOne = fut.find((b) => b.date === TODAY && timeToMinutes(b.start) > NOW);
    const mins = nextOne ? timeToMinutes(nextOne.start) - NOW : 99;
    const fin = (b) => Math.max(0, b.rate * b.dur - b.discount);
    const done = todayB.filter((b) => b.status === 'completed');
    const inc = active.filter((l) => app.missing(l).length).length;
    const wk = fut.filter((b) => b.date <= addDays(TODAY, 7));
    let banner = null;
    if (sub === 'payment_failed')
      banner = {
        t: 'Payment failed. Update your card to keep booking lessons.',
        bg: '#FEF2F2',
        fg: '#991B1B',
        bd: '#FECACA',
      };
    else if (sub === 'expired')
      banner = {
        t: 'Your subscription has expired. Renew to create bookings.',
        bg: '#0A0A0F',
        fg: '#FFFFFF',
        bd: '#0A0A0F',
      };
    else if (sub === 'trial' && trialDays <= 3)
      banner = {
        t: `Free trial ends in ${trialDays} days · ${formatShortDate(s.sub.trialEnd)}`,
        bg: '#FFFBEB',
        fg: '#92400E',
        bd: '#FDE68A',
      };
    const nx =
      nextOne && mins <= 30 && s.reminder && s.prefs.reminder
        ? { ...bvm(app, nextOne), mins, nav: () => app.openSheet('maps', { bid: nextOne.id }) }
        : null;
    v.hm = {
      initials: initials(s.inst.name),
      unread: unread || '',
      dateLabel: formatLongDate(TODAY).toUpperCase(),
      greeting: `${NOW < 720 ? 'Good morning' : NOW < 1080 ? 'Good afternoon' : 'Good evening'}, ${s.inst.name.split(' ')[0]}`,
      banner,
      reminder: nx,
      ongoing: ongoing ? bvm(app, ongoing) : null,
      next: fut.slice(0, 2).map((b) => bvm(app, b)),
      hasNext: fut.length > 0,
      noNext: fut.length === 0,
      todayN: todayB.length,
      todaySub: todayB.length ? `${done.length} done · ${ongoing ? '1 now' : '0 now'}` : 'Nothing booked',
      weekN: wk.length,
      weekSub: `${wk.reduce((a, b) => a + b.dur, 0)} hours booked`,
      earnDone: formatGBP(done.reduce((a, b) => a + fin(b), 0)),
      earnSub: `of ${formatGBP(todayB.reduce((a, b) => a + fin(b), 0))} booked today`,
      activeN: active.length,
      activeSub: inc ? `${inc} need${inc > 1 ? '' : 's'} details` : 'All profiles complete',
      activeSubC: inc ? '#92400E' : '#6B6B7B',
    };
    if (!active.length && !B.length) v.hm.activeSub = 'Add your first learner';
  }
  v.dismissReminder = () => app.setState({ reminder: false });
  if (v.hm)
    v.hm.ref = {
      bal: formatGBP(RC.bal),
      sub: s.refs.length
        ? `${RC.ok} successful referral${RC.ok === 1 ? '' : 's'} · ${RC.pend} pending`
        : 'Invite an instructor and earn credit',
    };
  vmRest(app, v, { s, p, ic, ics, icl, is, prm, B, active, fut, unread, trialDays, sub, plan, go, RC });
  return v;
}

function msgVm(app, S) {
  const s = app.state;
  const bs = S.ids.map((id) => app.booking(id)).filter(Boolean);
  if (!bs.length) return null;
  const b = bs[0];
  const L = app.learner(b.lid) || { name: 'Learner', phone: '' };
  const fn = L.name.split(' ')[0];
  const multi = bs.length > 1;
  const sum = bs.reduce((a, x) => a + x.rate * x.dur, 0);
  const disc = bs.reduce((a, x) => a + x.discount, 0);
  const tot = Math.max(0, sum - disc);
  const end = minutesToTime(timeToMinutes(b.start) + Math.round(b.dur * 60));
  const k = S.kind;
  const title = {
    new: multi ? 'Send schedule to learner?' : 'Send lesson details to learner?',
    resend: 'Send lesson details to learner?',
    update: 'Booking updated. Would you like to notify the learner?',
    cancel: 'Notify learner about this cancellation?',
  }[k];
  const head = {
    new: multi ? `${bs.length} lessons booked` : 'Lesson booked',
    resend: 'Your lesson details',
    update: 'Lesson changed',
    cancel: 'Lesson cancelled',
  }[k];
  const intro = {
    new: multi
      ? `Hi ${fn}, your ${bs.length} driving lessons are booked. Here’s your schedule.`
      : `Hi ${fn}, your driving lesson is booked.`,
    resend: `Hi ${fn}, here are the details for your next lesson.`,
    update: `Hi ${fn}, your lesson has moved. Here are the new details.`,
    cancel: `Hi ${fn}, sorry — the lesson below has been cancelled.`,
  }[k];
  let rows = [
    { k: 'Date', v: formatFullDate(b.date) },
    { k: 'Time', v: `${b.start}–${end}` },
    { k: 'Duration', v: formatDurationLong(b.dur) },
    { k: 'Pickup', v: `${b.loc}, ${b.pc}` },
    { k: 'Instructor', v: s.inst.name },
  ];
  if (k === 'cancel')
    rows = [
      { k: 'Date', v: formatFullDate(b.date) },
      { k: 'Time', v: `${b.start}–${end}` },
      { k: 'Reason', v: S.reason || b.reason || '—' },
    ];
  if (multi)
    rows = [
      { k: 'Duration', v: `${formatDurationLong(b.dur)} each` },
      { k: 'Pickup', v: `${b.loc}, ${b.pc}` },
      { k: 'Instructor', v: s.inst.name },
    ];
  const pv = S.prev;
  const showPrev = k === 'update' && !!pv;
  const priceRows = (
    multi
      ? [{ k: `${bs.length} × ${formatGBP(b.rate * b.dur)}`, v: formatGBP(sum) }]
      : [{ k: 'Lesson price', v: formatGBP(sum) }]
  ).concat(disc ? [{ k: 'Discount', v: '−' + formatGBP(disc) }] : []);
  const amtCh = showPrev && Math.abs(pv.fin - tot) > 0.001;
  const bank = s.bank && s.bank.include && k !== 'cancel' ? s.bank : null;
  const ref = `${(L.name.split(' ').slice(-1)[0] || '').toUpperCase().slice(0, 6)}-${b.date.slice(8, 10)}${b.date.slice(5, 7)}`;
  return {
    title,
    head,
    intro,
    to: `${L.name} · ${L.phone}`,
    rows,
    multi,
    sess: multi
      ? bs.map((x, i) => ({
          n: pad(i + 1),
          t: formatShortDate(x.date),
          tm: `${x.start}–${minutesToTime(timeToMinutes(x.start) + Math.round(x.dur * 60))}`,
        }))
      : [],
    showPrev,
    prevT: showPrev ? `${formatShortDate(pv.date)}, ${pv.start}` : '',
    newT: showPrev ? `${formatShortDate(b.date)}, ${b.start}` : '',
    hasPrice: k !== 'cancel',
    priceRows,
    total: formatGBP(tot),
    amtNote: amtCh ? `Updated from ${formatGBP(pv.fin)}` : '',
    bank: !!bank,
    bankRows: bank
      ? [
          { k: 'Account name', v: bank.holder },
          { k: 'Sort code', v: bank.sort },
          { k: 'Account number', v: bank.acct },
          { k: 'Reference', v: ref },
        ]
      : [],
    bankMissing: !s.bank && k !== 'cancel',
    addBank: () => {
      app.afterMsg(S);
      setTimeout(() => app.goBank(), 0);
    },
    sign: `${s.inst.name.split(' ')[0]} · ${s.inst.business || s.inst.name}`,
    chans: ['SMS', 'WhatsApp', 'Email'].map((m) => ({
      t: m,
      ...choiceColors(s.prefs.channel === m),
      pick: () => app.setState({ prefs: { ...s.prefs, channel: m } }),
    })),
    failed: !!S.failed,
    sendLabel: S.sending ? 'Sending…' : S.failed ? 'Try again' : 'Send message',
    send: () => app.sendMsg(),
    skip: () => app.skipMsg(),
    skipLabel: k === 'cancel' ? 'Don’t notify' : 'Don’t send',
    copy: () => app.showToast('Message copied — paste it into any app', 'neutral'),
  };
}

function vmRest(app, v, c) {
  const { s, ic, ics, is, prm, B, active, unread, trialDays, sub, plan, go, RC } = c;
  const link = referralLink(s.refCode, app.cfg().referralBaseUrl);
  const msgTxt = `I'm using NexDrive to manage my driving lessons, learners and bookings. If you're a driving instructor, you can try NexDrive free and get an additional month free after your 14-day trial when you sign up using my referral code.\n\nReferral code: ${s.refCode}\n\n${link}`;
  const share = {
    code: s.refCode,
    link,
    msg: msgTxt,
    copyCode: () => app.copy(s.refCode, 'Referral code copied'),
    copyLink: () => app.copy(link, 'Referral link copied'),
    whatsapp: () => {
      app.openExt('https://wa.me/?text=' + encodeURIComponent(msgTxt));
      app.showToast('Opening WhatsApp…', 'neutral');
    },
    email: () => {
      app.openExt(
        'mailto:?subject=' +
          encodeURIComponent('Try NexDrive — 1 month free with my referral') +
          '&body=' +
          encodeURIComponent(msgTxt),
      );
      app.showToast('Opening your email app…', 'neutral');
    },
  };
  if (is.referrals) {
    const rl = s.refs.slice().sort((a, b) => b.joined.localeCompare(a.joined));
    v.rf = {
      ...share,
      bal: formatGBP(RC.bal),
      stats: [
        { k: 'Successful', v: RC.ok },
        { k: 'Pending', v: RC.pend },
        { k: 'Total referrals', v: s.refs.length },
        { k: 'Total earned', v: formatGBP(RC.earned) },
        { k: 'Credit used', v: formatGBP(RC.used) },
        { k: 'Reward rate', v: REFERRAL.pct + '%' },
      ],
      list: rl.map((r) => rvm(app, r)),
      has: rl.length > 0,
      empty: !rl.length,
      histCount: `${rl.length} instructor${rl.length === 1 ? '' : 's'}`,
    };
  }
  if (is.referralQr)
    v.rq = {
      ...share, // includes `link`, which the screen turns into a <QrCode>
      save: () => app.saveQr(link),
      shareQr: () => app.shareQr(link, msgTxt),
      demo: app.cfg().showDemoPanel !== false,
      preview: () => app.startRefOnboarding(s.refCode, 'qr', { flow: 'refQr' }),
    };
  if (is.credit) {
    let run = 0;
    const tx = s.credit
      .slice()
      .sort((a, b) => a.date.localeCompare(b.date))
      .map((t) => {
        run += t.amt;
        return { ...t, bal: run };
      })
      .reverse()
      .filter((t) => s.crFilter === 'all' || (s.crFilter === 'earned' ? t.amt > 0 : t.amt < 0));
    const pend = s.refs
      .filter((r) => PENDING_REFERRAL_STATUSES.includes(r.status) && r.plan)
      .reduce((a, r) => a + referralReward(PLANS.find((p) => p.key === r.plan)), 0);
    const cover = Math.min(RC.bal, plan.total);
    v.cr = {
      bal: formatGBP(RC.bal),
      earned: formatGBP(RC.earned),
      used: formatGBP(RC.used),
      pending: formatGBP(pend),
      auto: {
        bg: s.autoCredit ? '#7C3AED' : '#CFCFD8',
        x: s.autoCredit ? 22 : 2,
        flip: () => {
          app.setState({ autoCredit: !s.autoCredit });
          app.showToast(
            !s.autoCredit ? 'Credit will be applied to your next payment' : 'Credit will be kept for later',
            'neutral',
          );
        },
      },
      nextText:
        sub === 'active'
          ? `Next payment ${formatGBP(plan.total)} on ${formatDate(shiftDemoDate('2026-10-26'))}${RC.bal > 0 ? ` · ${formatGBP(cover)} would be covered` : ''}`
          : 'Applied when your next payment is due',
      filters: [
        ['all', 'All'],
        ['earned', 'Earned'],
        ['used', 'Used'],
      ].map((x) => ({
        t: x[1],
        ...choiceColors(s.crFilter === x[0]),
        pick: () => app.setState({ crFilter: x[0] }),
      })),
      tx: tx.map((t) => ({
        date: formatDate(t.date),
        desc: t.desc,
        type: t.amt > 0 ? 'Referral credit' : 'Credit used',
        tb: t.amt > 0 ? '#DCFCE7' : '#F7F7F9',
        tf: t.amt > 0 ? '#166534' : '#4A4A5A',
        amt: (t.amt > 0 ? '+' : '−') + formatGBP(Math.abs(t.amt)),
        ac: t.amt > 0 ? '#166534' : '#0A0A0F',
        bal: `Balance ${formatGBP(t.bal)}`,
      })),
      hasTx: tx.length > 0,
      noTx: !tx.length,
      canUpgrade: PLANS.some((x) => x.months > plan.months) && RC.bal > 0,
      upgrade: () => {
        app.setState({ useCredit: true });
        go.upgrade();
      },
    };
  }
  if (s.sheet && s.sheet.type === 'referralDetail') {
    const r = s.refs.find((x) => x.id === s.sheet.rid);
    if (r) {
      const b = rvm(app, r);
      const step = REFERRAL_STATUS[r.status].step;
      const pl = PLANS.find((x) => x.key === r.plan);
      const failAt = r.plan ? 3 : 2;
      v.rd = {
        ...b,
        failed: step < 0,
        reason: r.reason || '',
        calc: pl
          ? `${formatGBP(pl.total)} × 20% = ${formatGBP(referralReward(pl))}`
          : 'Worked out when they choose a plan',
        awarded: r.awardedOn ? formatDate(r.awardedOn) : '',
        steps: REFERRAL_STEPS.map((t, i) => {
          const done = step < 0 ? i < failAt : i <= step;
          const cur = step >= 0 && i === step + 1;
          const bad = step < 0 && i === failAt;
          return {
            t,
            n: pad(i + 1),
            c: done ? '#7C3AED' : bad ? '#DC2626' : '#E7E7EC',
            nc: done || bad ? '#FFFFFF' : '#6B6B7B',
            fg: done || cur || bad ? '#0A0A0F' : '#9A9AAA',
            d: done ? 'Done' : cur ? (step === 1 ? 'Next' : 'In progress') : bad ? 'Stopped' : '',
            dc: done ? '#166534' : bad ? '#B91C1C' : '#6D28D9',
          };
        }),
        demoQualify:
          app.cfg().showDemoPanel !== false && ['trial', 'free_month', 'confirmed'].includes(r.status)
            ? () => app.qualify(r.id)
            : null,
      };
    }
  }
  const fin = (b) => Math.max(0, b.rate * b.dur - b.discount);
  const lvm = (l) => {
    const miss = app.missing(l);
    const nx = B.filter((b) => b.lid === l.id && FUTURE_STATUSES.includes(b.status)).sort(compareBookings)[0];
    return {
      id: l.id,
      name: l.name,
      initials: initials(l.name),
      phone: l.phone,
      pc: l.postcode || 'No postcode',
      incomplete: miss.length > 0,
      sub: nx
        ? `Next: ${nx.date === TODAY ? 'Today' : formatShortDate(nx.date)}, ${nx.start}`
        : 'No upcoming lessons',
      open: () => app.openSheet('learnerActions', { lid: l.id }),
      pick: () => app.setState((st) => ({ draft: { ...st.draft, lid: l.id }, sheet: null })),
    };
  };
  const tog = (on, flip) => ({ bg: on ? '#7C3AED' : '#CFCFD8', x: on ? 22 : 2, flip });

  if (is.calendar) {
    const cd = s.calDate;
    const wd = (parseIsoDate(cd).getUTCDay() + 6) % 7;
    const ws = addDays(cd, -wd);
    const HP = 64,
      HW = 40;
    const d0 = parseIsoDate(cd);
    const shift = (dir) => {
      if (s.calView === 'month') {
        app.setState({
          calDate: toIsoDate(new Date(Date.UTC(d0.getUTCFullYear(), d0.getUTCMonth() + dir, 1))),
        });
      } else app.setState({ calDate: addDays(cd, dir * (s.calView === 'day' ? 1 : 7)) });
    };
    const dayB = (date) => B.filter((b) => b.date === date).sort(compareBookings);
    const blk = (b, hp) => ({
      ...bvm(app, b),
      top: Math.round(((timeToMinutes(b.start) - 420) / 60) * hp),
      h: Math.max(26, Math.round(b.dur * hp) - 3),
      op: b.status === 'cancelled' ? 0.6 : 1,
    });
    const dB = dayB(cd);
    const live = dB.filter((b) => b.status !== 'cancelled');
    v.cal = {
      views: ['day', 'week', 'month'].map((k) => ({
        t: k[0].toUpperCase() + k.slice(1),
        ...choiceColors(s.calView === k),
        pick: () => app.setState({ calView: k }),
      })),
      isDay: s.calView === 'day',
      isWeek: s.calView === 'week',
      isMonth: s.calView === 'month',
      title:
        s.calView === 'day'
          ? formatLongDate(cd)
          : s.calView === 'week'
            ? `${formatShortDate(ws)} – ${formatShortDate(addDays(ws, 6))}`
            : `${MONTHS_LONG[d0.getUTCMonth()]} ${d0.getUTCFullYear()}`,
      prev: () => shift(-1),
      next: () => shift(1),
      today: () => app.setState({ calDate: TODAY }),
      notToday: cd !== TODAY,
      strip: [0, 1, 2, 3, 4, 5, 6].map((i) => {
        const dt = addDays(ws, i);
        const sel = dt === cd;
        return {
          dw: WEEKDAYS_SHORT[parseIsoDate(dt).getUTCDay()],
          num: parseIsoDate(dt).getUTCDate(),
          bg: sel ? '#0A0A0F' : '#FFFFFF',
          fg: sel ? '#FFFFFF' : dt === TODAY ? '#6D28D9' : '#0A0A0F',
          dot: dayB(dt).some((b) => b.status !== 'cancelled') ? (sel ? '#A78BFA' : '#7C3AED') : 'transparent',
          pick: () => app.setState({ calDate: dt }),
        };
      }),
      hours: Array.from({ length: 14 }, (_, i) => ({ label: pad(7 + i) + ':00', top: i * HP })),
      tlH: 14 * HP,
      blocks: dB.map((b) => blk(b, HP)),
      showNow: cd === TODAY,
      nowTop: Math.round(((NOW - 420) / 60) * HP),
      summary: live.length
        ? `${live.length} lesson${live.length > 1 ? 's' : ''} · ${live.reduce((a, b) => a + b.dur, 0)} hours · ${formatGBP(live.reduce((a, b) => a + fin(b), 0))}`
        : 'No lessons booked',
      dayEmpty: dB.length === 0,
      allEmpty: B.length === 0,
      wHours: Array.from({ length: 14 }, (_, i) => ({ label: pad(7 + i), top: i * HW })),
      wH: 14 * HW,
      week: [0, 1, 2, 3, 4, 5, 6].map((i) => {
        const dt = addDays(ws, i);
        return {
          dw: WEEKDAYS_SHORT[parseIsoDate(dt).getUTCDay()],
          num: parseIsoDate(dt).getUTCDate(),
          hbg: dt === TODAY ? '#7C3AED' : 'transparent',
          hfg: dt === TODAY ? '#FFFFFF' : '#0A0A0F',
          blocks: dayB(dt).map((b) => blk(b, HW)),
          pick: () => app.setState({ calDate: dt, calView: 'day' }),
        };
      }),
      legend: ['upcoming', 'ongoing', 'completed', 'cancelled', 'rescheduled'].map((k) => ({
        t: STATUS_STYLES[k].label,
        c: STATUS_STYLES[k].bar,
      })),
      newBooking: go.newBooking,
    };
    if (s.calView === 'month') {
      const first = toIsoDate(new Date(Date.UTC(d0.getUTCFullYear(), d0.getUTCMonth(), 1)));
      const fo = (parseIsoDate(first).getUTCDay() + 6) % 7;
      const gs = addDays(first, -fo);
      v.cal.cells = Array.from({ length: 42 }, (_, i) => {
        const dt = addDays(gs, i);
        const bs = dayB(dt);
        const inM = parseIsoDate(dt).getUTCMonth() === d0.getUTCMonth();
        const sel = dt === cd;
        return {
          num: parseIsoDate(dt).getUTCDate(),
          bg: sel ? '#0A0A0F' : '#FFFFFF',
          fg: sel ? '#FFFFFF' : inM ? (dt === TODAY ? '#6D28D9' : '#0A0A0F') : '#B4B4C4',
          fw: dt === TODAY ? 700 : 500,
          dots: bs.slice(0, 4).map((b) => ({ c: STATUS_STYLES[b.status].bar })),
          pick: () => app.setState({ calDate: dt }),
        };
      });
      v.cal.list = dB.map((b) => bvm(app, b));
      v.cal.listLabel = formatLongDate(cd).toUpperCase();
    }
  }
  if (is.learners) {
    const q = s.lSearch.trim().toLowerCase();
    const incN = active.filter((l) => app.missing(l).length).length;
    let list = active.filter(
      (l) =>
        !q ||
        l.name.toLowerCase().includes(q) ||
        l.phone.replace(/\s/g, '').includes(q.replace(/\s/g, '')) ||
        (l.postcode || '').toLowerCase().includes(q),
    );
    if (s.lFilter === 'incomplete') list = list.filter((l) => app.missing(l).length);
    list.sort((a, b) => a.name.localeCompare(b.name));
    const arch = s.learners.filter((l) => l.archived);
    v.ls = {
      search: s.lSearch,
      hSearch: (e) => app.setState({ lSearch: e.target.value }),
      clear: () => app.setState({ lSearch: '' }),
      hasQ: !!q,
      count: `${active.length} active`,
      filters: [
        ['all', `All · ${active.length}`],
        ['incomplete', `Needs details · ${incN}`],
      ].map((f) => ({
        t: f[1],
        ...choiceColors(s.lFilter === f[0]),
        pick: () => app.setState({ lFilter: f[0] }),
      })),
      list: list.map(lvm),
      has: list.length > 0,
      noResults: active.length > 0 && list.length === 0,
      empty: active.length === 0,
      hasArch: arch.length > 0,
      arch: arch.map((l) => ({
        name: l.name,
        initials: initials(l.name),
        sub: `Removed ${formatDate(l.archivedOn)} · ${B.filter((b) => b.lid === l.id).length} lesson records kept`,
        open: () => {
          app.setState({ hf: { status: 'all', learner: l.id, range: 'all' }, bkSeg: 'history' });
          app.pushScreen('bookings');
        },
      })),
    };
  }
  if (is.learner) {
    const L = app.learner(prm.lid);
    if (L) {
      const bs = B.filter((b) => b.lid === L.id);
      const up = bs.filter((b) => FUTURE_STATUSES.includes(b.status)).sort(compareBookings);
      const pv = bs.filter((b) => !FUTURE_STATUSES.includes(b.status)).sort((a, b) => compareBookings(b, a));
      const miss = app.missing(L);
      const done = bs.filter((b) => b.status === 'completed');
      const row = (k, val, req, ok) => ({
        k,
        v: val || (req ? 'Missing' : 'Not added'),
        req: req ? 'Required' : 'Optional',
        c: req && !ok ? ERROR_COLOR : val ? '#0A0A0F' : '#6B6B7B',
        rc: req ? '#6D28D9' : '#6B6B7B',
      });
      v.lp = {
        name: L.name,
        initials: initials(L.name),
        incomplete: miss.length > 0,
        complete: !miss.length,
        missText: miss.join(', '),
        since: `Learner since ${formatDate(L.since || TODAY)}`,
        stats: [
          { k: 'Lessons taken', v: done.length },
          { k: 'Upcoming', v: up.length },
          { k: 'Charged', v: formatGBP(done.reduce((a, b) => a + fin(b), 0)) },
        ],
        rows: [
          row('Mobile', L.phone, true, isValidUkMobile(L.phone)),
          row('Address', L.address, true, !!(L.address || '').trim()),
          row('Postcode', L.postcode, true, isValidPostcode(L.postcode)),
          row(
            'Provisional licence',
            L.licence ? formatLicence(L.licence) : '',
            true,
            isValidLicence(L.licence),
          ),
          row('Theory test certificate', L.theory, false, true),
          row('Email', L.email, false, true),
        ],
        notes: L.notes,
        hasNotes: !!L.notes,
        segs: [
          ['upcoming', `Upcoming · ${up.length}`],
          ['previous', `Previous · ${pv.length}`],
        ].map((x) => ({
          t: x[1],
          ...choiceColors(s.profSeg === x[0]),
          pick: () => app.setState({ profSeg: x[0] }),
        })),
        showUp: s.profSeg === 'upcoming',
        showPrev: s.profSeg === 'previous',
        up: up.map((b) => bvm(app, b)),
        pv: pv.map((b) => bvm(app, b)),
        noUp: s.profSeg === 'upcoming' && !up.length,
        noPv: s.profSeg === 'previous' && !pv.length,
        schedule: () => app.openBooking(L.id),
        resched: () => app.learnerPick(L.id, 'reschedule'),
        cancel: () => app.learnerPick(L.id, 'cancel'),
        history: () => {
          app.setState({ hf: { status: 'all', learner: L.id, range: 'all' }, bkSeg: 'history' });
          app.pushScreen('bookings');
        },
        edit: () => app.openLearnerForm(L.id, null),
        del: () => app.openSheet('deleteLearner', { lid: L.id }),
        call: () => app.showToast(`Calling ${L.name} · ${L.phone}`, 'neutral'),
      };
    }
  }
  if (is.learnerForm && s.lf) {
    const l = s.lf;
    const strict = s.lfStrict || s.lfRet === 'booking';
    const e = s.lfTried ? app.lfErr(l, strict) : {};
    const f = (k) => app.setIn('lf', k);
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
      save: () => app.saveLearner(false),
      saveBook: () => app.saveLearner(true),
      primary: s.lfRet === 'booking' ? 'Save & continue booking' : 'Save & schedule lesson',
      showSecondary: s.lfRet !== 'booking',
      secondary: l.id ? 'Save changes' : 'Save learner',
    };
  }
  if (is.booking && s.draft) {
    const m = app.bfModel();
    const d = m.d;
    const e = d.tried ? m.errs : {};
    const ex = d.mode === 'edit' ? [d.bid] : [];
    const base = d.date < TODAY ? d.date : TODAY;
    const dates = Array.from({ length: 21 }, (_, i) => {
      const dt = addDays(base, i);
      const o = choiceColors(dt === d.date);
      const n = B.filter((x) => x.date === dt && x.status !== 'cancelled').length;
      return {
        dw: dt === TODAY ? 'Today' : WEEKDAYS_SHORT[parseIsoDate(dt).getUTCDay()],
        num: parseIsoDate(dt).getUTCDate(),
        mon: MONTHS_SHORT[parseIsoDate(dt).getUTCMonth()],
        ...o,
        sub: dt === d.date ? '#EDE9FE' : '#6B6B7B',
        n: n ? `${n} booked` : 'Free',
        pick: () => app.pickDate(dt),
      };
    });
    const slots = [];
    for (let mm = 7 * 60; mm <= 19 * 60 + 30; mm += 30) {
      const t = minutesToTime(mm);
      const past = d.date === TODAY && mm <= NOW;
      const busy = !past && app.overlap(d.date, mm, d.dur * 60, ex);
      const sel = d.start === t;
      slots.push({
        t,
        bg: sel ? '#7C3AED' : busy ? '#FFFBEB' : past ? '#F7F7F9' : '#FFFFFF',
        fg: sel ? '#FFFFFF' : busy ? '#92400E' : past ? '#B4B4C4' : '#0A0A0F',
        bd: sel ? '#7C3AED' : busy ? '#FDE68A' : '#E7E7EC',
        deco: past ? 'line-through' : 'none',
        cur: past ? 'not-allowed' : 'pointer',
        pick: past
          ? () => app.showToast('That time has passed — choose a later slot', 'warn')
          : () => app.pickSlot(t),
      });
    }
    const durs = [
      [1, '1 hour'],
      [1.5, '1.5 hours'],
      [2, '2 hours'],
    ].map((x) => ({
      t: x[1],
      ...choiceColors(!d.custom && d.dur === x[0]),
      pick: () => app.setDraft({ dur: x[0], custom: false }),
    }));
    durs.push({ t: 'Custom', ...choiceColors(d.custom), pick: () => app.setDraft({ custom: true }) });
    const counts = [
      [1, 'Single'],
      [5, '5 lessons'],
      [10, '10 lessons'],
    ].map((x) => ({
      t: x[1],
      ...choiceColors(!d.countCustom && d.count === x[0]),
      pick: () => app.setDraft({ count: x[0], countCustom: false, shifts: {} }),
    }));
    counts.push({
      t: 'Custom',
      ...choiceColors(d.countCustom),
      pick: () => app.setDraft({ countCustom: true, count: Math.max(2, d.count) }),
    });
    const L = m.L;
    v.bf = {
      title: d.mode === 'edit' ? 'Reschedule lesson' : d.count > 1 ? 'Book multiple lessons' : 'New booking',
      edit: d.mode === 'edit',
      isNew: d.mode !== 'edit',
      learner: L
        ? { name: L.name, initials: initials(L.name), sub: `${L.phone} · ${L.postcode || 'No postcode'}` }
        : null,
      noLearner: !L,
      learnerErr: e.learner,
      learnerBd: e.learner ? ERROR_COLOR : '#CFCFD8',
      pickLearner: () => app.openSheet('pickLearner'),
      blocked: m.blocked,
      missText: m.miss.join(', '),
      complete: () => app.openLearnerForm(d.lid, 'booking'),
      op: m.blocked ? 0.4 : 1,
      pe: m.blocked ? 'none' : 'auto',
      dates,
      dateLabel: formatLongDate(d.date),
      slots,
      startErr: e.start,
      durs,
      custom: d.custom,
      durLabel: formatDurationLong(d.dur),
      durInc: () => app.setDraft({ dur: Math.min(8, d.dur + 0.5) }),
      durDec: () => app.setDraft({ dur: Math.max(0.5, d.dur - 0.5) }),
      rates: s.inst.rates.map((r) => ({
        t: r.label,
        sub: `${formatGBP(r.rate)}/hr`,
        ...choiceColors(d.rateKey === r.key),
        sc: d.rateKey === r.key ? '#EDE9FE' : '#6B6B7B',
        pick: () => app.setDraft({ rateKey: r.key }),
      })),
      showCount: d.mode !== 'edit',
      counts,
      countCustom: d.countCustom,
      countLabel: `${d.count} lessons`,
      countInc: () => app.setDraft({ count: Math.min(20, d.count + 1) }),
      countDec: () => app.setDraft({ count: Math.max(2, d.count - 1) }),
      multi: d.count > 1,
      freqs: [
        ['weekly', 'Weekly'],
        ['twice', 'Twice a week'],
      ].map((x) => ({
        t: x[1],
        ...choiceColors(d.freq === x[0]),
        pick: () => app.setDraft({ freq: x[0], shifts: {} }),
      })),
      sess: m.sess.map((x) => {
        const c = x.conflict ? bvm(app, x.conflict) : null;
        return {
          n: pad(x.i + 1),
          date: formatShortDate(x.date),
          time: d.start
            ? `${d.start}–${minutesToTime(timeToMinutes(d.start) + Math.round(d.dur * 60))}`
            : '—',
          conflict: !!c,
          cText: c ? `Clashes with ${c.name}, ${c.range}` : '',
          bg: c ? '#FFFBEB' : '#FFFFFF',
          shift: () => app.setDraft({ shifts: { ...d.shifts, [x.i]: (d.shifts[x.i] || 0) + 1 } }),
        };
      }),
      clashText: m.clashes.length
        ? `${m.clashes.length} session${m.clashes.length > 1 ? 's clash' : ' clashes'} with existing lessons. Move ${m.clashes.length > 1 ? 'them' : 'it'} to continue.`
        : '',
      locs: [
        ['home', 'Learner’s home'],
        ['test', 'Test centre'],
        ['other', 'Other'],
      ].map((x) => ({
        t: x[1],
        ...choiceColors(d.locMode === x[0]),
        pick: () => app.setDraft({ locMode: x[0] }),
      })),
      locText: m.loc || 'Choose a learner first',
      locPc: m.pc,
      notOther: d.locMode !== 'other',
      other: d.locMode === 'other',
      locAddr: d.locAddr,
      locPcIn: d.locPc,
      hLocAddr: (x) => app.setDraft({ locAddr: x.target.value }),
      hLocPc: (x) => app.setDraft({ locPc: x.target.value }),
      locErr: e.loc,
      discs: [
        ['none', 'None'],
        ['5', '£5'],
        ['10', '£10'],
        ['20', '£20'],
        ['custom', 'Custom'],
      ].map((x) => ({ t: x[1], ...choiceColors(d.disc === x[0]), pick: () => app.setDraft({ disc: x[0] }) })),
      discCustom: d.disc === 'custom',
      discIn: d.discCustom,
      hDisc: (x) => app.setDraft({ discCustom: x.target.value.replace(/[^\d.]/g, '') }),
      discErr: e.disc,
      discBd: e.disc ? ERROR_COLOR : BORDER_COLOR,
      rows: [
        { k: 'Hourly rate', v: `${formatGBP(m.rateO.rate)} × ${formatDurationShort(d.dur)}` },
        { k: d.count > 1 ? 'Per lesson' : 'Lesson value', v: formatGBP(m.per) },
      ].concat(d.count > 1 ? [{ k: `${d.count} lessons`, v: formatGBP(m.sub) }] : []),
      hasDisc: m.disc > 0,
      disc: '−' + formatGBP(m.disc),
      fin: formatGBP(m.fin),
      cta: d.mode === 'edit' ? 'Save changes' : 'Review booking',
      review: () => app.review(),
      foot: m.blocked
        ? 'Complete learner details to continue'
        : d.count > 1
          ? `${d.count} lessons · ${formatDurationLong(d.dur)} each`
          : `${formatShortDate(d.date)} · ${d.start || 'No time'} · ${formatDurationShort(d.dur)}`,
      ctaBg: m.blocked ? '#B4B4C4' : '#7C3AED',
    };
  }
  if (is.lesson) {
    const b = app.booking(prm.bid);
    if (b) {
      const L = app.learner(b.lid) || {};
      const bv = bvm(app, b);
      const can = ['upcoming', 'rescheduled'].includes(b.status);
      const mins = timeToMinutes(b.start) - NOW;
      v.ld = {
        ...bv,
        phone: L.phone || '',
        canChange: can,
        canNav: FUTURE_STATUSES.includes(b.status),
        isCancelled: b.status === 'cancelled',
        note:
          b.status === 'ongoing'
            ? `In progress · ends ${bv.end}`
            : b.status === 'cancelled'
              ? `Cancelled${b.reason ? ' · ' + b.reason : ''}`
              : b.status === 'completed'
                ? 'Lesson completed'
                : b.status === 'rescheduled'
                  ? `Moved from ${bv.prev}`
                  : b.date === TODAY
                    ? `Starts in ${mins >= 60 ? Math.floor(mins / 60) + ' hr ' : ''}${mins % 60} min`
                    : `In ${daysBetween(TODAY, b.date)} day${daysBetween(TODAY, b.date) > 1 ? 's' : ''}`,
        rateRow: `${formatGBP(b.rate)}/hr × ${formatDurationShort(b.dur)}`,
        call: () => app.showToast(`Calling ${L.name} · ${L.phone}`, 'neutral'),
        msg: () => app.openSheet('message', { kind: 'resend', ids: [b.id] }),
        resched: () => app.openEdit(b.id),
        cancel: () => app.openSheet('cancelLesson', { bid: b.id, reason: 'Learner request' }),
        nav: () => app.openSheet('maps', { bid: b.id }),
        profile: () => {
          if (!L.archived) app.pushScreen('learner', { lid: L.id });
        },
        profLabel: L.archived ? 'Removed learner · records kept' : 'View profile',
      };
    }
  }
  if (is.bookings) {
    const hf = s.hf;
    const upAll = B.filter((b) => FUTURE_STATUSES.includes(b.status)).sort(compareBookings);
    const groups = [];
    upAll.forEach((b) => {
      const lab =
        b.date === TODAY
          ? 'TODAY'
          : b.date === addDays(TODAY, 1)
            ? 'TOMORROW'
            : formatLongDate(b.date).toUpperCase();
      let g = groups[groups.length - 1];
      if (!g || g.label !== lab) {
        g = { label: lab, items: [] };
        groups.push(g);
      }
      g.items.push(bvm(app, b));
    });
    let hist = B.filter((b) => b.status === 'completed' || b.status === 'cancelled' || b.prev);
    if (hf.status !== 'all')
      hist = hist.filter((b) => (hf.status === 'rescheduled' ? !!b.prev : b.status === hf.status));
    if (hf.learner !== 'all') hist = hist.filter((b) => b.lid === hf.learner);
    if (hf.range === 'month') hist = hist.filter((b) => b.date.slice(0, 7) === TODAY.slice(0, 7));
    if (hf.range === '30') hist = hist.filter((b) => b.date >= addDays(TODAY, -30));
    hist.sort((a, b) => compareBookings(b, a));
    const comp = hist.filter((b) => b.status === 'completed');
    v.bk = {
      segs: [
        ['upcoming', 'Upcoming'],
        ['history', 'History'],
      ].map((x) => ({
        t: x[1],
        ...choiceColors(s.bkSeg === x[0]),
        pick: () => app.setState({ bkSeg: x[0] }),
      })),
      isUp: s.bkSeg === 'upcoming',
      isHist: s.bkSeg === 'history',
      groups,
      noUp: s.bkSeg === 'upcoming' && !upAll.length,
      statuses: [
        ['all', 'All'],
        ['completed', 'Completed'],
        ['cancelled', 'Cancelled'],
        ['rescheduled', 'Rescheduled'],
      ].map((x) => ({
        t: x[1],
        ...choiceColors(hf.status === x[0]),
        pick: () => app.setState({ hf: { ...hf, status: x[0] } }),
      })),
      learnerOpts: [{ v: 'all', t: 'All learners' }].concat(
        s.learners.map((l) => ({ v: l.id, t: l.name + (l.archived ? ' (removed)' : '') })),
      ),
      learner: hf.learner,
      hLearner: (e) => app.setState({ hf: { ...hf, learner: e.target.value } }),
      range: hf.range,
      rangeOpts: [
        { v: 'all', t: 'All time' },
        { v: 'month', t: 'This month' },
        { v: '30', t: 'Last 30 days' },
      ],
      hRange: (e) => app.setState({ hf: { ...hf, range: e.target.value } }),
      hist: hist.map((b) => bvm(app, b)),
      hasHist: hist.length > 0,
      noHist: !hist.length,
      summary: `${hist.length} record${hist.length === 1 ? '' : 's'} · ${formatGBP(comp.reduce((a, b) => a + fin(b), 0))} from completed lessons`,
      filtered: hf.status !== 'all' || hf.learner !== 'all' || hf.range !== 'all',
      reset: () => app.setState({ hf: { status: 'all', learner: 'all', range: 'all' } }),
      newBooking: go.newBooking,
    };
  }
  if (is.notifications) {
    const CT = {
      lessons: ['#DBEAFE', '#1D4ED8'],
      learners: ['#FEF3C7', '#92400E'],
      billing: ['#EDE9FE', '#6D28D9'],
      rewards: ['#DCFCE7', '#166534'],
    };
    const list = s.notifs.filter((n) => s.notifCat === 'all' || n.cat === s.notifCat);
    v.nt = {
      cats: [
        ['all', 'All'],
        ['lessons', 'Lessons'],
        ['learners', 'Learners'],
        ['billing', 'Billing'],
        ['rewards', 'Rewards'],
      ].map((x) => ({
        t: x[1],
        ...choiceColors(s.notifCat === x[0]),
        pick: () => app.setState({ notifCat: x[0] }),
      })),
      list: list.map((n) => ({
        title: n.title,
        body: n.body,
        time: n.time,
        dot: n.unread ? '#7C3AED' : 'transparent',
        bg: n.unread ? '#FAF8FF' : '#FFFFFF',
        icon: ic[n.icon] || ic.bell,
        tb: CT[n.cat][0],
        tf: CT[n.cat][1],
        cat: n.cat[0].toUpperCase() + n.cat.slice(1),
        open: () => {
          app.setState({ notifs: s.notifs.map((x) => (x.id === n.id ? { ...x, unread: false } : x)) });
          const a = n.act || {};
          if (a.lesson && app.booking(a.lesson)) app.pushScreen('lesson', { bid: a.lesson });
          else if (a.learner && app.learner(a.learner)) app.pushScreen('learner', { lid: a.learner });
          else if (a.screen) app.pushScreen(a.screen);
        },
      })),
      has: list.length > 0,
      empty: !list.length,
      hasUnread: unread > 0,
      markAll: () => app.setState({ notifs: s.notifs.map((x) => ({ ...x, unread: false })) }),
    };
  }
  if (is.more) {
    v.mo = {
      name: s.inst.name,
      initials: initials(s.inst.name),
      adi: `ADI ${s.inst.adi} · ${s.inst.status === 'adi' ? 'Approved Driving Instructor' : 'Trainee instructor'}`,
      badge: s.inst.status === 'adi' ? '#16A34A' : '#EC4899',
      business: s.inst.business || 'Independent instructor',
      subSub: {
        trial: `Free trial · ${trialDays} days left`,
        active: `${plan.name} · Active`,
        payment_failed: 'Payment failed · action needed',
        expired: 'Expired · renew to book',
        cancelled: 'Cancelled · no charge',
      }[sub],
      subC: {
        trial: '#6D28D9',
        active: '#166534',
        payment_failed: ERROR_COLOR,
        expired: ERROR_COLOR,
        cancelled: '#6B6B7B',
      }[sub],
      bankSub: s.bank
        ? `Sort code ••-••-${s.bank.sort.slice(-2)} · Acc ••••${s.bank.acct.slice(-4)}`
        : 'Not added — learners won’t see payment details',
      bankC: s.bank ? '#6B6B7B' : '#92400E',
      refSub: `${formatGBP(RC.bal)} credit · ${s.refCode}`,
      priceSub: `${formatGBP(s.inst.rates[0].rate)}/hr · ${formatDurationLong(s.inst.defaultDur)} default`,
      unread: unread ? `${unread} unread` : 'All caught up',
      logout: () => app.openSheet('logout'),
    };
  }
  if (is.subscription || is.upgrade || is.upgradeDone) {
    const fp = s.sub.trialEnd;
    const endD = parseIsoDate(fp);
    endD.setUTCMonth(endD.getUTCMonth() + plan.months);
    const tg = {
      trial: ['Free trial', '#EDE9FE', '#5B21B6'],
      active: ['Active', '#DCFCE7', '#166534'],
      payment_failed: ['Payment failed', '#FEE2E2', '#991B1B'],
      expired: ['Expired', '#0A0A0F', '#FFFFFF'],
      cancelled: ['Cancelled', '#E7E7EC', '#4A4A5A'],
    }[sub];
    const rows =
      sub === 'trial'
        ? [
            { k: 'Trial ends', v: formatFullDate(fp) },
            ...(s.sub.refBonus
              ? [{ k: 'Referral free month', v: `${formatDayMonth(fp)} – ${formatDate(addMonths(fp, 1))}` }]
              : []),
            {
              k: 'First payment',
              v: `${formatGBP(plan.total)} on ${s.sub.refBonus ? formatDate(addMonths(fp, 1)) : formatDate(fp)}`,
            },
            { k: 'Billing', v: planTermLabel(plan) },
            {
              k: 'Renews',
              v:
                plan.months === 1
                  ? 'Every month until cancelled'
                  : `${formatDate(toIsoDate(endD))} for ${plan.months} more months`,
            },
            { k: 'Payment method', v: s.sub.card },
          ]
        : sub === 'active'
          ? [
              {
                k: 'Next payment',
                v: `${formatGBP(plan.total)} on ${formatDate(shiftDemoDate('2026-10-26'))}`,
              },
              { k: 'Billing', v: planTermLabel(plan) },
              { k: 'Renews', v: plan.months === 1 ? 'Every month' : formatDate(toIsoDate(endD)) },
              { k: 'Payment method', v: s.sub.card },
            ]
          : sub === 'payment_failed'
            ? [
                {
                  k: 'Failed payment',
                  v: `${formatGBP(plan.total)} on ${formatDate(shiftDemoDate('2026-10-01'))}`,
                },
                { k: 'Next retry', v: formatDate(shiftDemoDate('2026-10-10')) },
                { k: 'Access until', v: formatDate(shiftDemoDate('2026-10-14')) },
                { k: 'Payment method', v: `${s.sub.card} · declined` },
              ]
            : sub === 'expired'
              ? [
                  { k: 'Expired on', v: formatDate(shiftDemoDate('2026-09-30')) },
                  { k: 'Your records', v: 'Kept safe for 12 months' },
                  { k: 'Bookings', v: 'Read-only until you renew' },
                ]
              : [
                  { k: 'Access until', v: formatFullDate(fp) },
                  { k: 'Charges', v: 'None — you won’t be billed' },
                  { k: 'Your records', v: 'Kept for 12 months' },
                ];
    const banner = {
      trial:
        trialDays <= 3
          ? {
              t: `Your trial ends in ${trialDays} days. The ${plan.name.toLowerCase()} plan starts automatically on ${formatShortDate(fp)}.`,
              bg: '#FFFBEB',
              fg: '#78350F',
              bd: '#FDE68A',
            }
          : null,
      payment_failed: {
        t: `We couldn’t take your ${formatGBP(plan.total)} payment on ${formatDayMonth(shiftDemoDate('2026-10-01'))}. Update your card by ${formatDayMonth(shiftDemoDate('2026-10-14'))} to keep booking lessons.`,
        bg: '#FEF2F2',
        fg: '#7F1D1D',
        bd: '#FECACA',
      },
      expired: {
        t: `Your subscription expired on ${formatDayMonth(shiftDemoDate('2026-09-30'))}. Learner and lesson records are safe — renew to start booking again.`,
        bg: '#0A0A0F',
        fg: '#FFFFFF',
        bd: '#0A0A0F',
      },
      cancelled: {
        t: `Cancelled. You keep full access until ${formatShortDate(fp)} and won’t be charged.`,
        bg: '#F7F7F9',
        fg: '#0A0A0F',
        bd: '#E7E7EC',
      },
      active: null,
    }[sub];
    const higher = PLANS.filter((x) => x.months > plan.months);
    v.sb = {
      planName: plan.name,
      price: formatGBP(plan.price),
      tag: tg[0],
      tagBg: tg[1],
      tagFg: tg[2],
      rows,
      banner,
      save: planSaving(plan)
        ? `Saving ${formatGBP(planSaving(plan))} over the term vs monthly`
        : 'No commitment · cancel any time',
      canUpgrade: higher.length > 0 && (sub === 'trial' || sub === 'active'),
      maxed: !higher.length && (sub === 'trial' || sub === 'active'),
      isCancelled: sub === 'cancelled',
      canCancel: sub === 'trial' || sub === 'active',
      cancelLabel: sub === 'trial' ? 'Cancel free trial' : 'Cancel subscription',
      fixPay: sub === 'payment_failed',
      renew: sub === 'expired',
      fixPayGo: () => app.showToast(`Card updated · ${formatGBP(plan.total)} payment taken`),
      renewGo: () => {
        app.setState({ upPick: plan.key });
        app.pushScreen('upgrade');
      },
      resume: () => {
        app.setState({ sub: { ...s.sub, state: 'trial' } });
        app.showToast('Subscription resumed');
      },
      cancel: () => app.openSheet('cancelSub'),
      upgrade: go.upgrade,
      credit:
        RC.bal > 0 && sub !== 'expired'
          ? {
              bal: formatGBP(RC.bal),
              t: s.autoCredit
                ? 'Will be applied to your next payment'
                : 'Use it on your next payment or a longer plan',
            }
          : null,
      isTrial: sub === 'trial',
      trialEnd: formatFullDate(fp),
      trialLeft: `${trialDays} of 14 days left`,
      trialPct: Math.max(4, Math.round(((14 - trialDays) / 14) * 100)),
    };
    const pk = PLANS.find((x) => x.key === s.upPick) || plan;
    const same = pk.key === plan.key && sub !== 'expired';
    const charge = pk.total;
    const canCr = RC.bal > 0 && !same;
    const applied = canCr && s.useCredit ? Math.min(RC.bal, charge) : 0;
    const payable = Math.round((charge - applied) * 100) / 100;
    const when = sub === 'trial' ? `when your trial ends on ${formatShortDate(fp)}` : 'today';
    v.up = {
      opts: PLANS.map((pl) => {
        const cur = pl.key === plan.key;
        const sel = pl.key === s.upPick;
        const dis = pl.months < plan.months && sub !== 'expired';
        return {
          name: pl.name,
          term: planTermLabel(pl),
          price: formatGBP(pl.total),
          per: planPeriodLabel(pl),
          save: planSaving(pl) ? `Save ${formatGBP(planSaving(pl))} · ${planDiscountPercent(pl)}% off` : '',
          cur,
          bg: sel ? '#F7F5FF' : '#FFFFFF',
          bd: sel ? '2px solid #7C3AED' : '1.5px solid #CFCFD8',
          ring: radioRing(sel),
          op: dis ? 0.45 : 1,
          pick: dis ? () => {} : () => app.setState({ upPick: pl.key }),
        };
      }),
      summary: same
        ? 'You’re already on this plan. Choose a longer term to save more.'
        : `${pk.name} for ${formatGBP(pk.total)}${pk.months > 1 ? ` (${formatGBP(pk.price)}/month)` : ''}, starting ${when}. ${planSaving(pk) ? `You save ${formatGBP(planSaving(pk))} over the term compared with monthly.` : ''}`,
      hasCredit: canCr,
      creditAvail: formatGBP(RC.bal),
      cred: {
        bg: s.useCredit ? '#7C3AED' : '#CFCFD8',
        x: s.useCredit ? 22 : 2,
        flip: () => app.setState({ useCredit: !s.useCredit }),
      },
      rows: same
        ? []
        : [
            { k: `${pk.name} plan`, v: formatGBP(charge), c: '#0A0A0F' },
            ...(applied ? [{ k: 'NexDrive Credit', v: '−' + formatGBP(applied), c: '#166534' }] : []),
          ],
      showRows: !same,
      payable: formatGBP(payable),
      payLabel: sub === 'trial' ? `Payable on ${formatShortDate(fp)}` : 'Amount payable today',
      creditLeft: applied ? `${formatGBP(RC.bal - applied)} credit left after this payment` : '',
      price: formatGBP(payable),
      was: same ? '' : applied ? `after ${formatGBP(applied)} NexDrive Credit` : `${pk.name} plan`,
      ctaBg: same ? '#B4B4C4' : '#7C3AED',
      cta: sub === 'expired' ? 'Renew subscription' : 'Confirm upgrade',
      confirm: () => {
        if (same) return;
        const now = Date.now();
        app.setState((st) => ({
          sub: { ...st.sub, plan: pk.key, state: st.sub.state === 'cancelled' ? 'trial' : st.sub.state },
          upDone: { applied, payable, charge },
          stack: [...st.stack.slice(0, -1), { name: 'upgradeDone' }],
          credit: applied
            ? [
                ...st.credit,
                {
                  id: 'T' + now,
                  date: TODAY,
                  type: 'redeemed',
                  desc: `Applied to ${pk.name} subscription`,
                  amt: -applied,
                },
              ]
            : st.credit,
          notifs: [
            ...(applied
              ? [
                  {
                    id: 'nc' + now,
                    cat: 'rewards',
                    icon: 'gift',
                    title: 'NexDrive Credit applied',
                    body: `${formatGBP(applied)} of your NexDrive Credit has been applied to your subscription.`,
                    time: 'now',
                    unread: true,
                    act: { screen: 'credit' },
                  },
                ]
              : []),
            {
              id: 'n' + now,
              cat: 'billing',
              icon: 'upgrade',
              title: 'Subscription upgraded',
              body: `You’re now on the ${pk.name.toLowerCase()} plan · ${formatGBP(pk.total)}${applied ? `, ${formatGBP(payable)} paid after credit` : ''}.`,
              time: 'now',
              unread: true,
              act: { screen: 'subscription' },
            },
            ...st.notifs,
          ],
        }));
      },
    };
    const ud = s.upDone || { applied: 0, payable: plan.total };
    v.upd = {
      name: plan.name,
      rows: [
        { k: 'Plan', v: `${plan.name} · ${formatGBP(plan.total)}` },
        ...(ud.applied
          ? [
              { k: 'NexDrive Credit used', v: '−' + formatGBP(ud.applied) },
              { k: 'Amount paid', v: formatGBP(ud.payable) },
            ]
          : [{ k: 'Amount', v: formatGBP(ud.payable) }]),
        { k: 'Starts', v: sub === 'trial' ? `${formatShortDate(fp)}, when your trial ends` : 'Today' },
        { k: 'Saving over term', v: planSaving(plan) ? formatGBP(planSaving(plan)) : '—' },
        { k: 'Receipt sent to', v: s.inst.email },
      ],
      done: () => app.back(),
    };
  }
  if (is.profile && s.profForm) {
    const f = s.profForm;
    const e = s.profTried
      ? {
          ...(!f.name.trim() ? { name: 'Enter your full name' } : {}),
          ...(!isValidUkMobile(f.phone) ? { phone: 'Enter a UK mobile number, like 07700 900123' } : {}),
          ...(!isValidEmail(f.email) ? { email: 'Enter a valid email address' } : {}),
        }
      : {};
    const h = (k) => app.setIn('profForm', k);
    v.pf = {
      f,
      e,
      b: {
        name: e.name ? ERROR_COLOR : BORDER_COLOR,
        phone: e.phone ? ERROR_COLOR : BORDER_COLOR,
        email: e.email ? ERROR_COLOR : BORDER_COLOR,
      },
      h: {
        name: h('name'),
        phone: h('phone'),
        email: h('email'),
        address: h('address'),
        postcode: h('postcode'),
        business: h('business'),
        areas: h('areas'),
      },
      initials: initials(f.name),
      status: f.status === 'adi' ? 'Approved Driving Instructor' : 'Trainee instructor (PDI)',
      badge: f.status === 'adi' ? '#16A34A' : '#EC4899',
      photo: () => app.showToast('Choose a photo from your library', 'neutral'),
      save: () => {
        if (!f.name.trim() || !isValidUkMobile(f.phone) || !isValidEmail(f.email))
          return app.setState({ profTried: true });
        app.setState({
          inst: {
            ...s.inst,
            ...f,
            areas: f.areas
              .split(',')
              .map((x) => x.trim().toUpperCase())
              .filter(Boolean),
          },
        });
        app.back();
        app.showToast('Profile updated');
      },
    };
  }
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
          app.setState({ priceForm: { ...f, rates } });
        },
      })),
      durs: [
        [1, '1 hour'],
        [1.5, '1.5 hours'],
        [2, '2 hours'],
      ].map((x) => ({
        t: x[1],
        ...choiceColors(f.dur === x[0]),
        pick: () => app.setState({ priceForm: { ...f, dur: x[0] } }),
      })),
      preview: [1, 2, 3].map((x) => ({ k: formatDurationLong(x), v: formatGBP(std * x) })),
      save: () => {
        if (bad) return app.showToast('Enter a price above £0 for every rate', 'err');
        app.setState({
          inst: {
            ...s.inst,
            defaultDur: f.dur,
            rates: f.rates.map((r) => ({ ...r, rate: parseFloat(r.rate) })),
          },
        });
        app.back();
        app.showToast(`Prices saved · new bookings use ${formatGBP(std)}/hr`);
      },
    };
  }
  if (is.bank) {
    const f = s.bankForm || { holder: '', sort: '', acct: '', include: true };
    const sc = f.sort.replace(/\D/g, ''),
      ac = f.acct.replace(/\D/g, '');
    const e = s.bankTried
      ? {
          ...(!f.holder.trim() ? { holder: 'Enter the name on the account' } : {}),
          ...(sc.length !== 6 ? { sort: 'Sort codes are 6 digits, like 20-45-77' } : {}),
          ...(ac.length !== 8 ? { acct: 'Account numbers are 8 digits' } : {}),
        }
      : {};
    const editing = !s.bank || !!s.bankEdit;
    v.bk2 = {
      editing,
      saved: !editing,
      f,
      e,
      b: {
        holder: e.holder ? ERROR_COLOR : BORDER_COLOR,
        sort: e.sort ? ERROR_COLOR : BORDER_COLOR,
        acct: e.acct ? ERROR_COLOR : BORDER_COLOR,
      },
      missing: !s.bank,
      h: {
        holder: app.setIn('bankForm', 'holder'),
        sort: (x) => {
          const d = x.target.value.replace(/\D/g, '').slice(0, 6);
          app.setState({ bankForm: { ...f, sort: d.replace(/(\d{2})(?=\d)/g, '$1-') } });
        },
        acct: (x) =>
          app.setState({ bankForm: { ...f, acct: x.target.value.replace(/\D/g, '').slice(0, 8) } }),
      },
      holder: s.bank ? s.bank.holder : '',
      sortM: s.bank ? (s.bankReveal ? s.bank.sort : `••-••-${s.bank.sort.slice(-2)}`) : '',
      acctM: s.bank ? (s.bankReveal ? s.bank.acct : `••••${s.bank.acct.slice(-4)}`) : '',
      reveal: () => app.setState({ bankReveal: !s.bankReveal }),
      revealLabel: s.bankReveal ? 'Hide' : 'Show',
      revealIcon: s.bankReveal ? ics.eyeOff : ics.eye,
      inc: tog(s.bank && !s.bankEdit ? s.bank.include : f.include, () => {
        if (s.bank && !s.bankEdit) app.setState({ bank: { ...s.bank, include: !s.bank.include } });
        else app.setState({ bankForm: { ...f, include: !f.include } });
      }),
      edit: () => app.setState({ bankEdit: true, bankForm: { ...s.bank }, bankTried: false }),
      cancelEdit: () => app.setState({ bankEdit: false }),
      canCancelEdit: !!s.bank,
      remove: () => {
        app.setState({
          bank: null,
          bankEdit: false,
          bankForm: { holder: s.inst.name, sort: '', acct: '', include: true },
        });
        app.showToast('Bank details removed', 'neutral');
      },
      save: () => {
        if (!f.holder.trim() || sc.length !== 6 || ac.length !== 8) return app.setState({ bankTried: true });
        app.setState({
          bank: {
            holder: f.holder.trim(),
            sort: sc.replace(/(\d{2})(?=\d)/g, '$1-'),
            acct: ac,
            include: f.include,
          },
          bankEdit: false,
          bankReveal: false,
        });
        app.showToast('Bank details saved securely');
      },
    };
  }
  if (is.prefs) {
    const pr = s.prefs;
    const set = (k) => () => app.setState({ prefs: { ...pr, [k]: !pr[k] } });
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
        pick: () => app.setState({ prefs: { ...pr, mins: x } }),
      })),
      chans: ['SMS', 'WhatsApp', 'Email'].map((x) => ({
        t: x,
        ...choiceColors(pr.channel === x),
        pick: () => app.setState({ prefs: { ...pr, channel: x } }),
      })),
      showMins: pr.reminder,
    };
  }
  if (is.security) {
    const f = s.pw;
    const e =
      f && s.pwTried
        ? {
            ...(!f.cur ? { cur: 'Enter your current password' } : {}),
            ...(f.nw.length < 8 || !/\d/.test(f.nw)
              ? { nw: 'Use at least 8 characters, including a number' }
              : {}),
            ...(f.nw !== f.conf ? { conf: 'Passwords don’t match' } : {}),
          }
        : {};
    v.sec = {
      phone: s.inst.phone,
      email: s.inst.email,
      open: !!f,
      toggle: () => app.setState({ pw: f ? null : { cur: '', nw: '', conf: '' }, pwTried: false }),
      pwLabel: f ? 'Cancel' : 'Change',
      f: f || { cur: '', nw: '', conf: '' },
      e,
      b: {
        cur: e.cur ? ERROR_COLOR : BORDER_COLOR,
        nw: e.nw ? ERROR_COLOR : BORDER_COLOR,
        conf: e.conf ? ERROR_COLOR : BORDER_COLOR,
      },
      h: { cur: app.setIn('pw', 'cur'), nw: app.setIn('pw', 'nw'), conf: app.setIn('pw', 'conf') },
      save: () => {
        if (!f.cur || f.nw.length < 8 || !/\d/.test(f.nw) || f.nw !== f.conf)
          return app.setState({ pwTried: true });
        app.setState({ pw: null });
        app.showToast('Password changed');
      },
      logout: () => app.openSheet('logout'),
      verified: () => app.showToast('Already verified', 'neutral'),
    };
  }

  const S = s.sheet;
  if (!S) return;
  if (S.type === 'learnerActions' || S.type === 'deleteLearner') {
    const L = app.learner(S.lid);
    if (L) {
      const up = B.filter((b) => b.lid === L.id && ['upcoming', 'rescheduled'].includes(b.status));
      v.la = {
        ...lvm(L),
        view: () => app.pushScreen('learner', { lid: L.id }),
        schedule: () => app.openBooking(L.id),
        resched: () => app.learnerPick(L.id, 'reschedule'),
        cancel: () => app.learnerPick(L.id, 'cancel'),
        call: () => {
          app.setState({ sheet: null });
          app.showToast(`Calling ${L.name} · ${L.phone}`, 'neutral');
        },
        del: () => app.openSheet('deleteLearner', { lid: L.id }),
        upText: up.length ? `${up.length} upcoming lesson${up.length > 1 ? 's' : ''}` : 'No upcoming lessons',
        delNote: up.length
          ? `${up.length} upcoming lesson${up.length > 1 ? 's' : ''} will also be cancelled.`
          : '',
        hasUp: up.length > 0,
        confirmDel: () => app.deleteLearner(L.id),
        keep: () => app.setState({ sheet: null }),
      };
    }
  }
  if (S.type === 'pickLearner')
    v.pl = {
      list: active
        .slice()
        .sort((a, b) => a.name.localeCompare(b.name))
        .map(lvm),
      empty: !active.length,
      add: () => {
        app.setState({ sheet: null });
        app.openLearnerForm(null, null);
      },
    };
  if (S.type === 'pickBooking') {
    const up = B.filter((b) => b.lid === S.lid && ['upcoming', 'rescheduled'].includes(b.status)).sort(
      compareBookings,
    );
    v.pb = {
      title:
        S.mode === 'reschedule' ? 'Which lesson do you want to move?' : 'Which lesson do you want to cancel?',
      list: up.map((b) => ({
        ...bvm(app, b),
        pick: () =>
          S.mode === 'reschedule'
            ? app.openEdit(b.id)
            : app.openSheet('cancelLesson', { bid: b.id, reason: 'Learner request' }),
      })),
    };
  }
  if (S.type === 'conflict') {
    const c = app.booking(S.cid);
    if (c) {
      const cn = (app.learner(c.lid) || {}).name;
      v.cf = {
        ...bvm(app, c),
        title: S.dup
          ? 'This lesson is already booked'
          : 'You already have a lesson scheduled during this time.',
        body: S.dup
          ? `${cn} already has a lesson at ${S.start} on ${formatShortDate(S.date)}. Booking it again would create a duplicate.`
          : `A lesson at ${S.start} on ${formatShortDate(S.date)} would overlap this booking.`,
        another: () => {
          const d = app.state.draft;
          app.setState({ sheet: null });
          if (S.idx > 0) app.setDraft({ shifts: { ...d.shifts, [S.idx]: (d.shifts[S.idx] || 0) + 1 } });
          else app.setDraft({ start: '' });
        },
        view: () => app.pushScreen('lesson', { bid: c.id }),
        cancel: () =>
          app.setState((st) => ({
            sheet: null,
            draft: null,
            stack: st.stack.filter((x) => x.name !== 'booking'),
          })),
      };
    }
  }
  if (S.type === 'confirm') {
    const m = app.bfModel();
    if (m && m.L) {
      const d = m.d;
      const end = minutesToTime(timeToMinutes(d.start) + Math.round(d.dur * 60));
      v.cm = {
        title: d.count > 1 ? `Confirm ${d.count} lessons` : 'Confirm booking',
        multi: d.count > 1,
        rows: [{ k: 'Learner', v: m.L.name }]
          .concat(
            d.count > 1
              ? [{ k: 'Schedule', v: `${d.freq === 'weekly' ? 'Weekly' : 'Twice a week'} at ${d.start}` }]
              : [
                  { k: 'Date', v: formatFullDate(d.date) },
                  { k: 'Time', v: `${d.start}–${end}` },
                ],
          )
          .concat([
            { k: 'Duration', v: formatDurationLong(d.dur) + (d.count > 1 ? ' each' : '') },
            { k: 'Location', v: `${m.loc}, ${m.pc}` },
          ]),
        sess:
          d.count > 1
            ? m.sess.map((x) => ({ n: pad(x.i + 1), t: `${formatShortDate(x.date)} · ${d.start}–${end}` }))
            : [],
        price: [
          {
            k:
              d.count > 1
                ? `${d.count} × ${formatGBP(m.per)}`
                : `Lesson value (${formatGBP(m.rateO.rate)} × ${formatDurationShort(d.dur)})`,
            v: formatGBP(m.sub),
          },
        ].concat(m.disc ? [{ k: 'Discount', v: '−' + formatGBP(m.disc) }] : []),
        fin: formatGBP(m.fin),
        confirm: () => app.confirmBooking(),
        edit: () => app.setState({ sheet: null }),
      };
    }
  }
  if (S.type === 'message') v.msg = msgVm(app, S);
  if (S.type === 'cancelLesson') {
    const b = app.booking(S.bid);
    if (b)
      v.cl = {
        ...bvm(app, b),
        reasons: ['Learner request', 'Instructor unavailable', 'Weather', 'Vehicle issue', 'Other'].map(
          (r) => ({
            t: r,
            ...choiceColors(S.reason === r),
            pick: () => app.setState({ sheet: { ...S, reason: r } }),
          }),
        ),
        confirm: () => app.cancelLesson(b.id, S.reason),
        keep: () => app.setState({ sheet: null }),
        late: b.date === TODAY || b.date === addDays(TODAY, 1),
      };
  }
  if (S.type === 'maps') {
    const b = app.booking(S.bid);
    if (b) {
      const q = `${b.loc}, ${b.pc}`;
      v.mp = {
        ...bvm(app, b),
        url: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(q)}&travelmode=driving`,
        storeUrl: 'https://apps.apple.com/gb/app/google-maps/id585027354',
        opened: !!S.opened,
        open: () => app.setState({ sheet: { ...S, opened: true } }),
        copy: () => {
          try {
            navigator.clipboard.writeText(q);
          } catch {
            // Best effort: not available in every browser or context.
          }
          app.showToast('Address copied');
        },
        steps: [
          ['NexDrive', 'Lesson selected'],
          ['Google Maps', 'Opens with destination'],
          ['Destination', b.pc],
          ['Start', 'Tap Start in Maps'],
        ].map((x, i) => ({
          n: pad(i + 1),
          t: x[0],
          d: x[1],
          c: S.opened || i === 0 ? '#7C3AED' : '#CFCFD8',
        })),
      };
    }
  }
  if (S.type === 'cancelSub')
    v.cs = {
      title: sub === 'trial' ? 'Cancel your free trial?' : 'Cancel your subscription?',
      body:
        sub === 'trial'
          ? `You won’t be charged. You keep full access until ${formatFullDate(s.sub.trialEnd)}, then bookings become read-only. Learner and lesson records are kept for 12 months.`
          : 'Your plan stays active until the end of your current term, then won’t renew. You won’t be charged again after that.',
      confirm: () => {
        app.setState({ sub: { ...s.sub, state: 'cancelled' }, sheet: null });
        app.showToast(
          sub === 'trial' ? 'Free trial cancelled · no charge' : 'Subscription will not renew',
          'neutral',
        );
      },
      keep: () => app.setState({ sheet: null }),
    };
  if (S.type === 'logout')
    v.lo = {
      confirm: () => {
        clearTimeout(app.pt);
        app.setState({ ...app.init('onboarding', 'empty'), vw: s.vw, vh: s.vh }, () => {
          if (app.launchOn()) app.startSplash();
        });
      },
      keep: () => app.setState({ sheet: null }),
    };
  if (S.type === 'expired')
    v.ex = {
      renew: () => {
        app.setState({ sheet: null, upPick: plan.key });
        app.pushScreen('upgrade');
      },
    };
}
