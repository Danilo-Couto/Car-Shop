import { ServiceError } from '../interfaces/ServiceInterface';
import Service from '.';
import { Motorcycle,
  MotorcycleSchema } from '../interfaces/MotorcycleInterface';
import MotorcycleModel from '../models/motorcycle.model';

class MotorcycleService extends Service<Motorcycle> {
  constructor(model = new MotorcycleModel()) {
    super(model);
  }

  public async create(obj: Motorcycle):
  Promise<Motorcycle | ServiceError | null> {
    const parsed = MotorcycleSchema.safeParse(obj);
    
    if (!parsed.success) return { error: parsed.error };
    return this.model.create(obj);
  }
  
  public async update(
    id: string,
    obj: Motorcycle,
  ): Promise<Motorcycle | ServiceError | null> {
    const parsed = MotorcycleSchema.safeParse(obj);

    if (!parsed.success) return { error: parsed.error };
    return this.model.update(id, obj);
  }
}

export default MotorcycleService;
