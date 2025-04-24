import { join } from "node:path";
import { StorageProvider } from "@/files/storage/storage.provider.js";
import { FilePath, UPLOAD_BASE_PATH } from "@/files/utils/file.constant.js";
import { pathExists } from "fs-extra";
import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  LoadEvent,
} from "typeorm";
import { Product } from "../entities/product.entity.js";

@EventSubscriber()
export class ProductsSubscriber implements EntitySubscriberInterface<Product> {
  constructor(
    private readonly dataSource: DataSource,
    private readonly storageProvider: StorageProvider,
  ) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return Product;
  }

  public async afterLoad(entity: Product) {
    const imageFilenames = await this.getImageFilenames(entity.id);
    entity[this.IMAGES_FILENAMES_KEY] = imageFilenames;
  }

  private readonly IMAGES_FILENAMES_KEY = "imagesFilenames";
  private async getImageFilenames(id: number) {
    const { BASE, IMAGES } = FilePath.Products;
    const path = join(BASE, id.toString(), IMAGES);

    if (!(await pathExists(join(UPLOAD_BASE_PATH, path)))) {
      return;
    }

    return this.storageProvider.getDirFileNames(path);
  }
}
