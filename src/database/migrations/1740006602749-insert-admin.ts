import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertAdmin1740006602749 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            INSERT INTO "user"
                ("name","email","password","phone", "role")
            VALUES
                ('admin', 'admin@mail.com', '$2a$12$exlbYvKsLRtLEIse/uLF1uqBXHsvOKLYMTFqiAfwKCbYTa6sVxh3.','72597850','ADMIN')
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DELETE FROM "user"
        WHERE "email" = 'admin@mail.com'
    `);
  }
}
