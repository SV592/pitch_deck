import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { ConfigService } from "@nestjs/config";
import { User } from "../auth/user.entity";
import { Deck } from "../deck/deck.entity";
import { Slide } from "../deck/slide.entity";

export const getDatabaseConfig = (
  configService: ConfigService
): TypeOrmModuleOptions => {
  

  return {
    type: "postgres",
    url: configService.get<string>("DATABASE_URL"),
    entities: [User, Deck, Slide], // Make sure all entities are here
    synchronize: true,
    ssl: {
      rejectUnauthorized: false,
    },
    logging: configService.get<string>("NODE_ENV") === "development",
  };
};
