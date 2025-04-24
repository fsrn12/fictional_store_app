import { Injectable } from "@nestjs/common";
import bcrypt from "bcrypt";
import { HashingProvider } from "./hashing.provider.js";

@Injectable()
export class BcryptProvider implements HashingProvider {
  public async hash(data: string | Buffer): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(data, salt);
  }

  public async compare(
    data: string | Buffer,
    encrypted: string,
  ): Promise<boolean> {
    return await bcrypt.compare(data, encrypted);
  }
}
