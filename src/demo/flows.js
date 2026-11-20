// Demo only: the workflow shortcuts listed in the DemoPanel ([key, title, steps]).
export const FLOWS = [
  ['onboarding', 'Onboarding', 'Welcome → Register → Verify → Instructor details → Trial & plan → Dashboard'],
  ['learner', 'Learner workflow', 'Learners → Add learner → Profile → Schedule lesson'],
  ['booking', 'Booking workflow', 'Learner → Date & time → Duration → Price → Discount → Confirm → Message'],
  ['package', 'Multiple lessons', 'James → 5 lessons → £10 off → Review sessions → Send'],
  ['calendar', 'Calendar workflow', 'Day / Week / Month → Booking → Reschedule or cancel'],
  ['nav', 'Navigation workflow', '30-min reminder → Lesson → Navigate → Google Maps'],
  ['sub', 'Subscription workflow', 'Account → Subscription → Upgrade → Confirmation'],
  ['referral', 'Referral & Rewards', 'Dashboard → Refer & earn → Code, QR & sharing → History → Credit'],
  [
    'refManual',
    'New instructor: referral code',
    'Register → Enter NEXDANIEL25 → Applied → Plan with free month',
  ],
  ['refQr', 'New instructor: QR invite', 'Scan QR → Invited → Code pre-filled → Trial + free month'],
  ['reward', 'Credit reward', 'Emma’s first payment qualifies → +£48 credit → Notification'],
  ['credit', 'Using credit', 'Subscription → 12 months → Apply £160 credit → £80 payable'],
  ['incomplete', 'Edge case: incomplete learner', 'Booking is blocked until required details are added'],
  ['conflict', 'Edge case: booking clash', 'Pick an occupied slot and the clash is caught'],
  ['empty', 'Empty states', 'A brand-new account with no data yet'],
];
