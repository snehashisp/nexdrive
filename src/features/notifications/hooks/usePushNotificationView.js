import { useViewContext } from '@/hooks/useViewContext';

// Display values and handlers for the "your next lesson starts in…" banner.
export function usePushNotificationView() {
  const { store, s, statusBar, sbH } = useViewContext();
  return {
    pushTop: statusBar ? sbH + 4 : 8,
    pushText: s.pushInfo ? s.pushInfo.text : '',
    pushTitle: s.pushInfo ? s.pushInfo.title : '',
    openPush: () => {
      const id = s.pushInfo && s.pushInfo.bid;
      store.setState({ push: false });
      if (id) store.pushScreen('lesson', { bid: id });
    },
  };
}
