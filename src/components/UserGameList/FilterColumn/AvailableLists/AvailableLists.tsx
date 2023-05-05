import React, { useState } from 'react';
import { List } from 'antd';
import styles from './AvailableListsStyle.module.scss';

function AvailableLists() {
  const [selectedItem, setSelectedItem] = useState<string>('All');

  const data = ['All', 'Planning', 'Playing'];

  const handleItemClick = (item: string) => {
    setSelectedItem(item);
  };
  return (
    <List
      dataSource={data}
      className={styles.listStyle}
      renderItem={(item) => (
        <List.Item
          className={styles.listItem}
          onClick={() => handleItemClick(item)}
          style={selectedItem === item ? { backgroundColor: '#f7f5f5' } : {}}
        >
          {item}
        </List.Item>
      )}
    />
  );
}

export default AvailableLists;
