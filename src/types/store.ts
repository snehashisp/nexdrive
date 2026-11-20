// The shape of the app store: its data (AppData) and the actions each slice provides. The slices
// implement these interfaces in their own folders; this shared file is the contract between them, so a
// slice can call another feature's action through get() without importing that feature.
import type { StoreApi } from 'zustand';
import type {
  AppNotification,
  BankDetails,
  Booking,
  BookingDraft,
  CreditTransaction,
  Instructor,
  Learner,
  Preferences,
  RateCard,
  Referral,
  Sheet,
  StackEntry,
  Subscription,
  Toast,
} from './models';
import type { IsoDate, TimeHHMM } from '@/lib/dates';

/** The preview switches (see DEFAULT_PREVIEW in src/app/App.tsx). */
export interface Preview {
  device: 'phone' | 'large' | 'tablet';
  startAt: 'dashboard' | 'onboarding';
  launchAnimation: boolean;
  dataState: 'populated' | 'empty';
  subscriptionState: string;
  offline: boolean;
}

/** Runtime settings from public/js/config.js (window.NEXDRIVE_CONFIG). */
export interface RuntimeConfig {
  mode?: string;
  apiBaseUrl?: string;
  referralBaseUrl?: string;
  showDemoPanel?: boolean;
  deviceFrame?: boolean;
  launchAnimation?: boolean;
}

export type Phase = 'onboarding' | 'app';

export interface RegistrationForm {
  name: string;
  phone: string;
  email: string;
  password: string;
  terms: boolean;
}

export interface InstructorDetailsForm {
  adi: string;
  status: string;
  business: string;
  /** Comma-separated postcode areas. */
  areas: string;
  rate: string;
  dur: number;
}

/** A referral code being entered at registration, and how it was checked. */
export interface ReferralEntry {
  code: string;
  status: string | null;
  via: string | null;
}

export type LearnerFormValues = Omit<Learner, 'id'> & { id: string | null };

export type ProfileForm = Omit<Instructor, 'areas'> & { areas: string };

export interface PriceForm {
  rates: (Omit<RateCard, 'rate'> & { rate: string })[];
  dur: number;
}

export interface PasswordForm {
  cur: string;
  nw: string;
  conf: string;
}

/** The lesson-reminder banner. */
export interface ReminderInfo {
  bid: string;
  title: string;
  text: string;
}

/** Everything the app stores (see initialState.ts). */
export interface AppData {
  vw: number;
  vh: number;
  phase: Phase;
  /** Current onboarding step. */
  ob: string;
  /** The demo workflow last started from the DemoPanel. */
  flow: string | null;
  reg: RegistrationForm;
  regTried: boolean;
  otp: string;
  otpErr: string;
  resent: boolean;
  det: InstructorDetailsForm;
  detTried: boolean;
  obPlan: string;
  obCard: boolean;
  obCardTried: boolean;
  tab: string;
  stack: StackEntry[];
  learners: Learner[];
  bookings: Booking[];
  notifs: AppNotification[];
  inst: Instructor;
  bank: BankDetails | null;
  sub: Subscription;
  sheet: Sheet | null;
  toast: Toast | null;
  /** The lesson-reminder banner is showing. */
  push: boolean;
  pushInfo?: ReminderInfo;
  reminder: boolean;
  splash?: boolean;
  splashOut?: boolean;
  calView: string;
  calDate: IsoDate;
  lSearch: string;
  lFilter: string;
  /** The learner form while open. */
  lf: LearnerFormValues | null;
  lfTried: boolean;
  lfStrict?: boolean;
  /** Where the learner form returns to ('booking' when opened from the booking form). */
  lfRet: string | null;
  draft: BookingDraft | null;
  bkSeg: string;
  hf: { status: string; learner: string; range: string };
  profSeg: string;
  notifCat: string;
  upPick: string;
  ref: ReferralEntry;
  refCode: string;
  refs: Referral[];
  credit: CreditTransaction[];
  autoCredit: boolean;
  useCredit: boolean;
  crFilter: string;
  upDone: { applied: number; payable: number; charge?: number } | null;
  prefs: Preferences;
  bankForm: BankDetails | null;
  bankTried: boolean;
  bankReveal: boolean;
  bankEdit?: boolean;
  priceForm: PriceForm | null;
  profForm: ProfileForm | null;
  profTried: boolean;
  pw: PasswordForm | null;
  pwTried: boolean;
}

/** Timer handles (reminder banner, toast, splash) and counters kept outside display state. */
export interface Timers {
  pt?: ReturnType<typeof setTimeout>;
  pt2?: ReturnType<typeof setTimeout>;
  tt?: ReturnType<typeof setTimeout>;
  st1?: ReturnType<typeof setTimeout>;
  st2?: ReturnType<typeof setTimeout>;
  /** Increments on each splash start, so the animation restarts. */
  splashRun?: number;
  /** Id of the lesson the reminder banner last announced. */
  _pushed?: string;
}

