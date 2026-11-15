import { Component, createRef } from 'react';
import qrcode from 'qrcode-generator';
import AppView from './AppView';
import { buildViewModel } from './viewModel';
import {
  FUT,
  PLANS,
  REF,
  REF_CODES,
  REF_USED_PHONES,
  TEST,
  cmpB,
  genCode,
  liveStatus,
  refReward,
} from './data/constants';
import { seedBookings, seedCredit, seedInst, seedLearners, seedNotifs, seedReferrals } from './data/seeds';
import {
  NOW,
  TODAY,
  addDays,
  addMonths,
  dayDiff,
  durL,
  fD,
  fDM,
  fS,
  fSY,
  hm,
  sd,
  syncClock,
  tm,
} from './lib/dates';
import { cLic, gbp } from './lib/format';
import { vEmail, vLic, vPc, vPhone } from './lib/validation';

// The whole NexDrive app. This class owns all the data (`this.state`) and every action that changes it
// (booking a lesson, saving a learner, switching screens…). It does not draw anything itself:
// render() hands the state to buildViewModel() (viewModel.js), which prepares display-ready values,
// and <AppView> (AppView.jsx) draws the screens from those values.
export default class App extends Component {
  // Preview settings, carried over from the design tool. Change them here (or pass them from main.jsx)
  // to start the app in a different state.
  static defaultProps = {
    device: 'phone', // 'phone' | 'large' | 'tablet': size of the phone frame on desktop
    startAt: 'dashboard', // 'dashboard' | 'onboarding'
    launchAnimation: true,
    dataState: 'populated', // 'populated' | 'empty'
    subscriptionState: 'active', // 'active' | 'trial' | 'payment_failed' | 'expired'
    offline: false, // true shows the offline banner and makes sending messages fail
  };

