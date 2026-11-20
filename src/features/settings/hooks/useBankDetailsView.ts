import { BORDER_COLOR, ERROR_COLOR } from '@/lib/inline-styles';
import { useViewContext, type View } from '@/hooks/useViewContext';

// Display values and handlers for the bank details screen.
export function useBankDetailsView() {
  const { common, store, s, ics, is, tog } = useViewContext();
  const v: View = { ...common };
  if (is.bank) {
    const f = s.bankForm || { holder: '', sort: '', acct: '', include: true };
    const sc = f.sort.replace(/\D/g, ''),
      ac = f.acct.replace(/\D/g, '');
    const e = s.bankTried
      ? {
          ...(!f.holder.trim() ? { holder: 'Enter the name on the account' } : {}),
          ...(sc.length !== 6 ? { sort: 'Sort codes are 6 digits, like 20-45-77' } : {}),
          ...(ac.length !== 8 ? { acct: 'Account numbers are 8 digits' } : {}),
        }
      : {};
    const editing = !s.bank || !!s.bankEdit;
    v.bk2 = {
      editing,
      saved: !editing,
      f,
      e,
      b: {
        holder: e.holder ? ERROR_COLOR : BORDER_COLOR,
        sort: e.sort ? ERROR_COLOR : BORDER_COLOR,
        acct: e.acct ? ERROR_COLOR : BORDER_COLOR,
      },
      missing: !s.bank,
      h: {
        holder: store.setIn('bankForm', 'holder'),
        sort: (x) => {
          const d = x.target.value.replace(/\D/g, '').slice(0, 6);
          store.setState({ bankForm: { ...f, sort: d.replace(/(\d{2})(?=\d)/g, '$1-') } });
        },
        acct: (x) =>
          store.setState({ bankForm: { ...f, acct: x.target.value.replace(/\D/g, '').slice(0, 8) } }),
      },
      holder: s.bank ? s.bank.holder : '',
      sortM: s.bank ? (s.bankReveal ? s.bank.sort : `••-••-${s.bank.sort.slice(-2)}`) : '',
      acctM: s.bank ? (s.bankReveal ? s.bank.acct : `••••${s.bank.acct.slice(-4)}`) : '',
      reveal: () => store.setState({ bankReveal: !s.bankReveal }),
      revealLabel: s.bankReveal ? 'Hide' : 'Show',
      revealIcon: s.bankReveal ? ics.eyeOff : ics.eye,
      inc: tog(s.bank && !s.bankEdit ? s.bank.include : f.include, () => {
        if (s.bank && !s.bankEdit) store.setState({ bank: { ...s.bank, include: !s.bank.include } });
        else store.setState({ bankForm: { ...f, include: !f.include } });
      }),
      edit: () => store.setState({ bankEdit: true, bankForm: { ...s.bank }, bankTried: false }),
      cancelEdit: () => store.setState({ bankEdit: false }),
      canCancelEdit: !!s.bank,
      remove: () => {
        store.setState({
          bank: null,
          bankEdit: false,
          bankForm: { holder: s.inst.name, sort: '', acct: '', include: true },
        });
        store.showToast('Bank details removed', 'neutral');
      },
      save: () => {
        if (!f.holder.trim() || sc.length !== 6 || ac.length !== 8)
          return store.setState({ bankTried: true });
        store.setState({
          bank: {
            holder: f.holder.trim(),
            sort: sc.replace(/(\d{2})(?=\d)/g, '$1-'),
            acct: ac,
            include: f.include,
          },
          bankEdit: false,
          bankReveal: false,
        });
        store.showToast('Bank details saved securely');
      },
    };
  }
  return v;
}
