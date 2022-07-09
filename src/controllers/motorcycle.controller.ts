import { Request, Response } from 'express';
import { isValidObjectId } from 'mongoose';
import Controller, { RequestWithBody, ResponseError } from '.';
import { Motorcycle } from '../interfaces/MotorcycleInterface';
import Service from '../services';
import MotorcycleService from '../services/motorcycle.service';

export default class MotorcycleController extends Controller<Motorcycle> {
  private _route: string;

  constructor(
    service: Service<Motorcycle> = 
    new MotorcycleService(),
    route = '/motorcycles',
  ) {
    super(service);
    this._route = route;
  }

  get route() { return this._route; }
  
  create = async (
    req: RequestWithBody<Motorcycle>,
    res: Response<Motorcycle | ResponseError>,
  ): Promise<typeof res> => {
    const { body } = req;

    try {
      const motorcycle = await this.service.create(body);

      if (!motorcycle) {
        return res.status(400)
          .json({ error: this.errors.notFound });
      }
      if ('error' in motorcycle) return res.status(400).json(motorcycle);
     
      return res.status(201).json(motorcycle);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: this.errors.internal }); 
    }
  };

  read = async (
    _req: Request,
    res: Response<Motorcycle[] | ResponseError>,
  ): Promise<typeof res> => {
    try {
      const motorcycles = await this.service.read();
      return motorcycles
        ? res.status(200).json(motorcycles)
        : res.status(404).json([]);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  readOne = async (
    req: Request<{ id: string }>,
    res: Response<Motorcycle | ResponseError>,
  ): Promise<typeof res> => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ error: this.errors.minChar });
    }

    try {
      const motorcycle = await this.service.readOne(id);
      return motorcycle
        ? res.status(200).json(motorcycle)
        : res.status(404).json({ error: this.errors.notFound });
    } catch (error) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  update = async (
    req: Request<{ id: string }>,
    res: Response<Motorcycle | ResponseError>,
  ): Promise<typeof res> => {
    try {
      const { id } = req.params;
      const { body } = req;

      if (!this.isReqsValids(id, body)) {
        return res.status(400).json({ error: this.errors.minChar });
      }

      const motorcycle = await this.service.update(id, body);

      if (motorcycle === null) {
        return res.status(404).json({ error: this.errors.notFound });
      }
      if ('error' in motorcycle) return res.status(400).json(motorcycle);
      
      return res.status(200).json(motorcycle);
    } catch (err) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  delete = async (
    req: Request<{ id: string; }>,
    res: Response<Motorcycle | ResponseError>,
  ): Promise<typeof res> => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ error: this.errors.minChar });
    }
    try {
      const motorcycle = await this.service.delete(id);
      return motorcycle
        ? res.status(204).json(motorcycle)
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
