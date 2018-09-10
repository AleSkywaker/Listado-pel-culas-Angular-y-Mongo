export class User {
  constructor(
    public _id: String,
    public name: String,
    public surname: String,
    public nick: String,
    public email: String,
    public create_at: String,
    public password: String,
    public password2: String,
    public description: String,
    public genero: String,
    public dateOfBirth: String,
    public role: String
  ) { }
}