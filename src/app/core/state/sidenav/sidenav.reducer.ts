import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import * as SidenavActions from './sidenav.actions';

export interface SidenavState {
  isOpened: boolean;
}

export const sidenavFeatureKey = 'sidenav';

const initialState: SidenavState = {
  isOpened: false,
};

export const reducer: ActionReducer<SidenavState, Action> = createReducer(
  initialState,
  on(SidenavActions.toggleSidenav, (state) => {
    return {
      ...state,
      isOpened: !state.isOpened,
    };
  })
);
