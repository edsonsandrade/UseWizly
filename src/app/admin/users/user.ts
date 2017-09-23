export class User {

  constructor(
    public userId: number,
    public client: number,
    public name: string,
    public login: string,
    public password: string,
    public userLanguage: string,
    public image: string,
    public email: string,
    public altEmail: string,
    public passwordTip: string,
    public active: boolean
  ) {}
}
