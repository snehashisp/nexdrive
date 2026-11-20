import { initials } from '@/lib/format';
import { BORDER_COLOR, ERROR_COLOR } from '@/lib/inline-styles';
import { isValidEmail, isValidUkMobile } from '@/lib/validation';
import { useViewContext, type View } from '@/hooks/useViewContext';

// Display values and handlers for the instructor profile form.
export function useProfileView() {
  const { common, store, s, is } = useViewContext();
  const v: View = { ...common };
  if (is.profile && s.profForm) {
    const f = s.profForm;
    const e = s.profTried
      ? {
          ...(!f.name.trim() ? { name: 'Enter your full name' } : {}),
          ...(!isValidUkMobile(f.phone) ? { phone: 'Enter a UK mobile number, like 07700 900123' } : {}),
          ...(!isValidEmail(f.email) ? { email: 'Enter a valid email address' } : {}),
        }
      : {};
    const h = (k) => store.setIn('profForm', k);
    v.pf = {
      f,
      e,
      b: {
        name: e.name ? ERROR_COLOR : BORDER_COLOR,
        phone: e.phone ? ERROR_COLOR : BORDER_COLOR,
        email: e.email ? ERROR_COLOR : BORDER_COLOR,
      },
      h: {
        name: h('name'),
        phone: h('phone'),
        email: h('email'),
        address: h('address'),
        postcode: h('postcode'),
        business: h('business'),
        areas: h('areas'),
      },
      initials: initials(f.name),
      status: f.status === 'adi' ? 'Approved Driving Instructor' : 'Trainee instructor (PDI)',
      badge: f.status === 'adi' ? '#16A34A' : '#EC4899',
      photo: () => store.showToast('Choose a photo from your library', 'neutral'),
      save: () => {
        if (!f.name.trim() || !isValidUkMobile(f.phone) || !isValidEmail(f.email))
          return store.setState({ profTried: true });
        store.setState({
          inst: {
            ...s.inst,
            ...f,
            areas: f.areas
              .split(',')
              .map((x) => x.trim().toUpperCase())
              .filter(Boolean),
          },
        });
        store.back();
        store.showToast('Profile updated');
      },
    };
  }
  return v;
}
