import type { Dayjs } from 'dayjs';

import styles from '@/components/FiltersWrapper/FilterField/FilterField.module.scss';
import SelectDropdown from '@/components/SelectDropdown';
import DatePickerField from '@/components/DatePickerField';
import type {
  DropDownOption,
  OnChangeCascaderType,
  OnChangeTextAreaType,
} from '@/types/global';
import TextAreaInput from '@/components/TextAreaInput';

type FilterFieldProps = {
  fieldName: string;
  options?: DropDownOption[];
  onChange: (
    value?: OnChangeCascaderType | Dayjs | null,
    e?: OnChangeTextAreaType,
    dateString?: string
  ) => void;
  changeOnSelect?: boolean | null;
  type?: string | null;
  optionalStyles?: string | null;
};

export default function FilterField({
  fieldName,
  options,
  onChange,
  changeOnSelect = null,
  type = null,
  optionalStyles = null,
}: FilterFieldProps) {
  const getInputFromType = (typeValue: string | null) => {
    switch (typeValue) {
      case 'date':
        return (
          <DatePickerField
            fieldName={fieldName}
            onChange={onChange}
            customCascaderStyle={optionalStyles || styles.cascaderStyle}
          />
        );

      case 'text':
        return (
          <TextAreaInput
            fieldName={fieldName}
            onChange={onChange}
            customCascaderStyle={optionalStyles || styles.cascaderStyle}
          />
        );
      default:
        return (
          <SelectDropdown
            customCascaderStyle={optionalStyles || styles.cascaderStyle}
            fieldName={fieldName}
            options={options}
            onChange={onChange}
            changeOnSelect={changeOnSelect}
          />
        );
    }
  };

  return (
    <div className={styles.layoutFilterFieldContainer}>
      <h3 className={styles.h3FilterFieldTitle}>{fieldName}</h3>
      {getInputFromType(type)}
    </div>
  );
}
