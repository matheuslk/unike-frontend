import { createFeatureSelector, createSelector } from '@ngrx/store';
import { sidenavFeatureKey, SidenavState } from './sidenav.reducer';

export const selectSidenavState =
  createFeatureSelector<SidenavState>(sidenavFeatureKey);

export const selectIsOpened = createSelector(
  selectSidenavState,
  (state: SidenavState): boolean => state.isOpened
);
