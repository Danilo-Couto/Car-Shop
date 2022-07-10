import * as sinon from 'sinon';
import chai from 'chai';
import chaiHttp = require('chai-http');
import { Request, Response } from 'express';
import CarController from '../../../controllers/car.controller';
import CarModel, { CarMongooseModel } from '../../../models/car.model';
import CarService from '../../../services/car.service';
import { carMock, validId } from '../mocks/carMocks';
import Sinon = require('sinon');
import { beforeEach } from 'mocha';

chai.use(chaiHttp);

const { expect } = chai;

const carModel = new CarModel(CarMongooseModel);
const carService = new CarService(carModel);
const carController = new CarController(carService)

const req = {} as Request;
const res = {} as Response;

describe('Tests Car Controller', () => {
    beforeEach(async () => {
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns(res);   
    });

    describe('Tests Create method', () => {
        req.body = {carMock};
        Sinon.stub(carService, 'create').resolves(carMock);

      it('Success', async () => {
        await carController.create(req, res)
        expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
        expect((res.json as sinon.SinonStub).calledWith(req.body)).to.be.true;
        });
    });

    describe('Tests Read Method', () => {      
        Sinon.stub(carService, 'read').resolves([carMock]);

        it('Success', async () => {
            await carController.read(req, res)
            expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
            expect((res.json as sinon.SinonStub).calledWith([carMock])).to.be.true;
        });
    });

    // describe('Tests ReadOne Method', () => {
    //     const req = {} as Request;
    //     const res = {} as Response;
    
    //     before(() => {
    //       res.status = sinon.stub().returns(res);
    //       res.json = sinon.stub().returns(res);
    //     });
        
    //     Sinon.stub(carService, 'readOne').resolves(carMock);
    //     req.params = {validId };
       
    //     it('Success', async () => {
    //         await carController.readOne(req, res)
    //         expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
    //         expect((res.json as sinon.SinonStub).calledWith([carMock])).to.be.true;
    //     });
    // });


    // describe('Tests Update Method', () => {      
    //     Sinon.stub(carService, 'update').resolves(carMock);

    //     it('Success', async () => {
    //         await carController.update(req, res)
    //         expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
    //         expect((res.json as sinon.SinonStub).calledWith([carMock])).to.be.true;
    //     });
    // });


    // describe('Tests Read Method', () => {      
    //     Sinon.stub(carService, 'delete').resolves(carMock);

    //     it('Success', async () => {
    //         await carController.delete(req, res)
    //         expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
    //         expect((res.json as sinon.SinonStub).calledWith([carMock])).to.be.true;
    //     });
    // });

})
