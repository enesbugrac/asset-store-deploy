//@ts-nocheck
import * as Bucket from "@spica-devkit/bucket";
/**
 * Call this method before interacting with buckets.
 * @param initOptions Initialize options to initialize the '@spica-devkit/bucket'.
 */
export function initialize(
  ...initOptions: Parameters<typeof Bucket.initialize>
) {
  initOptions[0].publicUrl = "https://assetstore-882ef.hq.spicaengine.com/api";
  Bucket.initialize(...initOptions);
}

type Rest<T extends any[]> = ((...p: T) => void) extends (
  p1: infer P1,
  ...rest: infer R
) => void
  ? R
  : never;
type getArgs = Rest<Parameters<typeof Bucket.data.get>>;
type getAllArgs = Rest<Parameters<typeof Bucket.data.getAll>>;
type realtimeGetArgs = Rest<Parameters<typeof Bucket.data.realtime.get>>;
type realtimeGetAllArgs = Rest<Parameters<typeof Bucket.data.realtime.getAll>>;
type id = { _id: string };

export interface Assets {
  _id?: string;
  name?: string;
  user?: (User & id) | string;
  price?: number;
  sales?: number;
  licence?: string;
  latest_version?: string;
  latest_release_date?: Date | string;
  support?: string;
  compatible_with?: string;
  description?: string;
  rating_count?: number;
  rating_average?: number;
  git_url?: string;
  approved?: boolean;
  images?: string[];
  tags?: ((Tags & id) | string)[];
  integrated_count?: number;
}
export namespace assets {
  const BUCKET_ID = "5f158e77be1dd33ef975a257";
  export function get(...args: getArgs) {
    return Bucket.data.get<Assets & id>(BUCKET_ID, ...args);
  }
  export function getAll(...args: getAllArgs) {
    return Bucket.data.getAll<Assets & id>(BUCKET_ID, ...args);
  }
  export function insert(document: Omit<Assets, "_id">) {
    ["user", "tags"].forEach((field) => {
      if (typeof document[field] == "object") {
        document[field] = Array.isArray(document[field])
          ? document[field].map((v) => v._id || v)
          : document[field]._id;
      }
    });
    return Bucket.data.insert(BUCKET_ID, document);
  }
  export function update(document: Assets & id) {
    ["user", "tags"].forEach((field) => {
      if (typeof document[field] == "object") {
        document[field] = Array.isArray(document[field])
          ? document[field].map((v) => v._id || v)
          : document[field]._id;
      }
    });
    return Bucket.data.update(BUCKET_ID, document._id, document);
  }
  export function patch(document: Partial<Assets> & id) {
    ["user", "tags"].forEach((field) => {
      if (typeof document[field] == "object") {
        document[field] = Array.isArray(document[field])
          ? document[field].map((v) => v._id || v)
          : document[field]._id;
      }
    });
    return Bucket.data.patch(BUCKET_ID, document._id, document);
  }
  export function remove(documentId: string) {
    return Bucket.data.remove(BUCKET_ID, documentId);
  }
  export namespace realtime {
    export function get(...args: realtimeGetArgs) {
      return Bucket.data.realtime.get<Assets & id>(BUCKET_ID, ...args);
    }
    export function getAll(...args: realtimeGetAllArgs) {
      return Bucket.data.realtime.getAll<Assets & id>(BUCKET_ID, ...args);
    }
  }
}

export interface Market {
  _id?: string;
  user?: (User & id) | string;
  asset?: (Assets & id) | string;
  status?: "onCart" | "sold";
  project_id?: string;
  date?: Date | string;
}
export namespace market {
  const BUCKET_ID = "5f199ae89051b7645ebab132";
  export function get(...args: getArgs) {
    return Bucket.data.get<Market & id>(BUCKET_ID, ...args);
  }
  export function getAll(...args: getAllArgs) {
    return Bucket.data.getAll<Market & id>(BUCKET_ID, ...args);
  }
  export function insert(document: Omit<Market, "_id">) {
    ["user", "asset"].forEach((field) => {
      if (typeof document[field] == "object") {
        document[field] = Array.isArray(document[field])
          ? document[field].map((v) => v._id || v)
          : document[field]._id;
      }
    });
    return Bucket.data.insert(BUCKET_ID, document);
  }
  export function update(document: Market & id) {
    ["user", "asset"].forEach((field) => {
      if (typeof document[field] == "object") {
        document[field] = Array.isArray(document[field])
          ? document[field].map((v) => v._id || v)
          : document[field]._id;
      }
    });
    return Bucket.data.update(BUCKET_ID, document._id, document);
  }
  export function patch(document: Partial<Market> & id) {
    ["user", "asset"].forEach((field) => {
      if (typeof document[field] == "object") {
        document[field] = Array.isArray(document[field])
          ? document[field].map((v) => v._id || v)
          : document[field]._id;
      }
    });
    return Bucket.data.patch(BUCKET_ID, document._id, document);
  }
  export function remove(documentId: string) {
    return Bucket.data.remove(BUCKET_ID, documentId);
  }
  export namespace realtime {
    export function get(...args: realtimeGetArgs) {
      return Bucket.data.realtime.get<Market & id>(BUCKET_ID, ...args);
    }
    export function getAll(...args: realtimeGetAllArgs) {
      return Bucket.data.realtime.getAll<Market & id>(BUCKET_ID, ...args);
    }
  }
}

