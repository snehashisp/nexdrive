import { Icon } from './Icon';
import { ICON_SHAPES } from './iconShapes';

// Every icon at one size, as ready-made elements: iconSet(20).home is <Icon name="home" size={20} />.
// The view model hands these to the screens as `ic` (20px), `ics` (16px) and `icl` (24px).
const sets = {};
export function iconSet(size) {
  if (!sets[size]) {
    sets[size] = {};
    for (const name of Object.keys(ICON_SHAPES)) sets[size][name] = <Icon name={name} size={size} />;
  }
  return sets[size];
}
