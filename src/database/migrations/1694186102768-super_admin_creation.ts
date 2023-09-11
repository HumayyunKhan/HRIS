import {MigrationInterface, QueryRunner} from "typeorm";
import * as bcrypt from 'bcrypt';
const password="12345"
export class SuperAdminCreation1694186102768 implements MigrationInterface {
    
    public async up(queryRunner: QueryRunner): Promise<void> {
        const hash= await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS));
      const user= await queryRunner.query(`INSERT INTO users (name, email ,password)
       VALUES ('super','superadmin@gmail.com', '${hash}');`)
      console.log(user,"---------")
      const userRole= await queryRunner.query(`INSERT INTO user_roles (userId, role)
      VALUES ('${user.insertId}','SUPERADMIN');`)
      const verification= await queryRunner.query(`INSERT INTO verifications (userId, verified, code )
      VALUES ('${user.insertId}',1, '0000');`)
  
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
