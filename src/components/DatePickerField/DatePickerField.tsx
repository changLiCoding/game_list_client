import { DatePicker } from 'antd';
import type { DatePickerFieldType } from '@/components/DatePickerField/types';
// import styles from '@/components/DatePickerField/DatePickerField.module.scss';

function DatePickerField({
  fieldName,
  onChange,
  customCascaderStyle,
}: DatePickerFieldType) {
  return (
    <DatePicker
      className={customCascaderStyle}
      placeholder={fieldName}
      onChange={onChange}
      data-testid={`date-picker-${fieldName}`}
    />
  );
}

export default DatePickerField;