/** Store plumbing shared by all slices (createAppStore.ts). */
export interface StoreCore {
  preview: Preview;
  /** Timer handles and counters that are not display state. */
  timers: Timers;
  init: (phase: Phase, data: string) => AppData;
  /** React-style setState: merge an object (or updater(state)), then run the callback. */
  setState: (
    update: Partial<AppStore> | ((state: AppStore) => Partial<AppStore>),
    callback?: () => void,
  ) => void;
}

/** A screen's form-field change handler, made by setIn(key, field). */
export type FieldHandler = (e: unknown) => void;

export interface AppActions {
  mount: () => () => void;
  cfg: () => RuntimeConfig;
  launchOn: () => boolean;
  failing: () => boolean;
  startSplash: () => void;
  skipSplash: () => void;
  tick: () => void;
  reseed: (data: string, extra?: Partial<AppStore>, cb?: () => void) => void;
  cur: () => StackEntry;
  pushScreen: (name: string, params?: StackEntry['params']) => void;
  replaceTop: (items: StackEntry[]) => void;
  back: () => void;
  goTab: (t: string) => void;
  showToast: (text: string, kind?: string) => void;
  openSheet: (type: string, p?: Record<string, unknown>) => void;
  setIn: (key: keyof AppData, field: string) => FieldHandler;
  copy: (text: string, msg: string) => void;
  openExt: (url: string) => void;
}

export interface DemoActions {
  lookupReferralCode: (
    code: string,
  ) => { owner: string; active: boolean; phone?: string; email?: string } | undefined;
  isReferralPhoneUsed: (phone: string) => boolean;
  newInstructorProfile: () => Instructor;
  runFlow: (key: string) => void;
}

export interface NotificationsActions {
  nextLesson: (any?: boolean) => Booking | undefined;
  reminderInfo: (b: Booking) => ReminderInfo;
  schedulePush: (force?: boolean) => void;
}

export interface OnboardingActions {
  fillSampleRegistration: () => void;
  checkRef: (code: string) => string | null;
  startRefOnboarding: (code: string, via: string, extra?: Partial<AppStore>) => void;
  regErr: (r: RegistrationForm) => Record<string, string>;
  detErr: (d: InstructorDetailsForm) => Record<string, string>;
  obNext: () => void;
  obBack: () => void;
  finishOb: (addLearner: boolean) => void;
}

export interface LearnersActions {
  learner: (id: string | null | undefined) => Learner | undefined;
  missing: (l: Learner | undefined) => string[];
  openLearnerForm: (lid: string | null, ret: string | null) => void;
  lfErr: (l: LearnerFormValues, strict: boolean) => Record<string, string>;
  saveLearner: (andBook?: boolean) => void;
  deleteLearner: (lid: string) => void;
  learnerPick: (lid: string, mode: string) => void;
}

/** One session of a booking being made, with any clash. */
export interface DraftSession {
  i: number;
  date: IsoDate;
  conflict: Booking | null | undefined;
}

/** The booking form's calculated state (see bfModel). */
export interface BookingFormModel {
  d: BookingDraft;
  L: Learner | undefined;
  rateO: RateCard;
  per: number;
  sub: number;
  disc: number;
  fin: number;
  sess: DraftSession[];
  clashes: DraftSession[];
  miss: string[];
  loc: string;
  pc: string;
  errs: Record<string, string>;
  blocked: boolean;
}

export interface BookingsActions {
  booking: (id: string | null | undefined) => Booking | undefined;
  overlap: (date: IsoDate, startMin: number, durMin: number, exclude?: string[]) => Booking | undefined;
  firstFree: (date: IsoDate, dur: number) => TimeHHMM | null;
  openBooking: (lid?: string | null, o?: { count?: number; disc?: string }) => void;
  openEdit: (bid: string) => void;
  setDraft: (patch: Partial<BookingDraft>, done?: () => void) => void;
  discVal: (d: BookingDraft) => number;
  sessions: (d: BookingDraft) => DraftSession[];
  bfModel: () => BookingFormModel | null;
  pickSlot: (t: TimeHHMM) => void;
  pickDate: (date: IsoDate) => void;
  review: () => void;
  confirmBooking: () => void;
  saveEdit: (m: BookingFormModel) => void;
  cancelLesson: (bid: string, reason: string) => void;
  sendMsg: () => void;
  skipMsg: () => void;
  afterMsg: (sheet: Sheet) => void;
}

export interface ReferralsActions {
  qualify: (rid: string) => void;
  nativeShare: (text: string, url: string) => void;
  qrPng: (link: string) => Promise<Blob | null>;
  saveQr: (link: string) => Promise<void>;
  shareQr: (link: string, text: string) => Promise<void>;
}

export interface SettingsActions {
  goBank: () => void;
}

export interface SubscriptionActions {
  subState: () => string;
}

export type AppStore = AppData &
  StoreCore &
  AppActions &
  DemoActions &
  NotificationsActions &
  OnboardingActions &
  LearnersActions &
  BookingsActions &
  ReferralsActions &
  SettingsActions &
  SubscriptionActions;

/** The signature every slice creator has: Zustand's set/get for the whole store. */
export type SliceCreator<Actions> = (
  set: StoreApi<AppStore>['setState'],
  get: StoreApi<AppStore>['getState'],
) => Actions;
