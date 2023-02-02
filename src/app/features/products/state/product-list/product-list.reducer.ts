// import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
// import * as ProductListActions from './product-list.actions';

// export interface ProductListState {
//   isFilterSidenavOpened: boolean;
// }

// export const productListFeatureKey = 'product-list';

// const initialState: ProductListState = {
//   isFilterSidenavOpened: false,
// };

// export const reducer: ActionReducer<ProductListState, Action> = createReducer(
//   initialState,
//   on(ProductListActions.toggleFilterSidenav, (state) => {
//     return {
//       ...state,
//       isFilterSidenavOpened: !state.isFilterSidenavOpened,
//     };
//   })
// );
