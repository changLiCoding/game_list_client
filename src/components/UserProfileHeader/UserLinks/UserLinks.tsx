import { ScrollMenu } from 'react-horizontal-scrolling-menu';
import { useState } from 'react';

import { ScrollVisibilityApiType } from '@/components/UserProfileHeader/types';
import useDrag from '@/hooks/useDrag';
import styles from '@/components/UserProfileHeader/UserLinks/UserLinks.module.scss';
import UserLink from '@/components/UserProfileHeader/UserLinks/UserLink/UserLink';

function UserLinks() {
  const linksArray = [
    'Overview',
    'Game List',
    'Favorites',
    'Social',
    'Reviews',
  ];

  const { dragStart, dragStop, dragMove, dragging } = useDrag();
  const handleDrag =
    ({ scrollContainer }: ScrollVisibilityApiType) =>
    (ev: React.MouseEvent) =>
      dragMove(ev, (posDiff) => {
        if (scrollContainer.current) {
          scrollContainer.current.scrollLeft += posDiff;
        }
      });

  const [selected, setSelected] = useState<string>('');

  const handleItemClick = (itemId: string) => (): void | boolean => {
    if (dragging) {
      return false;
    }
    setSelected(selected !== itemId ? itemId : '');
  };

  const onWheel = (
    apiObj: ScrollVisibilityApiType,
    ev: React.WheelEvent
  ): void => {
    const isThouchpad = Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15;

    if (isThouchpad) {
      ev.stopPropagation();
      return;
    }

    if (ev.deltaY < 0) {
      apiObj.scrollNext();
    } else if (ev.deltaY > 0) {
      apiObj.scrollPrev();
    }
  };

  return (
    <div className={styles.navWrap} onMouseLeave={dragStop}>
      <ScrollMenu
        scrollContainerClassName={styles.navContainer}
        onWheel={onWheel}
        onMouseDown={() => dragStart}
        onMouseUp={() => dragStop}
        onMouseMove={handleDrag}
      >
        {linksArray.map((link) => (
          <UserLink
            key={link}
            linkName={link.toLowerCase()}
            onClick={handleItemClick(link)}
            selected={link === selected}
          >
            {link}
          </UserLink>
        ))}
      </ScrollMenu>
    </div>
  );
}

export default UserLinks;
