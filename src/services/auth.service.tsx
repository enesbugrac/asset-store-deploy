import { environment } from "@/environment";
import { User } from "@/interfaces/data";
import jwt_decode from "jwt-decode";
import { initialize, user } from "./bucket";
import { login } from "./Auth";

export class AuthService {
  identity_id!: string;
  storage_keys: {
    asset_store_token: string;
    hq_token: string;
    user_id: string;
  } = {
    asset_store_token: "asset_store_token",
    hq_token: "hq_token",
    user_id: "user_id",
  };

  constructor() {
    initialize(this.initializeObject());
  }

  getHqToken() {
    return localStorage.getItem(this.storage_keys.hq_token);
  }
  async setHqToken(hq_token: string) {
    localStorage.setItem(this.storage_keys.hq_token, hq_token);
    await this.assignAssetstoreToken(hq_token);
    return this.assignUser();
  }
  setUserId(user_id: string) {
    if (!user_id) {
      localStorage.removeItem(this.storage_keys.user_id);
    } else {
      localStorage.setItem(this.storage_keys.user_id, user_id);
    }
  }
  getUserId() {
    return typeof window !== "undefined"
      ? window.localStorage.getItem(this.storage_keys.user_id)
      : "";
  }
  assignAssetstoreToken(hq_token: string) {
    return new Promise((resolve, reject) => {
      login({ data: { token: hq_token } })
        .then((res: any) => {
          localStorage.setItem(this.storage_keys.asset_store_token, res.token);

          resolve(true);
        })
        .catch((error: any) => {
          reject(new Error(error));
        });
    });
  }
  getAssetStoreToken() {
    return typeof window !== "undefined"
      ? window.localStorage.getItem(this.storage_keys.asset_store_token)
      : "";
  }

  public isAuthenticated(): boolean {
    return (
      !!localStorage.getItem(this.storage_keys.hq_token) &&
      !!localStorage.getItem(this.storage_keys.asset_store_token)
    );
  }
  getIdentityId() {
    let id: string = "";
    const token = localStorage.getItem(
      this.storage_keys.asset_store_token
    ) as string;
    if (!token) return "";
    try {
      const identity: { _id: string } = jwt_decode(token);
      if (identity) id = identity._id;
    } catch (e: any) {
      console.log("error jwt :", e);
    }
    return id;
  }
  assignUser(): Promise<User> {
    const identity = this.getIdentityId();
    return new Promise((res, rej) => {
      if (!identity) return rej();
      initialize(this.initializeObject());
      user
        .getAll({
          queryParams: {
            filter: {
              identity_id: identity,
            },
          },
        })
        .then((data: any) => {
          if (data[0]) {
            this.setUserId(data[0]._id);
            return res(data[0]);
          } else return rej();
        })
        .catch((e) => {
          return rej(e);
        });
    });
  }
  deleteLocalStorage() {
    localStorage.clear();
  }
  getUserFromBucket(identity_id: string) {
    const params = {
      filter: JSON.stringify({
        identity_id: identity_id,
      }),
    };
    return user.getAll({ queryParams: params });
  }
  initializeObject() {
    return this.getAssetStoreToken()?.length! > 0
      ? {
          identity: this.getAssetStoreToken()!,
          publicUrl: environment.url,
        }
      : {
          apikey: environment.api_key!,
          publicUrl: environment.url,
        };
  }
}
const authService = new AuthService();
export default authService;
