import { ICategory } from './product.interface';

export interface ISearchFilters {
  name: string;
  categories: string[];
  sizes: string[];
}

export interface IFiltersResponse {
  categories: ICategory[];
  sizes: { size: string }[];
}
