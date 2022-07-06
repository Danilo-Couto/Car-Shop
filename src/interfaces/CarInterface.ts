import { Schema, model } from 'mongoose';
import { Vehicle } from './VehicleInterface';

export interface Car extends Vehicle {
  doorsQty: number,
  seatsQty: number,
}

const carSchema = new Schema({
  doorsQty: {
    type: Number, required: true, min: 2, max: 4,
  },
  seatsQty: {
    type: Number, required: true, min: 2, max: 7,
  },
});

export const carMongooseModel = model('Car', carSchema);
