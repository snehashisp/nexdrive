import styles from './SheetOverlay.module.css';
import CancelLessonSheet from '@/features/bookings/components/CancelLessonSheet';
import CancelSubscriptionSheet from '@/features/subscription/components/CancelSubscriptionSheet';
import ConfirmBookingSheet from '@/features/bookings/components/ConfirmBookingSheet';
import ConflictSheet from '@/features/bookings/components/ConflictSheet';
import DeleteLearnerSheet from '@/features/learners/components/DeleteLearnerSheet';
import ExpiredSheet from '@/features/subscription/components/ExpiredSheet';
import LearnerActionsSheet from '@/features/learners/components/LearnerActionsSheet';
import LogoutSheet from '@/features/settings/components/LogoutSheet';
import MapsSheet from '@/features/bookings/components/MapsSheet';
import MessageSheet from '@/features/bookings/components/MessageSheet';
import PickBookingSheet from '@/features/bookings/components/PickBookingSheet';
import PickLearnerSheet from '@/features/learners/components/PickLearnerSheet';
import QuickAddSheet from '@/features/bookings/components/QuickAddSheet';
import ReferralDetailSheet from '@/features/referrals/components/ReferralDetailSheet';

export default function SheetOverlay({ v }) {
  const { closeSheet, padB, sh, stop } = v;
  return (
    <div onClick={closeSheet} className={styles.overlay}>
      <div className={`${styles.box} nx-scroll`} onClick={stop} style={{ paddingBottom: `${padB}px` }}>
        {sh.quickAdd && <QuickAddSheet v={v} />}
        {sh.learnerActions && <LearnerActionsSheet v={v} />}
        {sh.deleteLearner && <DeleteLearnerSheet v={v} />}
        {sh.pickLearner && <PickLearnerSheet v={v} />}
        {sh.pickBooking && <PickBookingSheet v={v} />}
        {sh.conflict && <ConflictSheet v={v} />}
        {sh.confirm && <ConfirmBookingSheet v={v} />}
        {sh.message && <MessageSheet v={v} />}
        {sh.cancelLesson && <CancelLessonSheet v={v} />}
        {sh.maps && <MapsSheet v={v} />}
        {sh.cancelSub && <CancelSubscriptionSheet v={v} />}
        {sh.logout && <LogoutSheet v={v} />}
        {sh.expired && <ExpiredSheet v={v} />}
        {sh.referralDetail && <ReferralDetailSheet v={v} />}
      </div>
    </div>
  );
}
