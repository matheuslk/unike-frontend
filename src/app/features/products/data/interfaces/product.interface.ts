export interface ICategory {
  id: number;
  name: string;
}

export interface IImage {
  id: number;
  file_name: string;
  product_id: number;
}

export interface IProduct {
  id: number;
  name: string;
  price: number;
  description: string;
  category_id: number;
}

export interface IProductFormBody extends Omit<IProduct, 'id'> {
  files: File[];
  removeFiles?: boolean;
}

export interface IProductResponse extends IProduct {
  category: ICategory;
  images: IImage[];
}

export interface IFilteredProductResponse extends IProduct {
  images: IImage[];
}
