import { REFERRAL, referralLink } from '@/domain/referrals';
import { referralRowView } from '@/hooks/viewHelpers';
import { formatGBP } from '@/lib/format';
import { useViewContext } from '@/hooks/useViewContext';

// Display values and handlers for the Refer & earn screen.
export function useReferralsView() {
  const { common, store, s, is, RC } = useViewContext();
  const v = { ...common };
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
  if (is.referrals) {
    const rl = s.refs.slice().sort((a, b) => b.joined.localeCompare(a.joined));
    v.rf = {
      ...share,
      bal: formatGBP(RC.bal),
      stats: [
        { k: 'Successful', v: RC.ok },
        { k: 'Pending', v: RC.pend },
        { k: 'Total referrals', v: s.refs.length },
        { k: 'Total earned', v: formatGBP(RC.earned) },
        { k: 'Credit used', v: formatGBP(RC.used) },
        { k: 'Reward rate', v: REFERRAL.pct + '%' },
      ],
      list: rl.map((r) => referralRowView(store, r)),
      has: rl.length > 0,
      empty: !rl.length,
      histCount: `${rl.length} instructor${rl.length === 1 ? '' : 's'}`,
    };
  }
  return v;
}
