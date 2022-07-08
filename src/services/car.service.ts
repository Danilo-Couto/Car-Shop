import { Car, CarSchema } from '../interfaces/CarInterface';
import { ServiceError } from '../interfaces/ServiceInterface';
import Service from '.';
import CarModel from '../models/car.model';

class CarService extends Service<Car> {
  constructor(model = new CarModel()) {
    super(model);
  }

  public async create(obj: Car): Promise<Car | ServiceError | null> {
    const parsed = CarSchema.safeParse(obj);
    
    if (!parsed.success) return { error: parsed.error };
    return this.model.create(obj);
  }
  
  public async update(
    id: string,
    obj: Car,
  ): Promise<Car | ServiceError | null> {
    const parsed = CarSchema.safeParse(obj);

    if (!parsed.success) return { error: parsed.error };
    return this.model.update(id, obj);
  }
}

export default CarService;
