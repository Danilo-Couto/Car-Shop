import { expect } from 'chai';
import Sinon, { SinonStub } from 'sinon';
import CarModel, { CarMongooseModel } from '../../../models/car.model';
import CarService from '../../../services/car.service';
import { carMock, carMockUpdated, validId } from '../mocks/carMocks';

describe('Tests Service', () => {
    describe('Test Create Method', () => {
    const carModel = new CarModel(CarMongooseModel);
    const carService = new CarService(carModel);
    
    before(() => {
      Sinon.stub(carModel, 'create').resolves(carMock);
    });
  
    after(() => {
      (carModel.create as SinonStub).restore();
    });
  
    it('Success', async () => {
      const cars = await carService.create(carMock);
      expect(cars).to.be.deep.equal(carMock);
    });
  });

  describe('Test Read Method', () => {
    const carModel = new CarModel(CarMongooseModel);
    const carService = new CarService(carModel);

    before(() => {
      Sinon.stub(carModel, 'read').resolves([carMock]);
    });
  
    after(() => {
      (carModel.read as SinonStub).restore();
    });
  
    it('Success', async () => {
      const car = await carService.read();
      expect(car).to.be.deep.equal([carMock]);
    });
  });

  describe('Test ReadOne Method', () => {
    const carModel = new CarModel(CarMongooseModel);
    const carService = new CarService(carModel);

    before(() => {
      Sinon.stub(carModel, 'readOne').resolves(carMock);
    });
  
    after(() => {
      (carModel.readOne as SinonStub).restore();
    });
  
    it('Success', async () => {
      const car = await carService.readOne(validId);
      expect(car).to.be.deep.equal(carMock);
    });
  });

  describe('Test Update Method', () => {
    const carModel = new CarModel(CarMongooseModel);
    const carService = new CarService(carModel);

    before(() => {
      Sinon.stub(carModel, 'update').resolves(carMockUpdated);
    });
  
    after(() => {
      (carModel.update as SinonStub).restore();
    });
  
    it('Success', async () => {
      const car = await carService.update(validId, carMockUpdated);
      expect(car).to.be.deep.equal(carMockUpdated);
    });
  });

  describe('Test Delete Method', () => {
    const carModel = new CarModel(CarMongooseModel);
    const carService = new CarService(carModel);
    
    before(() => {
      Sinon.stub(carModel, 'delete').resolves(null);
    });
  
    after(() => {
      (carModel.delete as SinonStub).restore();
    });
  
    it('Success', async () => {
      const car = await carService.delete(validId);
      expect(car).to.be.deep.equal(null);
    });
  });
});
    