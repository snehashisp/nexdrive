import { choiceColors } from '@/lib/inline-styles';
import { useViewContext } from '@/hooks/useViewContext';

// Display values and handlers for the notifications list.
export function useNotificationsView() {
  const { common, store, s, ic, is, unread } = useViewContext();
  const v = { ...common };
  if (is.notifications) {
    const CT = {
      lessons: ['#DBEAFE', '#1D4ED8'],
      learners: ['#FEF3C7', '#92400E'],
      billing: ['#EDE9FE', '#6D28D9'],
      rewards: ['#DCFCE7', '#166534'],
    };
    const list = s.notifs.filter((n) => s.notifCat === 'all' || n.cat === s.notifCat);
    v.nt = {
      cats: [
        ['all', 'All'],
        ['lessons', 'Lessons'],
        ['learners', 'Learners'],
        ['billing', 'Billing'],
        ['rewards', 'Rewards'],
      ].map((x) => ({
        t: x[1],
        ...choiceColors(s.notifCat === x[0]),
        pick: () => store.setState({ notifCat: x[0] }),
      })),
      list: list.map((n) => ({
        title: n.title,
        body: n.body,
        time: n.time,
        dot: n.unread ? '#7C3AED' : 'transparent',
        bg: n.unread ? '#FAF8FF' : '#FFFFFF',
        icon: ic[n.icon] || ic.bell,
        tb: CT[n.cat][0],
        tf: CT[n.cat][1],
        cat: n.cat[0].toUpperCase() + n.cat.slice(1),
        open: () => {
          store.setState({ notifs: s.notifs.map((x) => (x.id === n.id ? { ...x, unread: false } : x)) });
          const a = n.act || {};
          if (a.lesson && store.booking(a.lesson)) store.pushScreen('lesson', { bid: a.lesson });
          else if (a.learner && store.learner(a.learner)) store.pushScreen('learner', { lid: a.learner });
          else if (a.screen) store.pushScreen(a.screen);
        },
      })),
      has: list.length > 0,
      empty: !list.length,
      hasUnread: unread > 0,
      markAll: () => store.setState({ notifs: s.notifs.map((x) => ({ ...x, unread: false })) }),
    };
  }
  return v;
}
