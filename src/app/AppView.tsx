import { useShellView } from './hooks/useShellView';
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
export default function AppView({ scrollRef }) {
  const v = useShellView();
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
      {panel && <DemoPanel />}
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
              {statusBar && <StatusBar />}
              {offline ? (
                <div className={styles.wifioffRow}>
                  {ics.wifiOff}
                  <span>You're offline. Changes save on this phone and sync when you reconnect.</span>
                </div>
              ) : null}
              <div className={`${styles.box2} nx-scroll`} ref={scrollRef} style={{ background: scrBg }}>
                {is.ob_welcome && <Welcome />}
                {obHeader && <OnboardingHeader />}
                {is.ob_register && <Register />}
                {is.ob_verify && <VerifyPhone />}
                {is.ob_details && <InstructorDetails />}
                {is.ob_plan && <ChoosePlan />}
                {is.ob_started && <TrialStarted />}
                {is.home && <Home />}
                {is.calendar && <Calendar />}
                {is.learners && <Learners />}
                {is.learner && <LearnerProfile />}
                {is.learnerForm && <LearnerForm />}
                {is.booking && <BookingForm />}
                {is.lesson && <LessonDetails />}
                {is.bookings && <Bookings />}
                {is.notifications && <Notifications />}
                {is.more && <More />}
                {is.subscription && <Subscription />}
                {is.upgrade && <Upgrade />}
                {is.upgradeDone && <UpgradeDone />}
                {is.profile && <Profile />}
                {is.pricing && <Pricing />}
                {is.bank && <BankDetails />}
                {is.prefs && <Preferences />}
                {is.security && <Security />}
                {is.referrals && <Referrals />}
                {is.referralQr && <ReferralQr />}
                {is.credit && <Credit />}
              </div>
              {obFooter ? <OnboardingFooter /> : null}
              {is.learnerForm && <LearnerFormFooter />}
              {is.booking && <BookingFormFooter />}
              {is.upgrade && <UpgradeFooter />}
              {is.profile && <ProfileFooter />}
              {is.pricing && <PricingFooter />}
              {is.bank && <BankDetailsFooter />}
              {showNav && <BottomNav />}
              {push && <PushNotification />}
              {toast ? <Toast toast={toast} bottom={v.toastB} /> : null}
              {sheetOpen && <SheetOverlay />}
              {splash && <Splash key={splash.run} {...splash} />}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
