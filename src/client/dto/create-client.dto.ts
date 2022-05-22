export class CreateClientDto {
  private _name: string;
  private _mail: string;
  private _avail: boolean;

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get mail(): string {
    return this._mail;
  }

  set mail(value: string) {
    this._mail = value;
  }

  get avail(): boolean {
    return this._avail;
  }

  set avail(value: boolean) {
    this._avail = value;
  }
}
