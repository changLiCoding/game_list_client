import type { OnChangeCascaderType } from '@/types/global';

export type FilterTagsType = {
  setTagsArr: React.Dispatch<
    React.SetStateAction<
      {
        id: string;
        value: string | OnChangeCascaderType;
      }[]
    >
  >;
  tagsArr: { id: string; value: string | number | OnChangeCascaderType }[];
};

export type SelectorsWrapperType = {
  isCardView: boolean;
  setIsCardView: React.Dispatch<React.SetStateAction<boolean>>;
};
