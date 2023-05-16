import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import type { Dayjs } from 'dayjs';

import React from 'react';

import { Game as GameType } from '@/graphql/__generated__/graphql';

export interface DropDownOption {
  value: string;
  label: string;
  children?: DropDownOption[];
}

export type OnChangeCascaderType = (string | number)[] | string | number;

export type OnChangeCheckboxType = CheckboxChangeEvent;

export type OnChangeTextAreaType = React.ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement
>;

export type OnChangeDatePickerType = Dayjs | null;

export type OnChangeFilterType =
  | OnChangeCascaderType
  | OnChangeCheckboxType
  | Dayjs
  | OnChangeTextAreaType
  | null;

export type UserGamesType = {
  completed: GameType[];
  completedCount: number;
  dropped: GameType[];
  droppedCount: number;
  errors: string[];
  listsOrder: string;
  paused: GameType[];
  pausedCount: number;
  planning: GameType[];
  planningCount: number;
  playing: GameType[];
  playingCount: number;
  totalCount: number;
  [key: string]: GameType[] | number | string | string[];
};
