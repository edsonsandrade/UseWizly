export class Client {
  constructor(
    public clientId: number,
    public name: string,
    public address1: string,
    public address2: string,
    public country: string,
    public stateProvince: string,
    public zipCode: string,
    public creditCardNumber: string,
    public validThru: string,
    public securityCode: string
  ) {}

  newClient() {
    return new Client(0, '', '', '','','','','','','');
  }
}
