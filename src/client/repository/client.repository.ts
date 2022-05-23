import { Injectable } from '@nestjs/common';
import {Model} from "mongoose";
import {InjectModel} from "@nestjs/mongoose";
import {Client, ClientDocument} from "../schema/client.schema";
import {CreateClientDto} from "../dto/create-client.dto";
import {UpdateClientDto} from "../dto/update-client.dto";

@Injectable()
export class ClientRepository {
  constructor(@InjectModel(Client.name) private readonly  clientMD:Model<ClientDocument>) {
  }

  async createClients(createClients:CreateClientDto):Promise<Client>{
    const clientCreate=new this.clientMD(createClients);
    return  clientCreate.save();
  }

  async updateClients(updateClient:UpdateClientDto):Promise<Client>{
    const clientCreate=new this.clientMD(updateClient);
    return  clientCreate.save();
  }

  async findAll(): Promise<Client[]> {
    return this.clientMD.find().exec();
  }

  async findOne(options?:any): Promise<Client> {
    return  this.clientMD.findOne(options).exec();
  }


  async deleteClient(id:string):Promise<Client>{
    return this.clientMD.findByIdAndRemove(id);
  }
}
