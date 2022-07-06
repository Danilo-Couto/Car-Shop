import { Schema, model } from 'mongoose';

export interface Vehicle {
  model: string,
  year: number,
  color: string,
  status?: boolean,
  buyValue: number
}

const vehicleSchema = new Schema({
  model: {
    type: String, required: true, min: 3,
  },
  year: {
    type: Number,
    required: true,
    min: 1900,
    max: 2022,
  },
  color: {
    type: String, required: true, min: 3,
  },
  status: {
    type: Boolean, required: true,
  },
  buyValue: {
    type: Number, required: true, integer: true,
  },
});

export const vehicleMongooseModel = model('vehicle', vehicleSchema);
