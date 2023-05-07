import { DatePicker } from 'antd';
import type { Dayjs } from 'dayjs';

// import styles from '@/components/DatePickerField/DatePickerField.module.scss';

function DatePickerField({
  fieldName,
  onChange,
  customCascaderStyle,
}: {
  fieldName: string;
  onChange: (value: Dayjs | null, dateString: string) => void;
  customCascaderStyle: string | undefined;
}) {
  return (
    <DatePicker
      className={customCascaderStyle}
      placeholder={fieldName}
      onChange={onChange}
    />
  );
}

export default DatePickerField;