export interface Integrated_Assets {
  _id?: string;
  asset?: (Assets & id) | string;
  server?: string;
  date?: Date | string;
}
export namespace integrated_assets {
  const BUCKET_ID = "5fb23084e21e2e002c4341a7";
  export function get(...args: getArgs) {
    return Bucket.data.get<Integrated_Assets & id>(BUCKET_ID, ...args);
  }
  export function getAll(...args: getAllArgs) {
    return Bucket.data.getAll<Integrated_Assets & id>(BUCKET_ID, ...args);
  }
  export function insert(document: Omit<Integrated_Assets, "_id">) {
    ["asset"].forEach((field) => {
      if (typeof document[field] == "object") {
        document[field] = Array.isArray(document[field])
          ? document[field].map((v) => v._id || v)
          : document[field]._id;
      }
    });
    return Bucket.data.insert(BUCKET_ID, document);
  }
  export function update(document: Integrated_Assets & id) {
    ["asset"].forEach((field) => {
      if (typeof document[field] == "object") {
        document[field] = Array.isArray(document[field])
          ? document[field].map((v) => v._id || v)
          : document[field]._id;
      }
    });
    return Bucket.data.update(BUCKET_ID, document._id, document);
  }
  export function patch(document: Partial<Integrated_Assets> & id) {
    ["asset"].forEach((field) => {
      if (typeof document[field] == "object") {
        document[field] = Array.isArray(document[field])
          ? document[field].map((v) => v._id || v)
          : document[field]._id;
      }
    });
    return Bucket.data.patch(BUCKET_ID, document._id, document);
  }
  export function remove(documentId: string) {
    return Bucket.data.remove(BUCKET_ID, documentId);
  }
  export namespace realtime {
    export function get(...args: realtimeGetArgs) {
      return Bucket.data.realtime.get<Integrated_Assets & id>(
        BUCKET_ID,
        ...args
      );
    }
    export function getAll(...args: realtimeGetAllArgs) {
      return Bucket.data.realtime.getAll<Integrated_Assets & id>(
        BUCKET_ID,
        ...args
      );
    }
  }
}

export interface User {
  _id?: string;
  author: {
    developer_name?: string;
    email?: string;
    website?: string;
    thumbnail?: string;
    address?: string;
    description?: string;
  };
  spica_id?: string;
  hq_id?: string;
  identity_id?: string;
}
export namespace user {
  const BUCKET_ID = "5f158d79be1dd377b775a255";
  export function get(...args: getArgs) {
    return Bucket.data.get<User & id>(BUCKET_ID, ...args);
  }
  export function getAll(...args: getAllArgs) {
    return Bucket.data.getAll<User & id>(BUCKET_ID, ...args);
  }
  export function insert(document: Omit<User, "_id">) {
    return Bucket.data.insert(BUCKET_ID, document);
  }
  export function update(document: User & id) {
    return Bucket.data.update(BUCKET_ID, document._id, document);
  }
  export function patch(document: Partial<User> & id) {
    return Bucket.data.patch(BUCKET_ID, document._id, document);
  }
  export function remove(documentId: string) {
    return Bucket.data.remove(BUCKET_ID, documentId);
  }
  export namespace realtime {
    export function get(...args: realtimeGetArgs) {
      return Bucket.data.realtime.get<User & id>(BUCKET_ID, ...args);
    }
    export function getAll(...args: realtimeGetAllArgs) {
      return Bucket.data.realtime.getAll<User & id>(BUCKET_ID, ...args);
    }
  }
}

export interface Reviews {
  _id?: string;
  review_id?: string;
  asset?: (Assets & id) | string;
  user?: (User & id) | string;
  date?: Date | string;
  text?: string;
  score?: number;
}
export namespace reviews {
  const BUCKET_ID = "5f15910abe1dd322a175a25b";
  export function get(...args: getArgs) {
    return Bucket.data.get<Reviews & id>(BUCKET_ID, ...args);
  }
  export function getAll(...args: getAllArgs) {
    return Bucket.data.getAll<Reviews & id>(BUCKET_ID, ...args);
  }
  export function insert(document: Omit<Reviews, "_id">) {
    ["asset", "user"].forEach((field) => {
      if (typeof document[field] == "object") {
        document[field] = Array.isArray(document[field])
          ? document[field].map((v) => v._id || v)
          : document[field]._id;
      }
    });
    return Bucket.data.insert(BUCKET_ID, document);
  }
  export function update(document: Reviews & id) {
    ["asset", "user"].forEach((field) => {
      if (typeof document[field] == "object") {
        document[field] = Array.isArray(document[field])
          ? document[field].map((v) => v._id || v)
          : document[field]._id;
      }
    });
    return Bucket.data.update(BUCKET_ID, document._id, document);
  }
  export function patch(document: Partial<Reviews> & id) {
    ["asset", "user"].forEach((field) => {
      if (typeof document[field] == "object") {
        document[field] = Array.isArray(document[field])
          ? document[field].map((v) => v._id || v)
          : document[field]._id;
      }
    });
    return Bucket.data.patch(BUCKET_ID, document._id, document);
  }
  export function remove(documentId: string) {
    return Bucket.data.remove(BUCKET_ID, documentId);
  }
  export namespace realtime {
    export function get(...args: realtimeGetArgs) {
      return Bucket.data.realtime.get<Reviews & id>(BUCKET_ID, ...args);
    }
    export function getAll(...args: realtimeGetAllArgs) {
      return Bucket.data.realtime.getAll<Reviews & id>(BUCKET_ID, ...args);
    }
  }
}

