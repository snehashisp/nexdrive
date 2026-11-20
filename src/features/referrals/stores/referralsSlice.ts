import type { ReferralsActions, SliceCreator } from '@/types/store';
import qrcode from 'qrcode-generator';
import { referralReward } from '@/domain/referrals';
import { PLANS } from '@/domain/plans';
import { TODAY } from '@/lib/dates';
import { formatGBP } from '@/lib/format';

// Referral programme: rewards, sharing, QR code image.
// A Zustand slice: actions read the store with get() and write with get().setState(update, callback).
export const createReferralsSlice: SliceCreator<ReferralsActions> = (_set, get) => ({
  qualify(rid) {
    const s = get();
    const r = s.refs.find((x) => x.id === rid);
    if (!r || r.status === 'awarded' || !r.plan) return;
    const amt = referralReward(PLANS.find((p) => p.key === r.plan));
    const first = r.name.split(' ')[0];
    const now = Date.now();
    get().setState({
      refs: s.refs.map((x) => (x.id === rid ? { ...x, status: 'awarded', awardedOn: TODAY } : x)),
      credit: [
        ...s.credit,
        { id: 'T' + now, date: TODAY, type: 'referral', desc: `Referral reward — ${r.name}`, ref: rid, amt },
      ],
      notifs: [
        {
          id: 'n' + now,
          cat: 'rewards',
          icon: 'gift',
          title: `${formatGBP(amt)} added to your NexDrive Credit`,
          body: `Great news! ${first} has joined NexDrive using your referral code. ${formatGBP(amt)} has been added to your NexDrive Credit.`,
          time: 'now',
          unread: true,
          act: { screen: 'credit' },
        },
        ...s.notifs.filter((n) => n.id !== 'n2'),
      ],
      tab: 'home',
      stack: [{ name: 'referrals' }],
      sheet: null,
    });
    get().showToast(`${first}’s referral qualified · ${formatGBP(amt)} credit added`);
  },
  nativeShare(text, url) {
    if (navigator.share) navigator.share({ title: 'Join me on NexDrive', text, url }).catch(() => {});
    else get().copy(url, 'Referral link copied');
  },
  qrPng(link) {
    return new Promise((res) => {
      const q = qrcode(0, 'M');
      q.addData(link);
      q.make();
      const n = q.getModuleCount();
      const W = 720,
        H = 900,
        cs = Math.floor(560 / (n + 8)),
        qs = cs * (n + 8),
        ox = Math.round((W - qs) / 2),
        oy = 130;
      const c = document.createElement('canvas');
      c.width = W;
      c.height = H;
      const x = c.getContext('2d');
      x.fillStyle = '#FFFFFF';
      x.fillRect(0, 0, W, H);
      const ff = '"Hanken Grotesk","Helvetica Neue",Arial,sans-serif';
      x.fillStyle = '#0A0A0F';
      x.font = '500 40px ' + ff;
      x.fillText('NEX', 60, 82);
      const w = x.measureText('NEX').width;
      x.fillStyle = '#7C3AED';
      x.fillText('Drive', 60 + w + 6, 82);
      x.fillStyle = '#0A0A0F';
      x.fillRect(60, 108, W - 120, 2);
      for (let r = 0; r < n; r++)
        for (let cc = 0; cc < n; cc++)
          if (q.isDark(r, cc)) x.fillRect(ox + (cc + 4) * cs, oy + (r + 4) * cs, cs, cs);
      const y = oy + qs + 40;
      x.fillStyle = '#6B6B7B';
      x.font = '600 20px ' + ff;
      x.fillText('REFERRAL CODE', 60, y);
      x.fillStyle = '#0A0A0F';
      x.font = '700 48px ' + ff;
      x.fillText(get().refCode, 60, y + 56);
      x.fillStyle = '#4A4A5A';
      x.font = '400 22px ' + ff;
      x.fillText('Scan to join NexDrive · 14-day trial + 1 month free', 60, y + 100);
      c.toBlob((b) => res(b), 'image/png');
    });
  },
  async saveQr(link) {
    const b = await get().qrPng(link);
    if (!b) return get().showToast('QR code is still loading — try again', 'warn');
    const u = URL.createObjectURL(b);
    const a = document.createElement('a');
    a.href = u;
    a.download = `nexdrive-referral-${get().refCode}.png`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(u), 2000);
    get().showToast('QR code saved');
  },
  async shareQr(link, text) {
    const b = await get().qrPng(link);
    try {
      if (b && navigator.canShare) {
        const f = new File([b], `nexdrive-referral-${get().refCode}.png`, { type: 'image/png' });
        if (navigator.canShare({ files: [f] })) {
          await navigator.share({ files: [f], title: 'Join me on NexDrive', text });
          return;
        }
      }
      if (navigator.share) {
        await navigator.share({ title: 'Join me on NexDrive', text, url: link });
        return;
      }
    } catch (e) {
      if (e && (e as Error).name === 'AbortError') return;
    }
    get().saveQr(link);
  },
});
