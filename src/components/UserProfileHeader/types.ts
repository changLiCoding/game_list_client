import { VisibilityContext } from 'react-horizontal-scrolling-menu';
import type { InitialStateType } from '@/features/types';

export type UserProfileHeaderType = {
  userState: InitialStateType;
};

export type ScrollVisibilityApiType = React.ContextType<
  typeof VisibilityContext
>;
