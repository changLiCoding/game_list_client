import React from 'react';
import SelectDropdown from '@/components/SelectDropdown';

interface Option {
  value: string;
  label: string;
  children?: Option[];
}

const genresOptions: Option[] = [
  {
    value: 'Option1',
    label: 'Option1',
  },
  {
    value: 'Option2',
    label: 'Option2',
  },
];

function FilterList() {
  const onChange = (value: string[]): void => {
    // console.log(value);
  };
  return (
    <SelectDropdown
      fieldName="Genres"
      options={genresOptions}
      onChange={onChange}
      changeOnSelect
    />
  );
}

export default FilterList;
