import { useShellView } from '../hooks/useShellView';
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

export default function SheetOverlay() {
  const v = useShellView();
  const { closeSheet, padB, sh, stop } = v;
  return (
    <div onClick={closeSheet} className={styles.overlay}>
      <div className={`${styles.box} nx-scroll`} onClick={stop} style={{ paddingBottom: `${padB}px` }}>
        {sh.quickAdd && <QuickAddSheet />}
        {sh.learnerActions && <LearnerActionsSheet />}
        {sh.deleteLearner && <DeleteLearnerSheet />}
        {sh.pickLearner && <PickLearnerSheet />}
        {sh.pickBooking && <PickBookingSheet />}
        {sh.conflict && <ConflictSheet />}
        {sh.confirm && <ConfirmBookingSheet />}
        {sh.message && <MessageSheet />}
        {sh.cancelLesson && <CancelLessonSheet />}
        {sh.maps && <MapsSheet />}
        {sh.cancelSub && <CancelSubscriptionSheet />}
        {sh.logout && <LogoutSheet />}
        {sh.expired && <ExpiredSheet />}
        {sh.referralDetail && <ReferralDetailSheet />}
      </div>
    </div>
  );
}
