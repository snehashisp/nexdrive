// Lesson statuses: which count as still to come, and the colours each status is drawn in.
export const FUTURE_STATUSES = ['upcoming', 'rescheduled', 'ongoing'];
export const TEST_CENTRE = { loc: 'Slough (Langley) Driving Test Centre', pc: 'SL3 8DS' };
export const STATUS_STYLES = {
  ongoing: {
    label: 'Ongoing',
    bg: '#7C3AED',
    fg: '#FFFFFF',
    bar: '#7C3AED',
    tint: '#EDE9FE',
    ink: '#5B21B6',
  },
  upcoming: {
    label: 'Upcoming',
    bg: '#DBEAFE',
    fg: '#1D4ED8',
    bar: '#2563EB',
    tint: '#EFF6FF',
    ink: '#1E3A8A',
  },
  completed: {
    label: 'Completed',
    bg: '#DCFCE7',
    fg: '#166534',
    bar: '#16A34A',
    tint: '#F0FDF4',
    ink: '#14532D',
  },
  cancelled: {
    label: 'Cancelled',
    bg: '#FEE2E2',
    fg: '#991B1B',
    bar: '#DC2626',
    tint: '#FEF2F2',
    ink: '#7F1D1D',
  },
  rescheduled: {
    label: 'Rescheduled',
    bg: '#FEF3C7',
    fg: '#92400E',
    bar: '#D97706',
    tint: '#FFFBEB',
    ink: '#78350F',
  },
};
