import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { MockRepository, createMock } from "../../testing/utils/testing.util";
import { User } from "./entities/user.entity";
import { UsersService } from "./users.service";

describe("UsersService", () => {
  let service: UsersService;
  let repository: MockRepository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: createMock(),
        },
      ],
    }).compile();
    service = module.get(UsersService);
    repository = module.get(getRepositoryToken(User));
  });

  it("should be defined", () => {
    expect(service).toBeDefined;
  });
});
