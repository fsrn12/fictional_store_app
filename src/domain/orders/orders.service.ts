import { PaginationDto } from "@/querying/dto/pagination.dto.js";
import { PaginationService } from "@/querying/pagination.service.js";
import { DefaultPageSize } from "@/querying/util/querying.constants.js";
import {
  ConflictException,
  Injectable,
  RequestTimeoutException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOneOptions, Repository } from "typeorm";
import { ProductsService } from "../products/products.service.js";
import { CreateOrderDto } from "./dto/create-order.dto.js";
import { OrderItemDto } from "./dto/order-item.dto.js";
import { OrderItem } from "./entities/order-item.entity.js";
import { Order } from "./entities/order.entity.js";

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private readonly orderItemRepo: Repository<OrderItem>,
    // @InjectRepository(Product)
    // private readonly productRepo: Repository<Product>,
    private readonly productService: ProductsService,
    private readonly paginationService: PaginationService,
  ) {}
  public async saveOrder(order: Order): Promise<Order> {
    try {
      return await this.orderRepository.save(order);
    } catch (err) {
      throw new RequestTimeoutException(err, {
        description: "Failed to save the order",
      });
    }
  }
  public async create(createOrderDto: CreateOrderDto) {
    const { items } = createOrderDto;
    try {
      const itemsWithPrice = await Promise.all(
        items.map((item) => this.createOrderItemWithPrice(item)),
      );

      let order = this.orderRepository.create({
        ...createOrderDto,
        items: itemsWithPrice,
      });

      // return await this.orderRepository.save(order);
      return await this.saveOrder(order);
    } catch (err) {
      throw new ConflictException(err, {
        description: "No order created",
      });
    }
  }

  public async findAll(paginationDto: PaginationDto) {
    const { page } = paginationDto;
    const limit = paginationDto.limit ?? DefaultPageSize.ORDERS;
    const offset = this.paginationService.calculateOffset(limit, page);
    try {
      const [data, count] = await this.orderRepository.findAndCount({
        skip: offset,
        take: limit,
      });
      const meta = this.paginationService.createMeta(limit, page, count);
      return { data, meta };
    } catch (err) {
      throw new RequestTimeoutException(err);
    }
  }

  public findOrderOrFail(options: FindOneOptions<Order>) {
    return this.orderRepository.findOneOrFail(options);
  }

  public async findOne(id: number) {
    // return this.orderRepository.findOneOrFail({
    return this.findOrderOrFail({
      where: { id },
      relations: {
        items: {
          product: true,
        },
        customer: true,
        payment: true,
      },
    });
  }

  public async findOneById(obj: {}) {
    return await this.orderRepository.findOneBy(obj);
  }

  public async remove(id: number) {
    let order = await this.findOne(id);
    return this.orderRepository.remove(order);
  }

  private async createOrderItemWithPrice(orderItemDto: OrderItemDto) {
    const { id } = orderItemDto.product;
    const { price } = await this.productService.findOne(id);
    const orderItem = this.orderItemRepo.create({
      ...orderItemDto,
      price,
    });
    return orderItem;
  }
}
