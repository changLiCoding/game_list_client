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

  return (
    <div className={styles.navWrap}>
      <div className={styles.navContainer}>
        {linksArray.map((link) => (
          <UserLink key={link} linkName={link.toLowerCase()}>
            {link}
          </UserLink>
        ))}
      </div>
    </div>
  );
}

export default UserLinks;
