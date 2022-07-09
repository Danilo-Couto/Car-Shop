import { expect } from 'chai';
import mongoose from 'mongoose';
import Sinon, { SinonStub } from 'sinon';
import CarModel, { CarMongooseModel } from '../../../models/car.model';
import { carMock, carMockUpdated, validId } from '../mocks/carMocks';

describe('Tests Model', () => {
    describe('success', () => {
      before(() => {
        Sinon.stub(mongoose.Model, 'create').resolves(carMock);
      });
  
      after(() => {
        (mongoose.Model.create as SinonStub).restore();
      })
  
      it('success', async () => {
        const carModel = new CarModel(CarMongooseModel)
        const carCreated = await carModel.create(carMock);
        expect(carCreated).to.be.deep.equal(carMock);
      })
    })

    describe('Tests Find method', () => {
        before(() => {
          Sinon.stub(mongoose.Model, 'find').resolves([carMock]);
        });
    
        after(() => {
          (mongoose.Model.find as SinonStub).restore();
        })
    
        it('success', async () => {
          const carModel = new CarModel(CarMongooseModel)
          const car = await carModel.read();
          expect(car).to.be.deep.equal([carMock]);
        })
      })

    describe('Tests FindOne method', () => {
    before(() => {
        Sinon.stub(mongoose.Model, 'findOne').resolves(carMock);
    });

    after(() => {
        (mongoose.Model.findOne as SinonStub).restore();
    })

    it('success', async () => {
        const carModel = new CarModel(CarMongooseModel)
        const car = await carModel.readOne(validId);
        expect(car).to.be.deep.equal(carMock);
        })
    })

describe('Tests Update method', () => {
    before(() => {
        Sinon.stub(mongoose.Model, 'findOneAndUpdate').resolves(carMockUpdated);
    });

    after(() => {
        (mongoose.Model.findOneAndUpdate as SinonStub).restore();
    })

    it('success', async () => {
        const carModel = new CarModel(CarMongooseModel)
        const car = await carModel.update(validId, carMockUpdated);
        expect(car).to.be.deep.equal(carMockUpdated);
        })
    })

describe('Tests Delete method', () => {
    before(() => {
        Sinon.stub(mongoose.Model, 'findOneAndDelete').resolves(null);
    });

    after(() => {
        (mongoose.Model.findOneAndDelete as SinonStub).restore();
    })

    it('success', async () => {
        const carModel = new CarModel(CarMongooseModel)
        const car = await carModel.delete(validId);
        expect(car).to.be.deep.equal(null);
        })
    })
})