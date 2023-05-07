import styles from '@/components/FiltersWrapper/FilterField/FilterField.module.scss';
import SelectDropdown from '@/components/SelectDropdown';
import DatePickerField from '@/components/DatePickerField';
import type { OnChangeFilterType, DropDownOption } from '@/types/global';
import TextAreaInput from '@/components/TextAreaInput';

type FilterFieldProps = {
  fieldName: string;
  options: DropDownOption[] | undefined;
  onChange: (value?: OnChangeFilterType, dateString?: string) => void;
  changeOnSelect: boolean | undefined;
  type: string | undefined;
  optionalStyles: string | undefined;
};

export default function FilterField({
  fieldName,
  options,
  onChange,
  changeOnSelect = undefined,
  type = undefined,
  optionalStyles = undefined,
}: FilterFieldProps) {
  const getInputFromType = (typeValue: string | undefined) => {
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
