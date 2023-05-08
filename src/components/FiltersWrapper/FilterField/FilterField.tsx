import styles from '@/components/FiltersWrapper/FilterField/FilterField.module.scss';
import SelectDropdown from '@/components/SelectDropdown';
import type { OnChangeCascaderType, DropDownOption } from '@/types/global';

interface FilterFieldProps {
  fieldName: string;
  options: DropDownOption[];
  onChange: (value: OnChangeCascaderType) => void;
  changeOnSelect: boolean;
  customCascaderStyle: string;
}

export default function FilterField({
  fieldName,
  options,
  onChange,
  changeOnSelect,
  customCascaderStyle,
}: FilterFieldProps) {
  return (
    <div className={styles.layoutFilterFieldContainer}>
      <h3 className={styles.h3FilterFieldTitle}>{fieldName}</h3>
      <SelectDropdown
        fieldName={fieldName}
        options={options}
        onChange={onChange}
        changeOnSelect={changeOnSelect}
        customCascaderStyle={customCascaderStyle}
      />
    </div>
  );
}
