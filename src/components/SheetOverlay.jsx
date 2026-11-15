import CancelLessonSheet from '../sheets/CancelLessonSheet';
import CancelSubscriptionSheet from '../sheets/CancelSubscriptionSheet';
import ConfirmBookingSheet from '../sheets/ConfirmBookingSheet';
import ConflictSheet from '../sheets/ConflictSheet';
import DeleteLearnerSheet from '../sheets/DeleteLearnerSheet';
import ExpiredSheet from '../sheets/ExpiredSheet';
import LearnerActionsSheet from '../sheets/LearnerActionsSheet';
import LogoutSheet from '../sheets/LogoutSheet';
import MapsSheet from '../sheets/MapsSheet';
import MessageSheet from '../sheets/MessageSheet';
import PickBookingSheet from '../sheets/PickBookingSheet';
import PickLearnerSheet from '../sheets/PickLearnerSheet';
import QuickAddSheet from '../sheets/QuickAddSheet';
import ReferralDetailSheet from '../sheets/ReferralDetailSheet';

export default function SheetOverlay({ v }) {
  const { closeSheet, padB, sh, stop } = v;
  return (
    <div
      onClick={closeSheet}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 40,
        background: 'rgba(10,10,15,0.5)',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        animation: 'nxFade .18s ease-out',
      }}
    >
      <div
        className="nx-scroll"
        onClick={stop}
        style={{
          width: '100%',
          maxWidth: '560px',
          maxHeight: '92%',
          overflowY: 'auto',
          background: '#FFFFFF',
          borderTop: '2px solid #0A0A0F',
          paddingBottom: `${padB}px`,
          animation: 'nxUp .26s cubic-bezier(.2,.8,.2,1)',
          boxSizing: 'border-box',
        }}
      >
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
