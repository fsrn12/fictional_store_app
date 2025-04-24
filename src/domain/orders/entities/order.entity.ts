import { RegistryDates } from "@/common/embedded/registry-dates.embedded.js";
import { Payment } from "@/domain/payments/entities/payment.entity.js";
import { User } from "@/domain/users/entities/user.entity.js";
import { Expose } from "class-transformer";
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  type Relation,
} from "typeorm";
import { OrderStatus } from "../enums/order-status.enum.js";
import { OrderItem } from "./order-item.entity.js";

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "enum",
    enum: OrderStatus,
    default: OrderStatus.AWAITING_PAYMENT,
  })
  status: OrderStatus;

  @ManyToOne(
    () => User,
    (customer) => customer.orders,
    { nullable: false },
  )
  customer: Relation<User>;

  @OneToOne(
    () => Payment,
    (payment) => payment.order,
    { cascade: true },
  )
  payment: Relation<Payment>;

  @OneToMany(
    () => OrderItem,
    (item) => item.order,
    { cascade: true },
  )
  items: Relation<OrderItem[]>;

  @Expose()
  get total() {
    return this.items?.reduce((total, item) => total + item.subTotal, 0);
  }

  @Column(() => RegistryDates, { prefix: false })
  registryDates: RegistryDates;
}
