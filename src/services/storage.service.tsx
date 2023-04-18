import { environment } from "@/environment";
import * as Storage from "@spica-devkit/storage";

class StorageService {
  constructor() {
    Storage.initialize({
      publicUrl: environment.url,
      apikey: environment.api_key,
    });
  }
  insert(file: any) {
    return Storage.insert(file);
  }
}
const storageService = new StorageService();
export default storageService;
