import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientService {
  create(createClientDto: CreateClientDto) {
    return 'This action adds a new client';
  }

  findAll() {
    return `This action returns all client`;
  }

  findOne(options: any) {
    return `This action returns a #${options} client`;
  }

  update(updateClientDto: UpdateClientDto) {
    return `This action updates a #${updateClientDto} client`;
  }

  remove(id: string) {
    return `This action removes a #${id} client`;
  }
}
