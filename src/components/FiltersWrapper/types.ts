import { OnChangeCascaderType } from '@/types/global';

export type FilterWrapperType = {
  setTagsArr: React.Dispatch<
    React.SetStateAction<
      {
        id: string;
        value: string | OnChangeCascaderType;
      }[]
    >
  >;
};
