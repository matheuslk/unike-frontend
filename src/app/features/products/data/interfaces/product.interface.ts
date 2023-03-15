export interface ICategory {
  id: number;
  name: string;
}

export interface IImage {
  id: number;
  file_name: string;
  product_id: number;
}

export interface ISize {
  id: number;
  size: string;
  product_id: number;
}

export interface IProduct {
  id: number;
  name: string;
  price: number;
  amount: number;
  description: string;
  category_id: number;
}

export interface IFilterProductResponse extends IProduct {
  images: IImage[];
}

export interface IFindProductResponse extends IProduct {
  category: ICategory;
  images: IImage[];
  sizes: ISize[];
}
