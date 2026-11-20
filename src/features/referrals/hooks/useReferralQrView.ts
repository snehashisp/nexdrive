import { referralLink } from '@/domain/referrals';
import { useViewContext, type View } from '@/hooks/useViewContext';

// Display values and handlers for the referral QR code screen.
export function useReferralQrView() {
  const { common, store, s, is } = useViewContext();
  const v: View = { ...common };
  const link = referralLink(s.refCode, store.cfg().referralBaseUrl);
  const msgTxt = `I'm using NexDrive to manage my driving lessons, learners and bookings. If you're a driving instructor, you can try NexDrive free and get an additional month free after your 14-day trial when you sign up using my referral code.\n\nReferral code: ${s.refCode}\n\n${link}`;
  const share = {
    code: s.refCode,
    link,
    msg: msgTxt,
    copyCode: () => store.copy(s.refCode, 'Referral code copied'),
    copyLink: () => store.copy(link, 'Referral link copied'),
    whatsapp: () => {
      store.openExt('https://wa.me/?text=' + encodeURIComponent(msgTxt));
      store.showToast('Opening WhatsApp…', 'neutral');
    },
    email: () => {
      store.openExt(
        'mailto:?subject=' +
          encodeURIComponent('Try NexDrive — 1 month free with my referral') +
          '&body=' +
          encodeURIComponent(msgTxt),
      );
      store.showToast('Opening your email app…', 'neutral');
    },
  };
  if (is.referralQr)
    v.rq = {
      ...share, // includes `link`, which the screen turns into a <QrCode>
      save: () => store.saveQr(link),
      shareQr: () => store.shareQr(link, msgTxt),
      demo: store.cfg().showDemoPanel !== false,
      preview: () => store.startRefOnboarding(s.refCode, 'qr', { flow: 'refQr' }),
    };
  return v;
}
