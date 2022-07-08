import CustomRouter from './routes/Router';
import App from './app';
import { Car } from './interfaces/CarInterface';
import CarController from './controllers/car.controller';

const server = new App();

const carController = new CarController();

const carRouter = new CustomRouter<Car>();

carRouter.addRoute(carController);

server.addRouter(carRouter.router);
// server.addMidlleware();

export default server;
