import React from 'react';
import SelectDropdown from '@/components/SelectDropdown';
import styles from './FilterListStyle.module.scss';
import type { DropDownOption } from '@/types/global';

const filterOptions: DropDownOption[] = [
  {
    value: 'Option1',
    label: 'Option1',
  },
  {
    value: 'Option2',
    label: 'Option2',
  },
];

const filters = [
  {
    name: 'Platform',
    options: [
      {
        value: 'Option1',
        label: 'Option1',
      },
      {
        value: 'Option2',
        label: 'Option2',
      },
    ],
  },
  {
    name: 'Status',
    options: [
      {
        value: 'Status1',
        label: 'Status1',
      },
      {
        value: 'Status2',
        label: 'Status2',
      },
    ],
  },
  {
    name: 'Genres',
    options: [
      {
        value: 'Genres1',
        label: 'Genres1',
      },
      {
        value: 'Genres2',
        label: 'Genres2',
      },
    ],
  },

  {
    name: 'Country',
    options: [
      {
        value: 'Country1',
        label: 'Country1',
      },
      {
        value: 'Country2',
        label: 'Country2',
      },
    ],
  },
];

function FilterList() {
  const onChange = (value: string[]): void => {
    // console.log(value);
  };
  return (
    <div className={styles.dropdownList}>
      {filters.map((filter) => (
        <SelectDropdown
          key={filter.name}
          customCascaderStyle={styles.cascaderStyle}
          fieldName={filter.name}
          options={filter.options}
          onChange={onChange}
          changeOnSelect
        />
      ))}
    </div>
  );
}

export default FilterList;
