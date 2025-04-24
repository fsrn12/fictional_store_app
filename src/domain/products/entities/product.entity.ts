import { RegistryDates } from "@/common/embedded/registry-dates.embedded.js";
import { Category } from "@/domain/categories/entities/category.entity.js";
import { OrderItem } from "@/domain/orders/entities/order-item.entity.js";
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  type Relation,
} from "typeorm";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "varchar",
    unique: true,
    nullable: false,
    length: 128,
  })
  name: string;

  @Column({ type: "varchar", nullable: true, length: 1048 })
  description: string;

  @Column({
    type: "decimal",
    precision: 6,
    scale: 2,
  })
  price: number;

  @ManyToMany(
    () => Category,
    (category) => category.products,
  )
  @JoinTable({ name: "product_to_category" })
  categories: Relation<Category[]>;

  @OneToMany(
    () => OrderItem,
    (item) => item.product,
  )
  items: Relation<OrderItem[]>;

  @Column(() => RegistryDates, { prefix: false })
  registryDates: RegistryDates;

  get orders() {
    return this.items.map((item) => item.order);
  }
}
