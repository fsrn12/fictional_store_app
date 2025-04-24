import { User } from "@/domain/users/entities/user.entity.js";
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { HashingProvider } from "./hashing/hashing.provider.js";
import { JwtPayload } from "./interfaces/jwt-payload.interface.js";
import { RequestUser } from "./interfaces/request-user.interface.js";
import { ROLE } from "./roles/enums/role.enum.js";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    private readonly hashingProvider: HashingProvider,
    private readonly jwtService: JwtService,
  ) {}

  /*
   * Login Credential Validation
   */
  public async validateLocal(email: string, password: string) {
    const user = await this.usersRepository.findOne({
      where: { email },
      select: {
        id: true,
        password: true,
        // email: true,
      },
    });
    if (!user) {
      throw new BadRequestException("User does not exist");
    }

    const doPasswordsMatch = await this.hashingProvider.compare(
      password,
      user.password,
    );

    if (!doPasswordsMatch) {
      throw new UnauthorizedException("Invalid login attempt.");
    }
    // const requestUser: RequestUser = {
    //   id: user.id,
    //   email,
    //   role: ROLE.USER,
    // };
    const requestUser = this.createRequestUser({ ...user, email });
    return requestUser;
  }

  /*
   * JWT Validation
   */
  public async validateJwt(payload: JwtPayload) {
    //1: Check if user still exists
    const { sub: id } = payload;
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new UnauthorizedException("Invalid login attempt");
    }
    // const userRequest: RequestUser = {
    //   id,
    //   email: user.email,
    //   role: ROLE.USER,
    // };
    const requestUser = this.createRequestUser(user);
    return requestUser;
  }

  public login(user: RequestUser) {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
    };
    const token = this.jwtService.sign(payload);
    return token; // returning it like this for my own sanity
  }

  /*
   * Get User Profile
   */
  public getProfile(id: number) {
    return this.usersRepository.findOneBy({ id });
  }

  /*
   * Assign User Roles
   */
  public async assignRole(id: number, role: ROLE) {
    const user = await this.usersRepository.preload({ id, role });
    if (!user) {
      throw new NotFoundException("No user found");
    }
    return this.usersRepository.save(user);
  }

  private createRequestUser(user: RequestUser): RequestUser {
    const { id, email, role } = user;
    return {
      id,
      email,
      role,
    } as const satisfies RequestUser;
  }
}
