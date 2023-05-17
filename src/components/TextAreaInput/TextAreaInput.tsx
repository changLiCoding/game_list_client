import { Input } from 'antd';
import type { TextAreaInputType } from '@/components/TextAreaInput/types';

function TextAreaInput({
  fieldName,
  customCascaderStyle,
  onChange,
}: TextAreaInputType) {
  const { TextArea } = Input;
  return (
    <TextArea
      showCount
      maxLength={100}
      onChange={(e) => onChange(e)}
      placeholder={fieldName}
      className={customCascaderStyle}
      data-testid={`text-area-${fieldName}`}
    />
  );
}

export default TextAreaInput;
