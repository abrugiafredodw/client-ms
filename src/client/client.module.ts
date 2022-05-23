import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { ClientRepository } from './repository/client.repository';
import {MongooseModule} from "@nestjs/mongoose";
import {Client, ClientSchema} from "./schema/client.schema";

@Module({
  imports:[MongooseModule.forFeature([{name:Client.name,schema:ClientSchema}])],
  controllers: [ClientController],
  providers: [ClientService, ClientRepository],
})
export class ClientModule {}