  scrollRef = createRef();
  state = this.init(
    this.props.startAt === 'onboarding' ? 'onboarding' : 'app',
    this.props.dataState || 'populated',
  );
  init(phase, data) {
    syncClock();
    const full = data !== 'empty';
    return {
      vw: typeof window !== 'undefined' ? window.innerWidth : 1280,
      vh: typeof window !== 'undefined' ? window.innerHeight : 900,
      phase,
      ob: 'welcome',
      flow: null,
      reg: { name: '', phone: '', email: '', password: '', terms: false },
      regTried: false,
      otp: '',
      otpErr: '',
      resent: false,
      det: { adi: '', status: 'adi', business: '', areas: 'SL1, SL2, SL3', rate: '40', dur: 1 },
      detTried: false,
      obPlan: '12m',
      obCard: false,
      obCardTried: false,
      tab: 'home',
      stack: [],
      learners: full ? seedLearners() : [],
      bookings: full ? seedBookings() : [],
      notifs: full ? seedNotifs() : [],
      inst: seedInst(),
      bank: full ? { holder: 'Daniel Wilson', sort: '20-45-77', acct: '73015521', include: true } : null,
      sub: {
        plan: '1m',
        state: 'active',
        trialEnd: sd('2026-10-10'),
        start: sd('2025-10-26'),
        card: 'Visa •••• 4242',
      },
      sheet: null,
      toast: null,
      push: false,
      reminder: full,
      calView: 'day',
      calDate: TODAY,
      lSearch: '',
      lFilter: 'all',
      lf: null,
      lfTried: false,
      lfRet: null,
      draft: null,
      bkSeg: 'upcoming',
      hf: { status: 'all', learner: 'all', range: 'all' },
      profSeg: 'upcoming',
      notifCat: 'all',
      upPick: '12m',
      ref: { code: '', status: null, via: null },
      refCode: REF.code,
      refs: full ? seedReferrals() : [],
      credit: full ? seedCredit() : [],
      autoCredit: false,
      useCredit: true,
      crFilter: 'all',
      upDone: null,
      prefs: {
        reminder: true,
        mins: '30',
        askSend: true,
        channel: 'SMS',
        bookingAlerts: true,
        billing: true,
        learnerAlerts: true,
      },
      bankForm: null,
      bankTried: false,
      bankReveal: false,
      priceForm: null,
      profForm: null,
      profTried: false,
      pw: null,
      pwTried: false,
    };
  }
  componentDidMount() {
    this.onR = () => this.setState({ vw: window.innerWidth, vh: window.innerHeight });
    window.addEventListener('resize', this.onR);
    this.onR();
    this.ck = setInterval(() => this.tick(), 15000);
    this.onVis = () => {
      if (!document.hidden) this.tick();
    };
    document.addEventListener('visibilitychange', this.onVis);
    window.addEventListener('focus', this.onVis);
    try {
      const q = new URLSearchParams(window.location.search).get('ref');
      if (q)
        this.startRefOnboarding(
          q
            .toUpperCase()
            .replace(/[^A-Z0-9]/g, '')
            .slice(0, 16),
          'link',
        );
    } catch (e) {}
    if (this.launchOn()) this.startSplash();
    else this.schedulePush();
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.onR);
    clearInterval(this.ck);
    document.removeEventListener('visibilitychange', this.onVis);
    window.removeEventListener('focus', this.onVis);
    clearTimeout(this.pt);
    clearTimeout(this.pt2);
    clearTimeout(this.tt);
    clearTimeout(this.st1);
    clearTimeout(this.st2);
  }
  cfg() {
    return (typeof window !== 'undefined' && window.NEXDRIVE_CONFIG) || {};
  }
  launchOn() {
    return this.props.launchAnimation !== false && this.cfg().launchAnimation !== false;
  }
  startSplash() {
    clearTimeout(this.st1);
    clearTimeout(this.st2);
    clearTimeout(this.pt);
    clearTimeout(this.pt2);
    this.splashRun = (this.splashRun || 0) + 1;
    this.setState({ splash: true, splashOut: false, push: false });
    this.st1 = setTimeout(() => this.setState({ splashOut: true }), 2700);
    this.st2 = setTimeout(() => {
      this.setState({ splash: false, splashOut: false });
      this.schedulePush();
    }, 3150);
  }
  skipSplash() {
    clearTimeout(this.st1);
    clearTimeout(this.st2);
    this.setState({ splashOut: true });
    this.st2 = setTimeout(() => {
      this.setState({ splash: false, splashOut: false });
      this.schedulePush();
    }, 300);
  }
  componentDidUpdate(pp) {
    if (pp && pp.dataState !== this.props.dataState) this.reseed(this.props.dataState || 'populated');
    // When the visible screen changes, scroll the new screen back to the top.
    const k = this.screenKey(this.state);
    if (k !== this._lastKey) {
      this._lastKey = k;
      if (this.scrollRef.current) this.scrollRef.current.scrollTop = 0;
    }
  }
  screenKey(s) {
    if (!s || !s.stack) return '';
    const t = s.stack[s.stack.length - 1];
    return s.phase + s.ob + s.tab + s.stack.length + (t ? t.name + JSON.stringify(t.params || {}) : '');
  }
  tick() {
    const pd = TODAY,
      pn = NOW;
    syncClock();
    if (pd === TODAY && pn === NOW) return;
    const s = this.state;
    const ch = { bookings: s.bookings.map(liveStatus) };
    if (s.calDate === pd && pd !== TODAY) ch.calDate = TODAY;
    this.setState(ch, () => {
      const st = this.state;
      if (st.phase !== 'app' || !st.reminder || !st.prefs.reminder) return;
      const nb = this.nextLesson();
      if (nb && nb.id !== this._pushed && tm(nb.start) - NOW <= (+st.prefs.mins || 30)) this.schedulePush();
    });
  }
  nextLesson(any) {
    return this.state.bookings
      .filter(
        (b) =>
          ['upcoming', 'rescheduled'].includes(b.status) &&
          (any ? b.date >= TODAY : b.date === TODAY) &&
          (b.date > TODAY || tm(b.start) > NOW),
      )
      .sort(cmpB)[0];
  }
  pushInfo(b) {
    const L = this.state.learners.find((l) => l.id === b.lid);
    const mins = dayDiff(TODAY, b.date) * 1440 + tm(b.start) - NOW;
    const when =
      mins < 60
        ? `${mins} minute${mins === 1 ? '' : 's'}`
        : b.date === TODAY
          ? `${Math.floor(mins / 60)} hr${mins % 60 ? ' ' + (mins % 60) + ' min' : ''}`
          : null;
    return {
      bid: b.id,
      title: when
        ? `Your next lesson starts in ${when}`
        : `Your next lesson is ${b.date === addDays(TODAY, 1) ? 'tomorrow' : 'on ' + fS(b.date)}`,
      text: `${L ? L.name : 'Learner'} · ${b.date === TODAY ? '' : fS(b.date) + ', '}${b.start} · ${durL(b.dur)} · ${b.pc}`,
    };
  }
  schedulePush(force) {
    clearTimeout(this.pt);
    clearTimeout(this.pt2);
    const s = this.state;
    if (s.phase !== 'app' || !s.reminder || !s.prefs.reminder) return;
    const b = this.nextLesson(force);
    if (!b) return;
    if (!force && tm(b.start) - NOW > (+s.prefs.mins || 30)) return;
    this._pushed = b.id;
    this.pt = setTimeout(
      () => {
        this.setState({ push: true, pushInfo: this.pushInfo(b) });
        this.pt2 = setTimeout(() => this.setState({ push: false }), 6500);
      },
      force ? 700 : 1600,
    );
  }
  reseed(data, extra = {}, cb) {
    const n = this.init('app', data);
    this.setState({ ...n, vw: this.state.vw, vh: this.state.vh, ...extra }, () => {
      this.schedulePush();
      cb && cb();
    });
  }
  flow(k) {
    const f = { flow: k };
    if (k === 'onboarding') {
      clearTimeout(this.pt);
      this.setState({ ...this.init('onboarding', 'empty'), vw: this.state.vw, vh: this.state.vh, ...f });
      return;
    }
    if (k === 'learner') return this.reseed('populated', { tab: 'learners', ...f });
    if (k === 'booking') return this.reseed('populated', f, () => this.openBooking('L1'));
    if (k === 'package')
      return this.reseed('populated', f, () => this.openBooking('L1', { count: 5, disc: '10' }));
    if (k === 'calendar') return this.reseed('populated', { tab: 'calendar', calView: 'week', ...f });
    if (k === 'nav') return this.reseed('populated', { tab: 'home', ...f }, () => this.schedulePush(true));
    if (k === 'sub')
      return this.reseed('populated', { tab: 'more', stack: [{ name: 'subscription' }], ...f });
    if (k === 'referral') return this.reseed('populated', { tab: 'home', ...f });
    if (k === 'refManual') {
      clearTimeout(this.pt);
      this.setState({
        ...this.init('onboarding', 'empty'),
        vw: this.state.vw,
        vh: this.state.vh,
        ...f,
        ob: 'register',
      });
      return;
    }
    if (k === 'refQr') return this.startRefOnboarding('NEXDANIEL25', 'qr', f);
    if (k === 'reward')
      return this.reseed('populated', { tab: 'home', ...f }, () => setTimeout(() => this.qualify('R6'), 450));
    if (k === 'credit')
      return this.reseed('populated', {
        tab: 'more',
        stack: [{ name: 'subscription' }, { name: 'upgrade' }],
        upPick: '12m',
        useCredit: true,
        ...f,
      });
    if (k === 'incomplete') return this.reseed('populated', f, () => this.openBooking('L4'));
    if (k === 'conflict')
      return this.reseed('populated', f, () => {
        this.openBooking('L5');
        // pickSlot reads the draft from this.state, so wait until the new date is in state.
        setTimeout(() => this.setDraft({ date: addDays(TODAY, 1) }, () => this.pickSlot('10:30')), 30);
      });
    if (k === 'empty') return this.reseed('empty', { tab: 'home', ...f });
  }
  checkRef(code) {
    const c = (code || '').trim().toUpperCase().replace(/\s/g, '');
    if (!c) return null;
    const r = REF_CODES[c];
    if (!r) return 'invalid';
    if (!r.active) return 'inactive';
    const ph = (this.state.reg.phone || '').replace(/\D/g, '').replace(/^44/, '0');
    const em = (this.state.reg.email || '').trim().toLowerCase();
    if ((r.phone && ph === r.phone) || (r.email && em === r.email)) return 'self';
    if (REF_USED_PHONES.includes(ph)) return 'used';
    return 'valid';
  }
  startRefOnboarding(code, via, extra = {}) {
    clearTimeout(this.pt);
    const n = this.init('onboarding', 'empty');
    this.setState(
      { ...n, vw: this.state.vw, vh: this.state.vh, ...extra, ref: { code, status: null, via } },
      () => this.setState((st) => ({ ref: { ...st.ref, status: this.checkRef(code) } })),
    );
  }
  qualify(rid) {
    const s = this.state;
    const r = s.refs.find((x) => x.id === rid);
    if (!r || r.status === 'awarded' || !r.plan) return;
    const amt = refReward(PLANS.find((p) => p.key === r.plan));
    const first = r.name.split(' ')[0];
    const now = Date.now();
    this.setState({
      refs: s.refs.map((x) => (x.id === rid ? { ...x, status: 'awarded', awardedOn: TODAY } : x)),
      credit: [
        ...s.credit,
        { id: 'T' + now, date: TODAY, type: 'referral', desc: `Referral reward — ${r.name}`, ref: rid, amt },
      ],
      notifs: [
        {
          id: 'n' + now,
          cat: 'rewards',
          icon: 'gift',
          title: `${gbp(amt)} added to your NexDrive Credit`,
          body: `Great news! ${first} has joined NexDrive using your referral code. ${gbp(amt)} has been added to your NexDrive Credit.`,
          time: 'now',
          unread: true,
          act: { screen: 'credit' },
        },
        ...s.notifs.filter((n) => n.id !== 'n2'),
      ],
      tab: 'home',
      stack: [{ name: 'referrals' }],
      sheet: null,
    });
    this.toast(`${first}’s referral qualified · ${gbp(amt)} credit added`);
  }
  copy(t, msg) {
    try {
      navigator.clipboard && navigator.clipboard.writeText(t).catch(() => {});
    } catch (e) {}
    this.toast(msg);
  }
  openExt(url) {
    try {
      window.open(url, '_blank', 'noopener');
    } catch (e) {}
  }
  nativeShare(text, url) {
    if (navigator.share) navigator.share({ title: 'Join me on NexDrive', text, url }).catch(() => {});
    else this.copy(url, 'Referral link copied');
  }
  qrPng(link) {
    return new Promise((res) => {
      const q = qrcode(0, 'M');
      q.addData(link);
      q.make();
      const n = q.getModuleCount();
      const W = 720,
        H = 900,
        cs = Math.floor(560 / (n + 8)),
        qs = cs * (n + 8),
        ox = Math.round((W - qs) / 2),
        oy = 130;
      const c = document.createElement('canvas');
      c.width = W;
      c.height = H;
      const x = c.getContext('2d');
      x.fillStyle = '#FFFFFF';
      x.fillRect(0, 0, W, H);
      const ff = '"Hanken Grotesk","Helvetica Neue",Arial,sans-serif';
      x.fillStyle = '#0A0A0F';
      x.font = '500 40px ' + ff;
      x.fillText('NEX', 60, 82);
      const w = x.measureText('NEX').width;
      x.fillStyle = '#7C3AED';
      x.fillText('Drive', 60 + w + 6, 82);
      x.fillStyle = '#0A0A0F';
      x.fillRect(60, 108, W - 120, 2);
      for (let r = 0; r < n; r++)
        for (let cc = 0; cc < n; cc++)
          if (q.isDark(r, cc)) x.fillRect(ox + (cc + 4) * cs, oy + (r + 4) * cs, cs, cs);
      const y = oy + qs + 40;
      x.fillStyle = '#6B6B7B';
      x.font = '600 20px ' + ff;
      x.fillText('REFERRAL CODE', 60, y);
      x.fillStyle = '#0A0A0F';
      x.font = '700 48px ' + ff;
      x.fillText(this.state.refCode, 60, y + 56);
      x.fillStyle = '#4A4A5A';
      x.font = '400 22px ' + ff;
      x.fillText('Scan to join NexDrive · 14-day trial + 1 month free', 60, y + 100);
      c.toBlob((b) => res(b), 'image/png');
    });
  }
  async saveQr(link) {
    const b = await this.qrPng(link);
    if (!b) return this.toast('QR code is still loading — try again', 'warn');
    const u = URL.createObjectURL(b);
    const a = document.createElement('a');
    a.href = u;
    a.download = `nexdrive-referral-${this.state.refCode}.png`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(u), 2000);
    this.toast('QR code saved');
  }
  async shareQr(link, text) {
    const b = await this.qrPng(link);
    try {
      if (b && navigator.canShare) {
        const f = new File([b], `nexdrive-referral-${this.state.refCode}.png`, { type: 'image/png' });
        if (navigator.canShare({ files: [f] })) {
          await navigator.share({ files: [f], title: 'Join me on NexDrive', text });
          return;
        }
      }
      if (navigator.share) {
        await navigator.share({ title: 'Join me on NexDrive', text, url: link });
        return;
      }
    } catch (e) {
      if (e && e.name === 'AbortError') return;
    }
    this.saveQr(link);
  }
  cur() {
    const s = this.state;
    return s.stack.length ? s.stack[s.stack.length - 1] : { name: s.tab, params: {} };
  }
  push(name, params = {}) {
    this.setState((s) => ({ stack: [...s.stack, { name, params }], sheet: null }));
  }
  replaceTop(items) {
    this.setState((s) => ({ stack: [...s.stack.slice(0, -1), ...items], sheet: null }));
  }
  back() {
    this.setState((s) => ({ stack: s.stack.slice(0, -1), sheet: null }));
  }
  goTab(t) {
    this.setState({ tab: t, stack: [], sheet: null });
  }
  toast(text, kind = 'ok') {
    clearTimeout(this.tt);
    this.setState({ toast: { text, kind } });
    this.tt = setTimeout(() => this.setState({ toast: null }), 3000);
  }
  sheet(type, p = {}) {
    this.setState({ sheet: { type, ...p } });
  }
  learner(id) {
    return this.state.learners.find((l) => l.id === id);
  }
  booking(id) {
    return this.state.bookings.find((b) => b.id === id);
  }
  missing(l) {
    const m = [];
    if (!l) return ['Learner'];
    if (!(l.name || '').trim()) m.push('Full name');
    if (!vPhone(l.phone)) m.push('Mobile number');
    if (!(l.address || '').trim()) m.push('Address');
    if (!vPc(l.postcode)) m.push('Postcode');
    if (!vLic(l.licence)) m.push('Provisional licence number');
    return m;
  }
  overlap(date, sm, dm, excl = []) {
    return this.state.bookings.find(
      (b) =>
        b.date === date &&
        b.status !== 'cancelled' &&
        !excl.includes(b.id) &&
        tm(b.start) < sm + dm &&
        sm < tm(b.start) + b.dur * 60,
    );
  }
  subState() {
    return this.state.sub.state === 'cancelled' ? 'cancelled' : this.props.subscriptionState || 'active';
  }
  failing() {
    return !!this.props.offline;
  }
  setIn(key, field) {
    return (e) => {
      const v = e && e.target ? (e.target.type === 'checkbox' ? e.target.checked : e.target.value) : e;
      this.setState((s) => ({ [key]: { ...s[key], [field]: v } }));
    };
  }
  regErr(r) {
    const e = {};
    if (!r.name.trim()) e.name = 'Enter your full name';
    if (!vPhone(r.phone))
      e.phone = r.phone.trim() ? 'Enter a UK mobile number, like 07700 900123' : 'Enter your mobile number';
    if (!vEmail(r.email))
      e.email = r.email.trim()
        ? 'Enter a valid email address, like name@example.co.uk'
        : 'Enter your email address';
    if (r.password.length < 8 || !/\d/.test(r.password) || !/[a-z]/i.test(r.password)) e.password = 'x';
    if (!r.terms) e.terms = 'Accept the terms to continue';
    return e;
  }
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
  }
  obNext() {
    const s = this.state;
    if (s.ob === 'register') {
      const rs = s.ref.code.trim() ? this.checkRef(s.ref.code) : null;
      if (rs !== s.ref.status) this.setState({ ref: { ...s.ref, status: rs } });
      if (Object.keys(this.regErr(s.reg)).length) return this.setState({ regTried: true });
      if (rs && rs !== 'valid') return;
      return this.setState({ ob: 'verify', otp: '', otpErr: '' });
    }
    if (s.ob === 'verify') {
      if (s.otp.replace(/\D/g, '') === '482913') return this.setState({ ob: 'details' });
      return this.setState({
        otpErr:
          s.otp.length < 6 ? 'Enter all 6 digits' : 'That code doesn’t match. Check the SMS and try again.',
      });
    }
    if (s.ob === 'details') {
      if (Object.keys(this.detErr(s.det)).length) return this.setState({ detTried: true });
      return this.setState({ ob: 'plan' });
    }
    if (s.ob === 'plan') {
      if (!s.obCard) return this.setState({ obCardTried: true });
      return this.setState({ ob: 'started' });
    }
  }
  obBack() {
    const order = ['welcome', 'register', 'verify', 'details', 'plan', 'started'];
    const i = order.indexOf(this.state.ob);
    this.setState({ ob: order[Math.max(0, i - 1)] });
  }
  finishOb(add) {
    const s = this.state;
    const r = s.reg,
      d = s.det;
    const name = r.name.trim() || 'Daniel Wilson';
    const inst = {
      ...seedInst(),
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
    const n = this.init('app', 'empty');
    this.setState(
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
        refCode: genCode(name),
        notifs: [
          ...(s.ref.status === 'valid'
            ? [
                {
                  id: 'nr0',
                  cat: 'rewards',
                  icon: 'gift',
                  title: 'Referral applied — 1 month free',
                  body: `Thanks to your referral, your free month runs from ${fDM(addDays(TODAY, 14))} to ${fD(addMonths(addDays(TODAY, 14), 1))}, straight after your 14-day trial.`,
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
            body: `Full access until ${fSY(addDays(TODAY, 14))}. Cancel any time in Account → Subscription.`,
            time: 'now',
            unread: true,
            act: { screen: 'subscription' },
          },
        ],
      },
      () => {
        if (add) this.openLearnerForm(null, null);
      },
    );
  }
  openLearnerForm(lid, ret) {
    const l = lid
      ? { ...this.learner(lid) }
      : {
          id: null,
          name: '',
          phone: '',
          email: '',
          address: '',
          postcode: '',
          licence: '',
          theory: '',
          notes: '',
        };
    this.setState((s) => ({
      lf: l,
      lfTried: !!lid && ret === 'booking',
      lfRet: ret,
      stack: [...s.stack, { name: 'learnerForm', params: { lid } }],
      sheet: null,
    }));
  }
  lfErr(l, strict) {
    const e = {};
    if (!l.name.trim()) e.name = 'Enter the learner’s full name';
    if (!l.phone.trim()) {
      if (strict) e.phone = 'Needed to send lesson details';
    } else if (!vPhone(l.phone)) e.phone = 'Enter a UK mobile number, like 07700 900123';
    if (l.email.trim() && !vEmail(l.email)) e.email = 'Enter a valid email address, like name@example.co.uk';
    if (!l.address.trim() && strict) e.address = 'Needed for the pickup location';
    if (!l.postcode.trim()) {
      if (strict) e.postcode = 'Enter a postcode';
    } else if (!vPc(l.postcode)) e.postcode = 'Enter a full UK postcode, like SL1 3NY';
    if (!l.licence.trim()) {
      if (strict) e.licence = 'Needed before booking a lesson';
    } else if (!vLic(l.licence)) e.licence = 'Licence numbers are 16 characters, like SMITH 801157 J9 9AB';
    if (l.theory.trim() && !/^\d{8}$/.test(l.theory.replace(/\s/g, '')))
      e.theory = 'Theory certificate numbers are 8 digits';
    return e;
  }
  saveLearner(andBook) {
    const s = this.state;
    const l = { ...s.lf, postcode: s.lf.postcode.toUpperCase().trim(), licence: cLic(s.lf.licence) };
    const strict = andBook || s.lfRet === 'booking';
    const e = this.lfErr(l, strict);
    if (Object.keys(e).length) return this.setState({ lfTried: true, lfStrict: strict });
    const isNew = !l.id;
    const id = l.id || 'L' + Date.now();
    const rec = { ...l, id, since: l.since || TODAY };
    const learners = isNew ? [...s.learners, rec] : s.learners.map((x) => (x.id === id ? rec : x));
    const inc = this.missing(rec).length > 0;
    this.setState({ learners, lf: null, lfTried: false }, () => {
      if (s.lfRet === 'booking') {
        this.back();
        this.toast(`${rec.name.split(' ')[0]}’s profile is complete`);
        return;
      }
      if (andBook) {
        this.replaceTop([{ name: 'learner', params: { lid: id } }]);
        setTimeout(() => this.openBooking(id), 0);
        return;
      }
      if (isNew) this.replaceTop([{ name: 'learner', params: { lid: id } }]);
      else this.back();
      this.toast(
        isNew
          ? inc
            ? `${rec.name} added · details incomplete`
            : `${rec.name} added`
          : 'Learner details saved',
        inc ? 'warn' : 'ok',
      );
    });
  }
  deleteLearner(lid) {
    const s = this.state;
    const L = this.learner(lid);
    let n = 0;
    const bookings = s.bookings.map((b) => {
      if (b.lid === lid && FUT.includes(b.status) && b.status !== 'ongoing') {
        n++;
        return { ...b, status: 'cancelled', reason: 'Learner removed' };
      }
      return b;
    });
    const learners = s.learners.map((l) => (l.id === lid ? { ...l, archived: true, archivedOn: TODAY } : l));
    const stack = s.stack.filter((x) => !(x.name === 'learner' && x.params.lid === lid));
    this.setState({ learners, bookings, stack, sheet: null });
    this.toast(
      `${L.name} removed. ${n ? n + ' upcoming lesson' + (n > 1 ? 's' : '') + ' cancelled. ' : ''}Records kept in History.`,
    );
  }
  firstFree(date, dur) {
    for (let m = 8 * 60; m <= 19 * 60; m += 30) {
      if (date === TODAY && m <= NOW + 15) continue;
      if (!this.overlap(date, m, dur * 60)) return hm(m);
    }
    return null;
  }
  openBooking(lid = null, o = {}) {
    const s = this.state;
    if (this.subState() === 'expired') return this.sheet('expired');
    const dur = s.inst.defaultDur;
    let date = TODAY;
    let start = this.firstFree(date, dur);
    if (!start) {
      date = addDays(TODAY, 1);
      start = this.firstFree(date, dur) || '09:00';
    }
    const d = {
      mode: 'new',
      lid,
      date,
      start,
      dur,
      custom: false,
      rateKey: 'std',
      disc: o.disc || 'none',
      discCustom: '',
      count: o.count || 1,
      countCustom: false,
      freq: 'weekly',
      locMode: 'home',
      locAddr: '',
      locPc: '',
      shifts: {},
      tried: false,
    };
    if (lid && o.count > 1) {
      d.date = addDays(TODAY, 2);
      d.start = '10:00';
      d.dur = 2;
    }
    this.setState((st) => ({ draft: d, stack: [...st.stack, { name: 'booking' }], sheet: null }));
  }
  openEdit(bid) {
    const b = this.booking(bid);
    const L = this.learner(b.lid) || {};
    const disc = b.discount ? ([5, 10, 20].includes(b.discount) ? String(b.discount) : 'custom') : 'none';
    const locMode = b.loc === L.address ? 'home' : b.loc === TEST.loc ? 'test' : 'other';
    const d = {
      mode: 'edit',
      bid,
      lid: b.lid,
      date: b.date,
      start: b.start,
      dur: b.dur,
      custom: ![1, 1.5, 2].includes(b.dur),
      rateKey: b.rateKey || 'std',
      disc,
      discCustom: String(b.discount || ''),
      count: 1,
      countCustom: false,
      freq: 'weekly',
      locMode,
      locAddr: locMode === 'other' ? b.loc : '',
      locPc: locMode === 'other' ? b.pc : '',
      shifts: {},
      tried: false,
    };
    this.setState((st) => ({ draft: d, stack: [...st.stack, { name: 'booking' }], sheet: null }));
  }
  setDraft(p, done) {
    this.setState((s) => ({ draft: { ...s.draft, ...p } }), done);
  }
  discVal(d) {
    return d.disc === 'custom' ? parseFloat(d.discCustom) || 0 : d.disc === 'none' ? 0 : +d.disc;
  }
  sessions(d) {
    const out = [];
    let off = 0;
    const ex = d.mode === 'edit' ? [d.bid] : [];
    for (let i = 0; i < d.count; i++) {
      if (i > 0) off += d.freq === 'weekly' ? 7 : i % 2 === 1 ? 3 : 4;
      const date = addDays(d.date, off + (d.shifts[i] || 0));
      const c = d.start ? this.overlap(date, tm(d.start), d.dur * 60, ex) : null;
      out.push({ i, date, conflict: c });
    }
    return out;
  }
  bfModel() {
    const s = this.state,
      d = s.draft;
    if (!d) return null;
    const L = this.learner(d.lid);
    const rateO = s.inst.rates.find((r) => r.key === d.rateKey) || s.inst.rates[0];
    const per = rateO.rate * d.dur;
    const sub = per * d.count;
    const disc = this.discVal(d);
    const fin = Math.max(0, sub - disc);
    const sess = this.sessions(d);
    const clashes = sess.filter((x) => x.conflict);
    const miss = L ? this.missing(L) : [];
    const loc = d.locMode === 'home' ? (L ? L.address : '') : d.locMode === 'test' ? TEST.loc : d.locAddr;
    const pc =
      d.locMode === 'home' ? (L ? L.postcode : '') : d.locMode === 'test' ? TEST.pc : d.locPc.toUpperCase();
    const errs = {};
    if (!L) errs.learner = 'Choose a learner';
    if (!d.start) errs.start = 'Choose a start time';
    if (d.start && d.date === TODAY && tm(d.start) <= NOW)
      errs.start = 'That time has already passed — choose a later slot';
    if (disc > sub) errs.disc = `Discount can’t be more than the lesson value (${gbp(sub)})`;
    if (disc < 0) errs.disc = 'Discount must be £0 or more';
    if (d.locMode === 'other') {
      if (!d.locAddr.trim()) errs.loc = 'Enter a pickup address';
      else if (!vPc(d.locPc)) errs.loc = 'Enter a full UK postcode, like SL1 3NY';
    }
    return {
      d,
      L,
      rateO,
      per,
      sub,
      disc,
      fin,
      sess,
      clashes,
      miss,
      loc,
      pc,
      errs,
      blocked: miss.length > 0 && !!L,
    };
  }
  pickSlot(t) {
    const d = this.state.draft;
    const c = this.overlap(d.date, tm(t), d.dur * 60, d.mode === 'edit' ? [d.bid] : []);
    this.setDraft({ start: t });
    if (c)
      this.sheet('conflict', { cid: c.id, dup: c.lid === d.lid && c.start === t, date: d.date, start: t });
  }
  pickDate(date) {
    const d = this.state.draft;
    let start = d.start;
    const ex = d.mode === 'edit' ? [d.bid] : [];
    if (!start || (date === TODAY && tm(start) <= NOW) || this.overlap(date, tm(start), d.dur * 60, ex))
      start = this.firstFree(date, d.dur) || '';
    this.setDraft({ date, start, shifts: {} });
  }
  review() {
    const m = this.bfModel();
    this.setDraft({ tried: true });
    if (m.blocked || Object.keys(m.errs).length) return;
    if (m.clashes.length) {
      const c = m.clashes[0];
      return this.sheet('conflict', {
        cid: c.conflict.id,
        dup: c.conflict.lid === m.d.lid && c.conflict.start === m.d.start,
        date: c.date,
        start: m.d.start,
        idx: c.i,
      });
    }
    if (m.d.mode === 'edit') return this.saveEdit(m);
    this.sheet('confirm');
  }
  confirmBooking() {
    const s = this.state;
    const m = this.bfModel();
    const d = m.d;
    const per = m.disc / d.count;
    const pkg = d.count > 1 ? 'P' + Date.now() : null;
    const nb = m.sess.map((x, i) => ({
      id: 'nb' + Date.now() + '_' + i,
      lid: d.lid,
      date: x.date,
      start: d.start,
      dur: d.dur,
      rate: m.rateO.rate,
      rateKey: m.rateO.key,
      discount: Math.round(per * 100) / 100,
      status: 'upcoming',
      loc: m.loc,
      pc: m.pc,
      pkg,
    }));
    const body =
      d.count > 1
        ? `${d.count} lessons for ${m.L.name} · ${gbp(m.fin)}${m.disc ? ` after ${gbp(m.disc)} discount` : ''}.`
        : `${m.L.name} · ${fS(d.date)}, ${d.start} · ${gbp(m.fin)}`;
    this.setState({
      bookings: [...s.bookings, ...nb],
      notifs: [
        {
          id: 'n' + Date.now(),
          cat: 'lessons',
          icon: 'calendarPlus',
          title: 'Booking created',
          body,
          time: 'now',
          unread: true,
          act: { lesson: nb[0].id },
        },
        ...s.notifs,
      ],
      sheet: { type: 'message', kind: 'new', ids: nb.map((b) => b.id) },
    });
  }
  saveEdit(m) {
    const s = this.state,
      d = m.d;
    const b = this.booking(d.bid);
    const disc = m.disc;
    const timeCh = b.date !== d.date || b.start !== d.start;
    const ch = timeCh || b.dur !== d.dur || b.loc !== m.loc || b.discount !== disc || b.rate !== m.rateO.rate;
    if (!ch) {
      this.back();
      return this.toast('No changes to save');
    }
    const prev = {
      date: b.date,
      start: b.start,
      dur: b.dur,
      fin: b.rate * b.dur - b.discount,
      loc: b.loc,
      pc: b.pc,
    };
    const nb = {
      ...b,
      date: d.date,
      start: d.start,
      dur: d.dur,
      rate: m.rateO.rate,
      rateKey: m.rateO.key,
      discount: disc,
      loc: m.loc,
      pc: m.pc,
      status: timeCh && b.status !== 'ongoing' ? 'rescheduled' : b.status,
      prev: timeCh ? { date: b.date, start: b.start } : b.prev,
    };
    this.setState({
      bookings: s.bookings.map((x) => (x.id === b.id ? nb : x)),
      notifs: [
        {
          id: 'n' + Date.now(),
          cat: 'lessons',
          icon: 'repeat',
          title: 'Booking changed',
          body: `${(this.learner(b.lid) || {}).name} · ${fS(b.date)} ${b.start} → ${fS(d.date)} ${d.start}`,
          time: 'now',
          unread: true,
          act: { lesson: b.id },
        },
        ...s.notifs,
      ],
      sheet: { type: 'message', kind: 'update', ids: [b.id], prev },
    });
  }
  cancelLesson(bid, reason) {
    const s = this.state;
    const b = this.booking(bid);
    this.setState({
      bookings: s.bookings.map((x) => (x.id === bid ? { ...x, status: 'cancelled', reason } : x)),
      notifs: [
        {
          id: 'n' + Date.now(),
          cat: 'lessons',
          icon: 'calendarX',
          title: 'Booking cancelled',
          body: `${(this.learner(b.lid) || {}).name} · ${fS(b.date)}, ${b.start} · ${reason}`,
          time: 'now',
          unread: true,
          act: { lesson: bid },
        },
        ...s.notifs,
      ],
      sheet: { type: 'message', kind: 'cancel', ids: [bid], reason },
    });
  }
  sendMsg() {
    const sh = this.state.sheet;
    if (this.failing()) return this.setState({ sheet: { ...sh, failed: true, sending: false } });
    this.setState({ sheet: { ...sh, sending: true, failed: false } });
    setTimeout(() => {
      const b = this.booking(sh.ids[0]);
      const L = b && this.learner(b.lid);
      this.afterMsg(sh);
      this.toast(`Sent to ${L ? L.name.split(' ')[0] : 'learner'} by ${this.state.prefs.channel}`);
    }, 700);
  }
  skipMsg() {
    const sh = this.state.sheet;
    this.afterMsg(sh);
    this.toast(
      sh.kind === 'cancel'
        ? 'Lesson cancelled · learner not notified'
        : sh.kind === 'update'
          ? 'Booking updated · learner not notified'
          : 'Booking confirmed · learner not notified',
      sh.kind === 'cancel' ? 'neutral' : 'ok',
    );
  }
  afterMsg(sh) {
    const s = this.state;
    const top = s.stack[s.stack.length - 1];
    if (sh.kind === 'new' && top && top.name === 'booking') {
      this.setState({
        stack: [...s.stack.slice(0, -1), { name: 'lesson', params: { bid: sh.ids[0] } }],
        sheet: null,
        draft: null,
      });
      return;
    }
    if (sh.kind === 'update' && top && top.name === 'booking') {
      this.setState({ stack: s.stack.slice(0, -1), sheet: null, draft: null });
      return;
    }
    this.setState({ sheet: null });
  }
  goBank() {
    const s = this.state;
    this.setState({
      bankForm: s.bank ? { ...s.bank } : { holder: s.inst.name, sort: '', acct: '', include: true },
      bankTried: false,
      bankReveal: false,
      bankEdit: false,
    });
    this.push('bank');
  }
  learnerPick(lid, mode) {
    const up = this.state.bookings
      .filter((b) => b.lid === lid && ['upcoming', 'rescheduled'].includes(b.status))
      .sort(cmpB);
    if (!up.length) {
      this.setState({ sheet: null });
      return this.toast(
        mode === 'reschedule' ? 'No upcoming lessons to reschedule' : 'No upcoming lessons to cancel',
        'neutral',
      );
    }
    if (up.length === 1)
      return mode === 'reschedule'
        ? this.openEdit(up[0].id)
        : this.sheet('cancelLesson', { bid: up[0].id, reason: 'Learner request' });
    this.sheet('pickBooking', { lid, mode });
  }

  // Turn the current state into display-ready values (`v`), then draw every screen from them.
  render() {
    return <AppView v={buildViewModel(this)} />;
  }
}
