import styles from '@/components/FiltersWrapper/FilterField/FilterField.module.scss';
import SelectDropdown from '@/components/SelectDropdown';
import DatePickerField from '@/components/DatePickerField';
import type { DropDownOption, OnChangeType } from '@/types/global';
import TextAreaInput from '@/components/TextAreaInput';

export default function FilterField({
  fieldName,
  options,
  onChange,
  changeOnSelect,
  type,
  optionalStyles,
}: {
  fieldName: string;
  options: DropDownOption[];
  onChange: (
    value:
      | OnChangeType
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  changeOnSelect: boolean;
  type: string | null;
  optionalStyles: string | null;
}) {
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
