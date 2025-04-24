import { RegistryDates } from "@/common/embedded/registry-dates.embedded.js";
import { Order } from "@/domain/orders/entities/order.entity.js";
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  type Relation,
} from "typeorm";

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(
    () => Order,
    (order) => order.payment,
    { nullable: false, onDelete: "CASCADE" },
  )
  @JoinColumn()
  order: Relation<Order>;

  @Column(() => RegistryDates, { prefix: false })
  registryDates: RegistryDates;
}
