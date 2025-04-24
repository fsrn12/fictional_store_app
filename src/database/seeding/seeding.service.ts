import { Category } from "@/domain/categories/entities/category.entity.js";
import { OrderItem } from "@/domain/orders/entities/order-item.entity.js";
import { Order } from "@/domain/orders/entities/order.entity.js";
import { OrderStatus } from "@/domain/orders/enums/order-status.enum.js";
import { Payment } from "@/domain/payments/entities/payment.entity.js";
import { Product } from "@/domain/products/entities/product.entity.js";
import { User } from "@/domain/users/entities/user.entity.js";
import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";

@Injectable()
export class SeedingService {
  constructor(private readonly dataSource: DataSource) {}
  public async seed() {
    await this.dataSource.transaction(async (manager) => {
      // 1: Getting repositories
      const usersRepository = manager.getRepository(User);
      const categoriesRepository = manager.getRepository(Category);
      const productsRepository = manager.getRepository(Product);
      const ordersRepository = manager.getRepository(Order);
      const orderItemsRepository = manager.getRepository(OrderItem);
      const paymentsRepository = manager.getRepository(Payment);

      // 2: Cleanup Database
      const orders = await ordersRepository.find();
      await ordersRepository.remove(orders);
      const users = await usersRepository.find();
      await usersRepository.remove(users);
      const products = await productsRepository.find();
      await productsRepository.remove(products);
      const categories = await categoriesRepository.find();
      await categoriesRepository.remove(categories);

      // 3: Creating & Saving Categories
      const clothing = categoriesRepository.create({ name: "Clothing" });
      const electronics = categoriesRepository.create({ name: "Electronics" });
      const home = categoriesRepository.create({ name: "Home and Furniture" });
      const books = categoriesRepository.create({ name: "Books" });
      const beauty = categoriesRepository.create({ name: "Beauty" });
      const computers = categoriesRepository.create({ name: "Computers" });
      const games = categoriesRepository.create({ name: "Games" });

      await categoriesRepository.save([
        clothing,
        electronics,
        home,
        books,
        beauty,
        computers,
        games,
      ]);

      // 3: Creating & Saving Products
      const prod1 = productsRepository.create({
        name: "12 Piece Hampton Dinner Set",
        description:
          "This 12-piece dinner set from the Hampton range is crafted from fine bone china for a luxurious look and feel. Its smart striped design is complemented by delicate gold-tone borders. The set includes four each of bowls, side plates and dinner plates.",
        price: 79.99,
        categories: [home],
      });
      const prod2 = productsRepository.create({
        name: "Midnight Blossom Eau de Toilette 30ml",
        description:
          "Explore the hidden depths of soft, sweet jasmine with a spritz of the Midnight Blossom fragrance from our Discover range. Floral notes meet intriguing tones of tuberose and mandarin, with a warm finish of amber and musk. This product is vegan.",
        price: 6.5,
        categories: [beauty],
      });
      const prod3 = productsRepository.create({
        name: "Winter Coat 001 Black",
        description:
          "Smart and immaculately tailored, this collared mac from our Autograph collection is a sophisticated outerwear choice. It's cut to an easy regular fit, at on-trend short length, and has a concealed button fastening to keep its outline neat. Light padding provides extra warmth and our water-repellent Stormwear™ finish ensures you stay dry during light rain showers. The easily removable quilted lining makes it suitable for year-round wear. Two jetted pockets are useful for storing your personal items. The hanging loop and cuff straps add refined finishing touches. Autograph: premium investment pieces featuring contemporary cuts and refined finishing touches.",
        price: 189.99,
        categories: [clothing],
      });
      const prod4 = productsRepository.create({
        name: "Atomic Habits by James Clear",
        price: 19.99,
        categories: [books],
      });
      const prod5 = productsRepository.create({
        name: "Smart TV",
        price: 2350,
        categories: [electronics],
      });
      const prod6 = productsRepository.create({
        name: "Macbook Pro",
        description: "A powerful machine powered by our new chip",
        price: 1200,
        categories: [computers],
      });
      const prod7 = productsRepository.create({
        name: "Gaming PC",
        description: "Latest generation hardware for the best experience.",
        price: 2000,
        categories: [games],
      });
      const prod8 = productsRepository.create({
        name: "Elswyth Herringbone Quilted Throw",
        price: 195,
        description:
          "Complete your bedding in style with this extra-large throw from Bedeck of Belfast. It features a woven herringbone pattern on one side, and a quilted design on the other for a super-cosy feel.",
        categories: [home],
      });

      await productsRepository.save([
        prod1,
        prod2,
        prod3,
        prod4,
        prod5,
        prod6,
        prod7,
        prod8,
      ]);

      // 4: Creating & Saving Users
      const user1 = usersRepository.create({
        name: "Michael Fink",
        email: "mfink@gmail.com",
        phone: "07790923879",
        password: "Seeding@786",
      });
      const user2 = usersRepository.create({
        name: "Gemma Jennings",
        email: "gemjen@gmail.com",
        phone: "07790923880",
        password: "Seeding@786",
      });
      const user3 = usersRepository.create({
        name: "Ann-Marie Grant",
        email: "amg@gmail.com",
        phone: "07790923881",
        password: "Seeding@786",
      });
      const user4 = usersRepository.create({
        name: "Chris Bown",
        email: "cbown@gmail.com",
        phone: "07790923832",
        password: "Seeding@786",
      });

      await usersRepository.save([user1, user2, user3, user4]);

      // 5: Creating & Saving Order Items

      const orderItem1 = orderItemsRepository.create({
        product: prod1,
        quantity: 1,
        price: prod1.price,
      });
      const orderItem2 = orderItemsRepository.create({
        product: prod1,
        quantity: 1,
        price: prod1.price,
      });
      const orderItem3 = orderItemsRepository.create({
        product: prod2,
        quantity: 4,
        price: prod2.price,
      });
      const orderItem4 = orderItemsRepository.create({
        product: prod3,
        quantity: 1,
        price: prod3.price,
      });
      const orderItem5 = orderItemsRepository.create({
        product: prod4,
        quantity: 3,
        price: prod4.price,
      });
      const orderItem6 = orderItemsRepository.create({
        product: prod5,
        quantity: 1,
        price: prod5.price,
      });
      const orderItem7 = orderItemsRepository.create({
        product: prod6,
        quantity: 2,
        price: prod6.price,
      });
      const orderItem8 = orderItemsRepository.create({
        product: prod8,
        quantity: 5,
        price: prod6.price,
      });
      // 6: Creating Payments

      const payment1 = paymentsRepository.create();

      // 7: Creating & Saving Orders,
      const order1 = ordersRepository.create({
        customer: user1,
        items: [orderItem1, orderItem4, orderItem7],
        status: OrderStatus.AWAITING_DISPATCH,
        payment: payment1,
      });
      const order2 = ordersRepository.create({
        customer: user2,
        items: [orderItem2, orderItem5],
        status: OrderStatus.AWAITING_PAYMENT,
      });
      const order3 = ordersRepository.create({
        customer: user3,
        items: [orderItem5, orderItem6],
        status: OrderStatus.AWAITING_PAYMENT,
      });
      const order4 = ordersRepository.create({
        customer: user3,
        items: [orderItem8, orderItem1],
        status: OrderStatus.AWAITING_DISPATCH,
      });

      await ordersRepository.save([order1, order2, order3, order4]);
    });
  }

  // public async seed() {
  //   const queryRunner = this.dataSource.createQueryRunner();
  //   await queryRunner.connect();
  //   await queryRunner.startTransaction();
  //   try {
  //     await queryRunner.commitTransaction();
  //   } catch (err) {
  //     await queryRunner.rollbackTransaction();
  //     throw new Error(err);
  //   } finally {
  //     await queryRunner.release();
  //   }
  // }
}
