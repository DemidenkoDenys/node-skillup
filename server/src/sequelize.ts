const Sequelize = require('sequelize-typescript');

export default class SequelizeDB {
  connection: any;

  constructor() {}

  config() {
    this.connection = new Sequelize({
      database: 'api',
      dialect: 'postgres',
      username: 'postgres',
      password: '1',
      storage: ':memory:',
      models: [__dirname + '/models'],
    });
  }
}
