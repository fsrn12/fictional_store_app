import { LoginDto } from "@/auth/dto/login.dto.js";
import { HashingProvider } from "@/auth/hashing/hashing.provider.js";
import { ROLE } from "@/auth/roles/enums/role.enum.js";
import { isCurrentUser } from "@/auth/utils/authorization.util.js";
import { PaginationDto } from "@/querying/dto/pagination.dto.js";
import { PaginationService } from "@/querying/pagination.service.js";
import { DefaultPageSize } from "@/querying/util/querying.constants.js";
import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RequestUser } from "auth/interfaces/request-user.interface.js";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto.js";
import { UpdateUserDto } from "./dto/update-user.dto.js";
import { User } from "./entities/user.entity.js";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>,
    private readonly hashingProvider: HashingProvider,
    private readonly paginationService: PaginationService,
  ) {}

  /** Create new user */
  public async create(createUserDto: CreateUserDto) {
    const user = this.repo.create(createUserDto);
    return await this.repo.save(user);
  }

  /** Find all users */
  public async findAll(paginationDto: PaginationDto) {
    const { page } = paginationDto;
    const limit = paginationDto.limit ?? DefaultPageSize.USERS;
    const offset = this.paginationService.calculateOffset(limit, page);
    const [data, count] = await this.repo.findAndCount({
      skip: offset,
      take: limit,
    });

    const meta = this.paginationService.createMeta(limit, page, count);
    return { data, meta };
  }

  /** Find one user */
  public findOne(id: number): Promise<User> {
    return this.repo.findOneOrFail({
      where: { id },
      relations: { orders: { items: true, payment: true } },
    });
  }

  // public async findOneByEmail(options: unknown): Promise<User> {
  //   return await this.repo.findOne(options);
  // }

  /** Update user by id */
  public async update(
    id: number,
    updateUserDto: UpdateUserDto,
    currentUser: RequestUser,
  ): Promise<User> {
    if (currentUser.role !== ROLE.ADMIN) {
      isCurrentUser(currentUser.id, id);
    }
    const user = await this.repo.preload({
      id,
      ...updateUserDto,
    });
    if (!user) {
      throw new NotFoundException("No user found");
    }
    return await this.repo.save(user);
  }

  /** Remove/Delete User */
  public async remove(id: number, currentUser: RequestUser, soft: boolean) {
    if (currentUser.role !== ROLE.ADMIN) {
      isCurrentUser(currentUser.id, id);
      if (!soft) {
        throw new ForbiddenException("Forbidden resource");
      }
    }
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException("No user found");
    }
    return soft ? this.repo.softRemove(user) : this.repo.remove(user);
  }

  /** Recover a deleted user */
  public async recover(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.repo.findOne({
      where: { email },
      relations: {
        orders: {
          items: true,
          payment: true,
        },
      },
      withDeleted: true,
    });

    if (!user) {
      throw new NotFoundException("No user found");
    }

    const doPasswordsMatch = await this.hashingProvider.compare(
      password,
      user.password,
    );

    if (!doPasswordsMatch) {
      throw new UnauthorizedException("Invalid login attempt");
    }

    if (!user.isDeleted) {
      throw new ConflictException("User is active. Please login");
    }

    return await this.repo.recover(user);
  }
}
