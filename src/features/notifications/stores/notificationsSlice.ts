import type { NotificationsActions, SliceCreator } from '@/types/store';
import { compareBookings } from '@/domain/bookings';
import {
  NOW,
  TODAY,
  addDays,
  daysBetween,
  formatDurationLong,
  formatShortDate,
  timeToMinutes,
} from '@/lib/dates';

// Lesson-reminder push banner.
// A Zustand slice: actions read the store with get() and write with get().setState(update, callback).
export const createNotificationsSlice: SliceCreator<NotificationsActions> = (_set, get) => ({
  nextLesson(any) {
    return get()
      .bookings.filter(
        (b) =>
          ['upcoming', 'rescheduled'].includes(b.status) &&
          (any ? b.date >= TODAY : b.date === TODAY) &&
          (b.date > TODAY || timeToMinutes(b.start) > NOW),
      )
      .sort(compareBookings)[0];
  },
  reminderInfo(b) {
    const L = get().learners.find((l) => l.id === b.lid);
    const mins = daysBetween(TODAY, b.date) * 1440 + timeToMinutes(b.start) - NOW;
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
        : `Your next lesson is ${b.date === addDays(TODAY, 1) ? 'tomorrow' : 'on ' + formatShortDate(b.date)}`,
      text: `${L ? L.name : 'Learner'} · ${b.date === TODAY ? '' : formatShortDate(b.date) + ', '}${b.start} · ${formatDurationLong(b.dur)} · ${b.pc}`,
    };
  },
  schedulePush(force) {
    clearTimeout(get().timers.pt);
    clearTimeout(get().timers.pt2);
    const s = get();
    if (s.phase !== 'app' || !s.reminder || !s.prefs.reminder) return;
    const b = get().nextLesson(force);
    if (!b) return;
    if (!force && timeToMinutes(b.start) - NOW > (+s.prefs.mins || 30)) return;
    get().timers._pushed = b.id;
    get().timers.pt = setTimeout(
      () => {
        get().setState({ push: true, pushInfo: get().reminderInfo(b) });
        get().timers.pt2 = setTimeout(() => get().setState({ push: false }), 6500);
      },
      force ? 700 : 1600,
    );
  },
});
