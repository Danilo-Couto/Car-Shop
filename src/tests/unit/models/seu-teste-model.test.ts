import { Model } from "mongoose";
import { Car } from "../../../interfaces/CarInterface";
import CarModel from "../../../models/car.model";

const inserCar = {
    model: 'Ferrari Maranello',
    year: 1963,
    color: 'red',
    buyValue: 3500000,
    seatsQty: 2,
    doorsQty: 2
};

describe('Inser CarModel', ()=>{
    let carModel: CarModel;
    let mongooseModelMock = {
        create: (car: any) => {
            return {
                ...car, 
                _id: {
                    $oid: 'id'
                }
            }
        }
    } as Model<Car>
    before(()=>{
        carModel = new CarModel();
    })

    describe('test create fucntion', ()=>{
        it('retorna um objeto com _id', async() => {
            const car = await carModel.create(inserCar);
        expect(car).to.have.property('_id')
        })
    })
})