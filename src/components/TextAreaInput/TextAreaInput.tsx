import { Input } from 'antd';
import React from 'react';

function TextAreaInput({
  fieldName,
  customCascaderStyle,
  onChange,
}: {
  fieldName: string;
  customCascaderStyle: string | undefined;
  onChange: (
    value: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}) {
  const { TextArea } = Input;
  return (
    <TextArea
      showCount
      maxLength={100}
      onChange={(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      ) => onChange(e)}
      placeholder={fieldName}
      className={customCascaderStyle}
    />
  );
}

export default TextAreaInput;
