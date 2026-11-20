import styles from './AppView.module.css';
import BottomNav from '@/app/components/BottomNav';
import DemoPanel from '@/demo/DemoPanel';
import OnboardingFooter from '@/features/onboarding/components/OnboardingFooter';
import OnboardingHeader from '@/features/onboarding/components/OnboardingHeader';
import PushNotification from '@/features/notifications/components/PushNotification';
import SheetOverlay from '@/app/components/SheetOverlay';
import Splash from '@/app/components/Splash';
import StatusBar from '@/app/components/StatusBar';
import Toast from '@/components/Toast';
import BankDetails, { BankDetailsFooter } from '@/features/settings/components/BankDetails';
import BookingForm, { BookingFormFooter } from '@/features/bookings/components/BookingForm';
import Bookings from '@/features/bookings/components/Bookings';
import Calendar from '@/features/calendar/components/Calendar';
import Credit from '@/features/referrals/components/Credit';
import Home from '@/features/dashboard/components/Home';
import LearnerForm, { LearnerFormFooter } from '@/features/learners/components/LearnerForm';
import LearnerProfile from '@/features/learners/components/LearnerProfile';
import Learners from '@/features/learners/components/Learners';
import LessonDetails from '@/features/bookings/components/LessonDetails';
import More from '@/features/settings/components/More';
import Notifications from '@/features/notifications/components/Notifications';
import Preferences from '@/features/settings/components/Preferences';
import Pricing, { PricingFooter } from '@/features/settings/components/Pricing';
import Profile, { ProfileFooter } from '@/features/settings/components/Profile';
import ReferralQr from '@/features/referrals/components/ReferralQr';
import Referrals from '@/features/referrals/components/Referrals';
import Security from '@/features/settings/components/Security';
import Subscription from '@/features/subscription/components/Subscription';
import Upgrade, { UpgradeFooter } from '@/features/subscription/components/Upgrade';
import UpgradeDone from '@/features/subscription/components/UpgradeDone';
import ChoosePlan from '@/features/onboarding/components/ChoosePlan';
import InstructorDetails from '@/features/onboarding/components/InstructorDetails';
import Register from '@/features/onboarding/components/Register';
import TrialStarted from '@/features/onboarding/components/TrialStarted';
import VerifyPhone from '@/features/onboarding/components/VerifyPhone';
import Welcome from '@/features/onboarding/components/Welcome';

// scrollRef is attached to the scrolling screen area so App can reset it when the screen changes.
export default function AppView({ v, scrollRef }) {
  const {
    fr,
    ics,
    is,
    obFooter,
    obHeader,
    offline,
    panel,
    push,
    scrBg,
    sheetOpen,
    showNav,
    splash,
    statusBar,
    toast,
  } = v;
  return (
    <div className={styles.row}>
      {panel && <DemoPanel v={v} />}
      <main className={styles.main} style={{ padding: `${fr.pad}px` }}>
        <div className={styles.box} style={{ width: `${fr.ow}px`, height: `${fr.oh}px` }}>
          <div
            className={styles.overlay}
            style={{
              width: `${fr.w}px`,
              height: `${fr.h}px`,
              transform: `scale(${fr.sc})`,
              transformOrigin: '0 0',
              borderRadius: `${fr.rad}px`,
              padding: `${fr.bez}px`,
              boxShadow: fr.shadow,
            }}
          >
            <div
              className={styles.stack}
              style={{ width: `${fr.sw}px`, height: `${fr.sh}px`, borderRadius: `${fr.irad}px` }}
            >
              {statusBar && <StatusBar v={v} />}
              {offline ? (
                <div className={styles.wifioffRow}>
                  {ics.wifiOff}
                  <span>You're offline. Changes save on this phone and sync when you reconnect.</span>
                </div>
              ) : null}
              <div className={`${styles.box2} nx-scroll`} ref={scrollRef} style={{ background: scrBg }}>
                {is.ob_welcome && <Welcome v={v} />}
                {obHeader && <OnboardingHeader v={v} />}
                {is.ob_register && <Register v={v} />}
                {is.ob_verify && <VerifyPhone v={v} />}
                {is.ob_details && <InstructorDetails v={v} />}
                {is.ob_plan && <ChoosePlan v={v} />}
                {is.ob_started && <TrialStarted v={v} />}
                {is.home && <Home v={v} />}
                {is.calendar && <Calendar v={v} />}
                {is.learners && <Learners v={v} />}
                {is.learner && <LearnerProfile v={v} />}
                {is.learnerForm && <LearnerForm v={v} />}
                {is.booking && <BookingForm v={v} />}
                {is.lesson && <LessonDetails v={v} />}
                {is.bookings && <Bookings v={v} />}
                {is.notifications && <Notifications v={v} />}
                {is.more && <More v={v} />}
                {is.subscription && <Subscription v={v} />}
                {is.upgrade && <Upgrade v={v} />}
                {is.upgradeDone && <UpgradeDone v={v} />}
                {is.profile && <Profile v={v} />}
                {is.pricing && <Pricing v={v} />}
                {is.bank && <BankDetails v={v} />}
                {is.prefs && <Preferences v={v} />}
                {is.security && <Security v={v} />}
                {is.referrals && <Referrals v={v} />}
                {is.referralQr && <ReferralQr v={v} />}
                {is.credit && <Credit v={v} />}
              </div>
              {obFooter ? <OnboardingFooter v={v} /> : null}
              {is.learnerForm && <LearnerFormFooter v={v} />}
              {is.booking && <BookingFormFooter v={v} />}
              {is.upgrade && <UpgradeFooter v={v} />}
              {is.profile && <ProfileFooter v={v} />}
              {is.pricing && <PricingFooter v={v} />}
              {is.bank && <BankDetailsFooter v={v} />}
              {showNav && <BottomNav v={v} />}
              {push && <PushNotification v={v} />}
              {toast ? <Toast v={v} /> : null}
              {sheetOpen && <SheetOverlay v={v} />}
              {splash && <Splash key={splash.run} {...splash} />}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
