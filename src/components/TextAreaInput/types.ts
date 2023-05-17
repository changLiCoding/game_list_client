export type TextAreaInputType = {
  fieldName: string;
  customCascaderStyle: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
};
