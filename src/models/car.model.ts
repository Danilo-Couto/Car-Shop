import { Schema, model as createModel, Document } from 'mongoose';
import { Car } from '../interfaces/CarInterface';
import MongoModel from './mongo.model';

export interface CarDocument extends Car, Document { }

export const carSchema = new Schema<CarDocument>(
  {
    model: String,
    year: Number,
    color: String,
    status: Boolean,
    buyValue: Number, 
    doorsQty: Number,
    seatsQty: Number,
  },
  {
    versionKey: false,
  },
);

export const CarMongooseModel = createModel('Cars', carSchema);

class CarModel extends MongoModel<Car> {
  constructor(model = CarMongooseModel) {
    super(model);
  }
}

export default CarModel;