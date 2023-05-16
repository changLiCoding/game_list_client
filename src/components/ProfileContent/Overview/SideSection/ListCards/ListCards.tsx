import React from 'react';
import styles from '@/components/ProfileContent/Overview/SideSection/ListCards/ListCards.module.scss';

function ListCards() {
  return (
    <div className={styles.listContainer}>
      <h2>Games</h2>
      <div className={styles.listCards}>cards</div>
    </div>
  );
}

export default ListCards;
