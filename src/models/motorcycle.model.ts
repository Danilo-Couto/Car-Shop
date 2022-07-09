import { Schema, model as createModel, Document } from 'mongoose';
import { Motorcycle } from '../interfaces/MotorcycleInterface';
import MongoModel from './mongo.model';

export interface MotorcycleDocument extends Motorcycle, Document { }

export const motorcycleSchema = new Schema<MotorcycleDocument>(
  {},
  {
    versionKey: false,
  },
);

export const 
  MotorcycleMongooseModel = createModel('Motorcycle', motorcycleSchema);

class MotorcycleModel extends MongoModel<Motorcycle> {
  constructor(model = MotorcycleMongooseModel) {
    super(model);
  }
}

export default MotorcycleModel;