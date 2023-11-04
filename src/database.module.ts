import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Todo } from "./todo/todo.entity";
import { User } from "./auth/user.entity";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({  
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get('DB_HOST'),
        port: config.get('DB_PORT'),
        username: config.get('DB_USERNAME'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_DATABASE'),
        entities: [Todo, User],
        synchronize: true,
        charset: 'utf8_general_ci',
      }),
    }),
  ],
})
export class DatabaseModule { }