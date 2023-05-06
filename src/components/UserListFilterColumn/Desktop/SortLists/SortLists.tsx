import SelectDropdown from '@/components/SelectDropdown';
import styles from './SortListsStyle.module.scss';
import type { DropDownOption, OnChangeType } from '@/types/global';

const options: DropDownOption[] = [
  {
    value: 'Sort1',
    label: 'Sort1',
  },
  {
    value: 'Sort2',
    label: 'Sort2',
  },
];

function SortLists() {
  const onChange = (value: OnChangeType): void => {
    // console.log(value);
  };
  return (
    <SelectDropdown
      customCascaderStyle={styles.cascaderStyle}
      fieldName="Sort"
      options={options}
      onChange={onChange}
      changeOnSelect
    />
  );
}

export default SortLists;
