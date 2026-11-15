import BottomNav from './components/BottomNav';
import DemoPanel from './components/DemoPanel';
import OnboardingFooter from './components/OnboardingFooter';
import OnboardingHeader from './components/OnboardingHeader';
import PushNotification from './components/PushNotification';
import SheetOverlay from './components/SheetOverlay';
import Splash from './components/Splash';
import StatusBar from './components/StatusBar';
import Toast from './components/Toast';
import BankDetails, { BankDetailsFooter } from './screens/BankDetails';
import BookingForm, { BookingFormFooter } from './screens/BookingForm';
import Bookings from './screens/Bookings';
import Calendar from './screens/Calendar';
import Credit from './screens/Credit';
import Home from './screens/Home';
import LearnerForm, { LearnerFormFooter } from './screens/LearnerForm';
import LearnerProfile from './screens/LearnerProfile';
import Learners from './screens/Learners';
import LessonDetails from './screens/LessonDetails';
import More from './screens/More';
import Notifications from './screens/Notifications';
import Preferences from './screens/Preferences';
import Pricing, { PricingFooter } from './screens/Pricing';
import Profile, { ProfileFooter } from './screens/Profile';
import ReferralQr from './screens/ReferralQr';
import Referrals from './screens/Referrals';
import Security from './screens/Security';
import Subscription from './screens/Subscription';
import Upgrade, { UpgradeFooter } from './screens/Upgrade';
import UpgradeDone from './screens/UpgradeDone';
import ChoosePlan from './screens/onboarding/ChoosePlan';
import InstructorDetails from './screens/onboarding/InstructorDetails';
import Register from './screens/onboarding/Register';
import TrialStarted from './screens/onboarding/TrialStarted';
import VerifyPhone from './screens/onboarding/VerifyPhone';
import Welcome from './screens/onboarding/Welcome';

export default function AppView({ v }) {
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
    scrollRef,
    sheetOpen,
    showNav,
    splash,
    statusBar,
    toast,
  } = v;
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F7F7F9' }}>
      {panel && <DemoPanel v={v} />}
      <main
        style={{
          flex: 1,
          minWidth: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: `${fr.pad}px`,
          boxSizing: 'border-box',
          minHeight: '100vh',
        }}
      >
        <div style={{ width: `${fr.ow}px`, height: `${fr.oh}px`, position: 'relative', flex: 'none' }}>
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              width: `${fr.w}px`,
              height: `${fr.h}px`,
              transform: `scale(${fr.sc})`,
              transformOrigin: '0 0',
              background: '#0A0A0F',
              borderRadius: `${fr.rad}px`,
              padding: `${fr.bez}px`,
              boxSizing: 'border-box',
              boxShadow: fr.shadow,
            }}
          >
            <div
              style={{
                position: 'relative',
                width: `${fr.sw}px`,
                height: `${fr.sh}px`,
                borderRadius: `${fr.irad}px`,
                overflow: 'hidden',
                background: '#FFFFFF',
                display: 'flex',
                flexDirection: 'column',
                color: '#0A0A0F',
                fontSize: '15px',
              }}
            >
              {statusBar && <StatusBar v={v} />}
              {offline ? (
                <div
                  style={{
                    flex: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '10px 20px',
                    background: '#0A0A0F',
                    color: '#FFFFFF',
                    fontSize: '13px',
                    fontWeight: 500,
                  }}
                >
                  {ics.wifiOff}
                  <span>You're offline. Changes save on this phone and sync when you reconnect.</span>
                </div>
              ) : null}
              <div
                className="nx-scroll"
                ref={scrollRef}
                style={{
                  flex: 1,
                  minHeight: 0,
                  overflowY: 'auto',
                  overflowX: 'hidden',
                  position: 'relative',
                  background: scrBg,
                }}
              >
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
