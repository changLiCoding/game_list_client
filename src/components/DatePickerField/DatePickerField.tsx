import { DatePicker } from 'antd';
import type { DatePickerProps } from 'antd';

import styles from '@/components/DatePickerField/DatePickerField.module.scss';

function DatePickerField({
  fieldName,
  onChange,
  customCascaderStyle,
}: {
  fieldName: string;
  onChange: (value: any) => void;
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
