import { Input } from 'antd';
import React from 'react';

function TextAreaInput({
  fieldName,
  customCascaderStyle,
  onChange,
}: {
  fieldName: string;
  customCascaderStyle: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}) {
  const { TextArea } = Input;
  return (
    <TextArea
      showCount
      maxLength={100}
      onChange={(e) => onChange(e)}
      placeholder={fieldName}
      className={customCascaderStyle}
    />
  );
}

export default TextAreaInput;
