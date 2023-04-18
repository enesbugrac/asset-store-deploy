//INTERFACES
export interface Market {
  [key: string]: any;
}

export interface Author {
  developer_name?: string | undefined;
  email?: string | undefined;
  website?: string | undefined;
  thumbnail?: string | undefined;
  address?: string | undefined;
  description?: string | undefined;
}
export interface FilterParams {
  date?: string;
  price?: number;
  publisher?: string;
}
export interface Asset {
  _id: string;
  images: string[];
  name: string;
  git_url: string;
  support: string;
  latest_version: string;
  licence: string;
  price: number;
  description: string;
  compatible_with: string;
  user: User;
  tags: any[];
  latest_release_date: Date;
  rating_count: number;
  rating_average: number;
  approved: boolean;
  integrated_count: number;
}
export interface Options {
  headers?: object;
  queryParams?: {
    [key: string]: any;
    paginate?: true;
  };
}
export interface User {
  [key: string]: any;
}

export interface PurchaseInformation {
  on_cart: boolean;
  in_market: boolean;
  asset_on_market: any;
}

export interface IntegratingAssetInformation {
  state: "loading" | "error" | "success";
  step: number;
}
