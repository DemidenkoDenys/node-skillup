import Server from './server';
import Clients from './clients';
import SequelizeDB from './sequelize';

const clients = new Clients();
const server = new Server(clients);
const sequelize = new SequelizeDB();

server.create();
server.start();

sequelize.config();
sequelize.connection.sync();