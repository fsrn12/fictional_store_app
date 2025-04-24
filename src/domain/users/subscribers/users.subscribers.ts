import { HashingProvider } from "@/auth/hashing/hashing.provider.js";
import {
  DataSource,
  type EntitySubscriberInterface,
  EventSubscriber,
  type InsertEvent,
  type UpdateEvent,
} from "typeorm";
import { User } from "../entities/user.entity.js";

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  constructor(
    private readonly dataSource: DataSource,
    private readonly hashingProvider: HashingProvider,
  ) {
    this.dataSource.subscribers.push(this);
  }
  listenTo() {
    return User;
  }

  public async beforeInsert(event: InsertEvent<User>) {
    const { entity: user } = event;
    user.password = await this.hashingProvider.hash(user.password);
  }

  public async beforeUpdate(event: UpdateEvent<User>) {
    const { entity, databaseEntity: databaseUser } = event;
    const user = entity as User;

    if (user.password !== databaseUser.password) {
      user.password = await this.hashingProvider.hash(user.password);
    }
  }
}
