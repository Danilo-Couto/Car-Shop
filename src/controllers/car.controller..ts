import { Request, Response } from 'express';
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

  get route() {
    return this._route;
  }
  
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

  // readOne = async (
  //   req: Request<{ id: string; }>,
  //   res: Response<Car | ResponseError>,
  // ): Promise<typeof res> => {
  //   const { id } = req.params;
  //   try {
  //     const car = await this.service.readOne(id);
  //     return car
  //       ? res.json(car).json(car)
  //       : res.status(404).json({ error: this.errors.notFound });
  //   } catch (error) {
  //     return res.status(500).json({ error: this.errors.internal });
  //   }
  // };

  update = async (
    req: RequestWithBody<Car>,
    res: Response<Car | ResponseError>,
  ): Promise<typeof res> => {
    const { id } = req.params;

    if (!id) return res.status(400).json({ error: this.errors.requiredId });
    // if (id.length < 24) retutn.status(404).json({ error: 'Id must have 24 hexadecimal characters ' });

    try {
      const { body } = req;
      const car = await this.service.update(id, body);

      if (!car) return res.status(400).json({ error: this.errors.notFound });
      if ('error' in car) return res.status(400).json(car);

      return res.status(200).json(car);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: this.errors.internal });
    }
  };
}
