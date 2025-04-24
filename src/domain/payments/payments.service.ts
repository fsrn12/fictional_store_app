import { RequestUser } from "@/auth/interfaces/request-user.interface.js";
import { ROLE } from "@/auth/roles/enums/role.enum.js";
import { isCurrentUser } from "@/auth/utils/authorization.util.js";
import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Order } from "../orders/entities/order.entity.js";
import { OrderStatus } from "../orders/enums/order-status.enum.js";
import { OrdersService } from "../orders/orders.service.js";
import { Payment } from "./entities/payment.entity.js";

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    // @InjectRepository(Order)
    // private readonly ordersRepository: Repository<Order>,
    private readonly ordersService: OrdersService,
  ) {}

  public async payOrder(id: number, currentUser: RequestUser) {
    const order = await this.ordersService.findOrderOrFail({
      where: { id },
      relations: { payment: true, customer: true },
    });
    if (currentUser.role !== ROLE.ADMIN && currentUser.role !== ROLE.MANAGER) {
      isCurrentUser(currentUser.id, order.customer.id);
    }
    if (order.payment) {
      throw new ConflictException("Order already paid");
    }
    const payment = this.paymentRepository.create();
    order.payment = payment;
    order.status = OrderStatus.AWAITING_DISPATCH;
    return await this.ordersService.saveOrder(order);
  }
}
