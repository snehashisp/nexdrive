import styles from './Icon.module.css';
import { ICON_SHAPES } from './iconShapes';

// One icon. It draws in the current text colour, so it matches the button or label it sits in.
export function Icon({ name, size = 20 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={styles.svg}
    >
      {ICON_SHAPES[name]}
    </svg>
  );
}
