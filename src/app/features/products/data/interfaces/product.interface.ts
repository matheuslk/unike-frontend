export interface IFetchProductsResponse {
  id: number;
  name: string;
  price: number;
  amount: number;
  description: string;
  category_id: number;
  images: [
    {
      id: number;
      file_name: string;
      product_id: number;
    }
  ];
}
