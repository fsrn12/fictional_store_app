import { RegistryDates } from "@/common/embedded/registry-dates.embedded.js";
import { Product } from "@/domain/products/entities/product.entity.js";
import {
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  type Relation,
} from "typeorm";

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "varchar",
    unique: true,
    nullable: false,
    length: 124,
  })
  name: string;

  @ManyToMany(
    () => Product,
    (product) => product.categories,
  )
  products: Relation<Product[]>;

  @Column(() => RegistryDates, { prefix: false })
  registryDates: RegistryDates;
}
