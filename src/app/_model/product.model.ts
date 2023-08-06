import { FileHandle } from "./file-handle.model";

export interface Product {
  productId: number;
  productName: string;
  type: string;
  ml: number;
  bestSeller: boolean;
  trendProduct: boolean;
  productDescription: string;
  productFullDescription: string;
  productDiscountedPrice: number;
  productActualPrice: number;
  productImages: FileHandle[];
}
