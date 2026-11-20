// The app's domain data, as held in the store. These mirror what the front end uses today (string ids,
// pounds as numbers, durations in hours); docs/internal/database.md §7 maps them to the database model.
import type { IsoDate, TimeHHMM } from '@/lib/dates';

/** A learner driver. Archived learners keep their history but are hidden from active lists. */
export interface Learner {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  postcode: string;
  /** DVLA provisional licence number (16 characters, no spaces). */
  licence: string;
  /** Theory test certificate number (8 digits), if passed. */
  theory: string;
  notes: string;
  since?: IsoDate;
  archived?: boolean;
  archivedOn?: IsoDate;
}

export type LessonStatus = 'upcoming' | 'ongoing' | 'completed' | 'cancelled' | 'rescheduled';

/** One lesson. A multi-lesson package shares a `pkg` id. */
export interface Booking {
  id: string;
  /** Learner id. */
  lid: string;
  date: IsoDate;
  start: TimeHHMM;
  /** Duration in hours (1, 1.5, 2…). */
  dur: number;
  /** Hourly rate in pounds, and which rate card it came from. */
  rate: number;
  rateKey: string;
  /** Discount in pounds for this lesson. */
  discount: number;
  status: LessonStatus;
  /** Pickup address and postcode. */
  loc: string;
  pc: string;
  pkg?: string | null;
  /** Cancellation reason. */
  reason?: string;
  /** The previous date/time of a rescheduled lesson. */
  prev?: { date: IsoDate; start: TimeHHMM };
}

export type NotificationCategory = 'lessons' | 'billing' | 'rewards' | 'learners';

export interface AppNotification {
  id: string;
  /** NotificationCategory: 'lessons' | 'billing' | 'rewards' | 'learners'. */
  cat: string;
  /** Icon name (see components/iconShapes). */
  icon: string;
  title: string;
  body: string;
  /** Display time ('now', '09:30', 'Yesterday'…). */
  time: string;
  unread?: boolean;
  /** What opening the notification does: show a lesson or a screen. */
  act?: { lesson?: string; screen?: string; learner?: string };
}

export type ReferralStatus =
  'registered' | 'trial' | 'free_month' | 'confirmed' | 'awarded' | 'not_qualified' | 'reversed';

/** An instructor who signed up with this instructor's referral code. */
export interface Referral {
  id: string;
  name: string;
  joined: IsoDate;
  /** Plan key the referred instructor chose, once they have chosen one. */
  plan: string | null;
  status: ReferralStatus;
  awardedOn?: IsoDate;
  reason?: string;
}

/** A NexDrive Credit movement: positive when earned, negative when used. */
export interface CreditTransaction {
  id: string;
  date: IsoDate;
  type: string;
  desc: string;
  /** Referral id for rewards. */
  ref?: string;
  amt: number;
}

export interface RateCard {
  key: string;
  label: string;
  /** Pounds per hour. */
  rate: number;
}

/** The signed-in instructor's profile. */
export interface Instructor {
  name: string;
  phone: string;
  email: string;
  address: string;
  postcode: string;
  /** ADI registration number (6 digits). */
  adi: string;
  /** 'adi' (fully qualified) or 'pdi' (trainee). */
  status: string;
  business: string;
  /** Postcode areas covered, e.g. ['SL1', 'SL2']. */
  areas: string[];
  /** Default lesson length in hours. */
  defaultDur: number;
  rates: RateCard[];
}

export interface BankDetails {
  holder: string;
  sort: string;
  acct: string;
  /** Include the details in booking messages to learners. */
  include: boolean;
}

export type SubscriptionStatus = 'active' | 'trial' | 'payment_failed' | 'expired' | 'cancelled';

export interface Subscription {
  /** Plan key ('1m', '12m', '24m', '36m'). */
  plan: string;
  state: SubscriptionStatus;
  trialEnd: IsoDate;
  start: IsoDate;
  /** Masked card, e.g. 'Visa •••• 4242'. */
  card: string;
  /** Joined with a valid referral code (an extra free month). */
  refBonus?: boolean;
}

export interface Preferences {
  /** Lesson reminders on/off, and how many minutes before (as a string from the form). */
  reminder: boolean;
  mins: string;
  /** Ask before sending booking messages to learners. */
  askSend: boolean;
  /** Preferred message channel. */
  channel: string;
  bookingAlerts: boolean;
  billing: boolean;
  learnerAlerts: boolean;
}

/** A screen opened on top of a tab: { name: 'learner', params: { lid: 'L1' } }. */
export interface StackEntry {
  name: string;
  params?: Record<string, string | null | undefined>;
}

/** The open bottom sheet: its type plus whatever that sheet needs (ids, flags…). */
export interface Sheet {
  type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export interface Toast {
  text: string;
  /** 'ok' | 'warn' | 'err' | 'neutral' */
  kind: string;
}

/** The booking form while it is open (a new booking or an edit). */
export interface BookingDraft {
  mode: 'new' | 'edit';
  /** The booking being edited. */
  bid?: string;
  lid: string | null;
  date: IsoDate;
  start: TimeHHMM | '';
  dur: number;
  custom: boolean;
  rateKey: string;
  /** Discount choice: 'none', '5', '10', '20' or 'custom' (then discCustom). */
  disc: string;
  discCustom: string;
  count: number;
  countCustom: boolean;
  freq: string;
  locMode: 'home' | 'test' | 'other';
  locAddr: string;
  locPc: string;
  /** Per-session day shifts to dodge clashes in a package: { sessionIndex: days }. */
  shifts: Record<number, number>;
  tried: boolean;
}
