import { DatePicker } from 'antd';
import type { OnChangeDatePickerType } from '@/types/global';

// import styles from '@/components/DatePickerField/DatePickerField.module.scss';

function DatePickerField({
  fieldName,
  onChange,
  customCascaderStyle,
}: {
  fieldName: string;
  onChange: (value: OnChangeDatePickerType, dateString: string) => void;
  customCascaderStyle: string;
}) {
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
