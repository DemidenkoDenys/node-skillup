import { Table, Model, Column } from "sequelize-typescript";

@Table
class User extends Model<User> {
 
  @Column
  get name(): string {
    return 'My name is ' + this.getDataValue('name');
  }
 
  set name(value: string) {
    this.setDataValue('name', value);
  }
}