export interface Category {
  _id?: string;
  category?: string;
  parent_category?: (Category & id) | string;
  link?: string;
}
export namespace category {
  const BUCKET_ID = "5f3105094b7a2b5c7cb7140a";
  export function get(...args: getArgs) {
    return Bucket.data.get<Category & id>(BUCKET_ID, ...args);
  }
  export function getAll(...args: getAllArgs) {
    return Bucket.data.getAll<Category & id>(BUCKET_ID, ...args);
  }
  export function insert(document: Omit<Category, "_id">) {
    ["parent_category"].forEach((field) => {
      if (typeof document[field] == "object") {
        document[field] = Array.isArray(document[field])
          ? document[field].map((v) => v._id || v)
          : document[field]._id;
      }
    });
    return Bucket.data.insert(BUCKET_ID, document);
  }
  export function update(document: Category & id) {
    ["parent_category"].forEach((field) => {
      if (typeof document[field] == "object") {
        document[field] = Array.isArray(document[field])
          ? document[field].map((v) => v._id || v)
          : document[field]._id;
      }
    });
    return Bucket.data.update(BUCKET_ID, document._id, document);
  }
  export function patch(document: Partial<Category> & id) {
    ["parent_category"].forEach((field) => {
      if (typeof document[field] == "object") {
        document[field] = Array.isArray(document[field])
          ? document[field].map((v) => v._id || v)
          : document[field]._id;
      }
    });
    return Bucket.data.patch(BUCKET_ID, document._id, document);
  }
  export function remove(documentId: string) {
    return Bucket.data.remove(BUCKET_ID, documentId);
  }
  export namespace realtime {
    export function get(...args: realtimeGetArgs) {
      return Bucket.data.realtime.get<Category & id>(BUCKET_ID, ...args);
    }
    export function getAll(...args: realtimeGetAllArgs) {
      return Bucket.data.realtime.getAll<Category & id>(BUCKET_ID, ...args);
    }
  }
}

export interface Settings {
  _id?: string;
  key: string;
  value?: string;
}
export namespace settings {
  const BUCKET_ID = "604754eea8a2c7002c39227f";
  export function get(...args: getArgs) {
    return Bucket.data.get<Settings & id>(BUCKET_ID, ...args);
  }
  export function getAll(...args: getAllArgs) {
    return Bucket.data.getAll<Settings & id>(BUCKET_ID, ...args);
  }
  export function insert(document: Omit<Settings, "_id">) {
    return Bucket.data.insert(BUCKET_ID, document);
  }
  export function update(document: Settings & id) {
    return Bucket.data.update(BUCKET_ID, document._id, document);
  }
  export function patch(document: Partial<Settings> & id) {
    return Bucket.data.patch(BUCKET_ID, document._id, document);
  }
  export function remove(documentId: string) {
    return Bucket.data.remove(BUCKET_ID, documentId);
  }
  export namespace realtime {
    export function get(...args: realtimeGetArgs) {
      return Bucket.data.realtime.get<Settings & id>(BUCKET_ID, ...args);
    }
    export function getAll(...args: realtimeGetAllArgs) {
      return Bucket.data.realtime.getAll<Settings & id>(BUCKET_ID, ...args);
    }
  }
}

export interface Tags {
  _id?: string;
  tag: string;
}
export namespace tags {
  const BUCKET_ID = "609aa086279b71002c4a6838";
  export function get(...args: getArgs) {
    return Bucket.data.get<Tags & id>(BUCKET_ID, ...args);
  }
  export function getAll(...args: getAllArgs) {
    return Bucket.data.getAll<Tags & id>(BUCKET_ID, ...args);
  }
  export function insert(document: Omit<Tags, "_id">) {
    return Bucket.data.insert(BUCKET_ID, document);
  }
  export function update(document: Tags & id) {
    return Bucket.data.update(BUCKET_ID, document._id, document);
  }
  export function patch(document: Partial<Tags> & id) {
    return Bucket.data.patch(BUCKET_ID, document._id, document);
  }
  export function remove(documentId: string) {
    return Bucket.data.remove(BUCKET_ID, documentId);
  }
  export namespace realtime {
    export function get(...args: realtimeGetArgs) {
      return Bucket.data.realtime.get<Tags & id>(BUCKET_ID, ...args);
    }
    export function getAll(...args: realtimeGetAllArgs) {
      return Bucket.data.realtime.getAll<Tags & id>(BUCKET_ID, ...args);
    }
  }
}
