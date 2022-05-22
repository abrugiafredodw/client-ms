import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientService.create(createClientDto);
  }

  @Get()
  findAll() {
    return this.clientService.findAll();
  }

  @Get(':mail')
  findOne(@Param('mail') mail: string) {
    const options = {
      mail: mail,
    };
    return this.clientService.findOne(options);
  }

  @Get(':mail/avail')
  findOneAvail(@Param('mail') mail: string) {
    const options = {
      mail: mail,
      avail: true,
    };
    return this.clientService.findOne(options);
  }

  @Patch()
  update(@Body() updateClientDto: UpdateClientDto) {
    return this.clientService.update(updateClientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientService.remove(id);
  }
}
