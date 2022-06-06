import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './schema/client.schema';
import { ClientRepository } from './repository/client.repository';
import { ClientException } from './exception/client.exception';

@Injectable()
export class ClientService {
  constructor(private readonly clientRepository: ClientRepository) {}

  async create(createClientDto: CreateClientDto): Promise<Client> {
    try {
      const options = {
        mail: createClientDto.mail,
      };
      const client = await this.clientRepository.findOne(options);
      if (client != null) {
        throw new ClientException(
          `El cliente con el mail ${createClientDto.mail} ya se encuentra registrado`,
        );
      }
      return await this.clientRepository.createClients(createClientDto);
    } catch (Error: any) {
      throw Error;
    }
  }

  async findAll(options?: any): Promise<Client[]> {
    return this.clientRepository.findAll(options);
  }

  async findOne(options: any): Promise<Client> {
    try {
      const client = await this.clientRepository.findOne(options);
      if (client == null) {
        throw new ClientException(`El cliente no existe`);
      }
      return client;
    } catch (Error: any) {
      throw Error;
    }
  }

  async update(updateClientDto: UpdateClientDto): Promise<Client> {
    try {
      const options = {
        _id: updateClientDto._id,
      };
      const client = await this.clientRepository.findOne(options);
      if (client == null) {
        throw new ClientException(
          `El cliente que intentas modificar no existe`,
        );
      }
      return this.clientRepository.updateClients(updateClientDto);
    } catch (Error: any) {
      throw Error;
    }
  }

  async remove(id: string): Promise<Client> {
    try {
      const options = {
        _id: id,
      };
      const client = await this.clientRepository.findOne(options);
      if (client == null) {
        throw new ClientException(`El cliente que intentas eliminar no existe`);
      }
      const updateCliente: UpdateClientDto = {
        _id: id,
        name: client.name,
        mail: client.mail,
        avail: false,
      };
      return await this.clientRepository.updateClients(updateCliente);
    } catch (Error: any) {
      throw Error;
    }
  }
}
