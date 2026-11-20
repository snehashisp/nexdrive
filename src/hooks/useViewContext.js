import { iconSet } from '@/components/iconSet';
import { DEVICE_SIZES } from '@/config/devices';
import { FUTURE_STATUSES, compareBookings } from '@/domain/bookings';
import { PLANS } from '@/domain/plans';
import { PENDING_REFERRAL_STATUSES } from '@/domain/referrals';
import { TODAY, daysBetween, formatShortDate } from '@/lib/dates';
import { initials } from '@/lib/format';
import { useStoreFacade } from './useStoreFacade';

// Values every screen's view hook starts from: the store, the visible screen (`is`), layout sizes, icons,
// navigation handlers (`go`), and data used across features (upcoming lessons, credit totals…).
// `common` holds what most screens take: icons, back/close handlers, bottom padding and `go`.
export function useViewContext() {
  const store = useStoreFacade();
  const s = store.state,
    p = store.props;
  const ic = iconSet(20),
    ics = iconSet(16),
    icl = iconSet(24);
  const devKey = DEVICE_SIZES[p.device] ? p.device : 'phone';
  const dev = DEVICE_SIZES[devKey];
  const tablet = devKey === 'tablet';
  const cfg = store.cfg();
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
  const top = store.cur();
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
  const sub = store.subState();
  const plan = PLANS.find((x) => x.key === s.sub.plan) || PLANS[1];
  const go = {
    home: () => store.goTab('home'),
    calendar: () => store.goTab('calendar'),
    learners: () => store.goTab('learners'),
    more: () => store.goTab('more'),
    quick: () => store.openSheet('quickAdd'),
    newBooking: () => store.openBooking(null),
    package: () => store.openBooking(null, { count: 5 }),
    addLearner: () => store.openLearnerForm(null, null),
    notifications: () => store.pushScreen('notifications'),
    referrals: () => store.pushScreen('referrals'),
    referralShare: () => store.pushScreen('referralQr'),
    credit: () => store.pushScreen('credit'),
    bookings: () => store.pushScreen('bookings'),
    subscription: () => store.pushScreen('subscription'),
    upgrade: () => {
      store.setState({
        upPick: PLANS.find((x) => x.months > plan.months)
          ? PLANS.find((x) => x.months > plan.months).key
          : plan.key,
      });
      store.pushScreen('upgrade');
    },
    profile: () => {
      store.setState({ profForm: { ...s.inst, areas: s.inst.areas.join(', ') }, profTried: false });
      store.pushScreen('profile');
    },
    pricing: () => {
      store.setState({
        priceForm: {
          rates: s.inst.rates.map((r) => ({ ...r, rate: String(r.rate) })),
          dur: s.inst.defaultDur,
        },
      });
      store.pushScreen('pricing');
    },
    bank: () => {
      store.setState({
        bankForm: s.bank ? { ...s.bank } : { holder: s.inst.name, sort: '', acct: '', include: true },
        bankTried: false,
        bankReveal: false,
      });
      store.pushScreen('bank');
    },
    prefs: () => store.pushScreen('prefs'),
    security: () => {
      store.setState({ pw: null, pwTried: false });
      store.pushScreen('security');
    },
    history: () => {
      store.setState({ bkSeg: 'history' });
      store.pushScreen('bookings');
    },
  };
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
  const fin = (b) => Math.max(0, b.rate * b.dur - b.discount);
  const lvm = (l) => {
    const miss = store.missing(l);
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
      open: () => store.openSheet('learnerActions', { lid: l.id }),
      pick: () => store.setState((st) => ({ draft: { ...st.draft, lid: l.id }, sheet: null })),
    };
  };
  const tog = (on, flip) => ({ bg: on ? '#7C3AED' : '#CFCFD8', x: on ? 22 : 2, flip });
  const common = {
    ic,
    ics,
    icl,
    go,
    padB,
    back: () => store.back(),
    stop: (e) => e.stopPropagation(),
    closeSheet: () => store.setState({ sheet: null }),
  };
  return {
    store,
    s,
    p,
    ic,
    ics,
    icl,
    tablet,
    cfg,
    frameless,
    panel,
    fr,
    statusBar,
    sbH,
    padB,
    top,
    scr,
    prm,
    is,
    showNav,
    nav,
    sub,
    plan,
    go,
    B,
    active,
    fut,
    unread,
    trialDays,
    RC,
    fin,
    lvm,
    tog,
    common,
  };
}
