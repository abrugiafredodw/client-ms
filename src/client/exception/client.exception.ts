import {BadRequestException} from "@nestjs/common";


export class ClientException extends BadRequestException {
    constructor(private mensaje: string) {
        super(mensaje);
    }
}