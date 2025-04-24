import { ROLE } from "@/auth/roles/enums/role.enum.js";
import { RegistryDates } from "@/common/embedded/registry-dates.embedded.js";
import { Order } from "@/domain/orders/entities/order.entity.js";
import { Exclude } from "class-transformer";

import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  type Relation,
} from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "varchar",
    length: 140,
    nullable: false,
  })
  name: string;

  @Column({
    type: "varchar",
    unique: true,
    nullable: false,
  })
  email: string;

  @Column({
    type: "varchar",
    // unique: true,
    nullable: false,
  })
  phone: string;

  @Exclude()
  @Column({
    type: "varchar",
    nullable: false,
  })
  password: string;

  @Column({
    type: "enum",
    enum: ROLE,
    enumName: "role_enum",
    default: ROLE.USER,
  })
  role: ROLE;

  @Column(() => RegistryDates, { prefix: false })
  registryDates: RegistryDates;

  /** get method returns a boolean value based on user deletion date*/
  get isDeleted() {
    return !!this.registryDates.deletedAt;
  }

  @OneToMany(
    () => Order,
    (order) => order.customer,
    { cascade: ["soft-remove", "recover"] },
  )
  orders: Relation<Order[]>;
}
