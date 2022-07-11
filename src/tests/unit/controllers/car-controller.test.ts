import * as sinon from 'sinon';
import chai from 'chai';
import chaiHttp = require('chai-http');
import { Request, Response } from 'express';
import CarController from '../../../controllers/car.controller';
import CarModel, { CarMongooseModel } from '../../../models/car.model';
import CarService from '../../../services/car.service';
import { carMock, carMockUpdated, validId } from '../mocks/carMocks';
import Sinon = require('sinon');

chai.use(chaiHttp);

const { expect } = chai;

const carModel = new CarModel(CarMongooseModel);
const carService = new CarService(carModel);
const carController = new CarController(carService)

describe('Tests Car Controller', () => {
    describe('Tests Create method', () => {
        const req = {} as Request;
        const res = {} as Response;

        before(async () => {
            Sinon.stub(carService, 'create').resolves(carMock);
            // req.body = {carMock};
            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns(res);   
        });
        after(() => {
            (carService.create as sinon.SinonStub).restore();
          });

      it('Success', async () => {
        await carController.create(req, res)
        expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
        expect((res.json as sinon.SinonStub).calledWith(carMock)).to.be.true;
        });
    });

    describe('Tests Read Method', () => {     
        const req = {} as Request;
        const res = {} as Response;

        before(async () => {
            Sinon.stub(carService, 'read').resolves([carMock]);
            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns(res);   
        });    
        after(() => {
            (carService.read as sinon.SinonStub).restore();
          }); 

        it('Success', async () => {
            await carController.read(req, res)
            expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
            expect((res.json as sinon.SinonStub).calledWith([carMock])).to.be.true;
        });
    });

    describe('Tests ReadOne Method', () => {
        const req = { params: { id: validId } } as any;
        const res = {} as Response;

        before(async () => {
            Sinon.stub(carService, 'readOne').resolves(carMock);
            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns(res);   
        });
        after(() => {
            (carService.readOne as sinon.SinonStub).restore();
          }); 
        
        it('Success', async () => {
            await carController.readOne(req, res)
            expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
            expect((res.json as sinon.SinonStub).calledWith(carMock)).to.be.true;
        });
    });

    describe('Tests Update Method', () => {
        const req = { params: { id: validId } } as any;
        const res = {} as Response;
        req.body = {carMockUpdated};

        before(async () => {
            Sinon.stub(carService, 'update').resolves(carMockUpdated);
            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns(res);   
        });
        after(() => {
            (carService.update as sinon.SinonStub).restore();
          }); 
        
        it('Success', async () => {
            await carController.update(req, res)
            expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
            expect((res.json as sinon.SinonStub).calledWith(carMockUpdated)).to.be.true;
        });
    });

    describe('Tests Delete Method', () => {
        const req = { params: { id: validId } } as any;
        const res = {} as Response;

        before(async () => {
            Sinon.stub(carService, 'delete').resolves(carMock);
            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns(res);   
        });
        after(() => {
            (carService.delete as sinon.SinonStub).restore();
          }); 
        
        it('Success', async () => {
            await carController.delete(req, res)
            expect((res.status as sinon.SinonStub).calledWith(204)).to.be.true;
            expect((res.json as sinon.SinonStub).calledWith(carMock)).to.be.true;
        });
    });
})
