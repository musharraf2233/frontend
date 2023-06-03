import { FileHandle } from "./file-handle.model";

export interface Product {
  productId: number;
  productName: string;
  type: string;
  ml: number;
  bestSeller: boolean;
  productDescription: string;
  productDiscountedPrice: number;
  productActualPrice: number;
  productImages: FileHandle[];
}
