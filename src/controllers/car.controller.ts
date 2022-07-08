import { Request, Response } from 'express';
import { isValidObjectId } from 'mongoose';
import Controller, { RequestWithBody, ResponseError } from '.';
import { Car } from '../interfaces/CarInterface';
import Service from '../services';
import CarService from '../services/car.service';

export default class CarController extends Controller<Car> {
  private _route: string;

  constructor(service: Service<Car> = new CarService(), route = '/cars') {
    super(service);
    this._route = route;
  }

  get route() { return this._route; }
  
  create = async (
    req: RequestWithBody<Car>,
    res: Response<Car | ResponseError>,
  ): Promise<typeof res> => {
    const { body } = req;

    try {
      const car = await this.service.create(body);

      if (!car) return res.status(400).json({ error: this.errors.notFound });
      if ('error' in car) return res.status(400).json(car);
     
      return res.status(201).json(car);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: this.errors.internal }); 
    }
  };

  read = async (
    _req: Request,
    res: Response<Car[] | ResponseError>,
  ): Promise<typeof res> => {
    try {
      const cars = await this.service.read();
      return cars
        ? res.status(200).json(cars)
        : res.status(404).json([]);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  readOne = async (
    req: Request<{ id: string }>,
    res: Response<Car | ResponseError>,
  ): Promise<typeof res> => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ error: this.errors.minChar });
    }

    try {
      const car = await this.service.readOne(id);
      return car
        ? res.status(200).json(car)
        : res.status(404).json({ error: this.errors.notFound });
    } catch (error) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  update = async (
    req: Request<{ id: string }>,
    res: Response<Car | ResponseError>,
  ): Promise<typeof res> => {
    try {
      const { id } = req.params;
      const { body } = req;

      if (!this.isReqsValids(id, body)) {
        return res.status(400).json({ error: this.errors.minChar });
      }

      const car = await this.service.update(id, body);

      if (car === null) {
        return res.status(404).json({ error: this.errors.notFound });
      }
      if ('error' in car) return res.status(400).json(car);
      
      return res.status(200).json(car);
    } catch (err) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  delete = async (
    req: Request<{ id: string; }>,
    res: Response<Car | ResponseError>,
  ): Promise<typeof res> => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ error: this.errors.minChar });
    }
    try {
      const car = await this.service.delete(id);
      return car
        ? res.status(204).json(car)
        : res.status(404).json({ error: this.errors.notFound });
    } catch (error) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  private isReqsValids = (id: string, body: unknown) => {
    if ([id, body].some((arg: unknown) => !arg)) return false;
    if (!isValidObjectId(id)) return false;
    return true;
  };
}
