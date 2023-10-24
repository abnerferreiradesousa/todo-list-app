import { expect } from 'chai';
import * as sinon from 'sinon';
import { Request, Response } from 'express';
import { taskMock, taskMockWithId } from '../mocks/taskMock';
import TaskController from '../../../controllers/TaskController';
import TaskService from '../../../services/TaskService';
import TaskModel from '../../../models/TaskModel';


describe('1 - Task Controller', () => {
  const taskModel = new TaskModel()
  const taskService = new TaskService(taskModel);
  const taskController = new TaskController(taskService);

  const req = {} as Request;
  const res = {} as Response;

  before(() => {
    sinon.stub(taskService, 'create').resolves(taskMockWithId);

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  after(() => { sinon.restore() })

  describe('1 - Create task', () => {
    it('Success', async () => {
      req.body = taskMock;
      await taskController.create(req, res);
      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(taskMockWithId)).to.be.true;
    });
  });
});

// template para criação dos testes de cobertura da camada de controller


// import * as sinon from 'sinon';
// import chai from 'chai';
// const { expect } = chai;

// describe('Sua descrição', () => {

//   before(async () => {
//     sinon
//       .stub()
//       .resolves();
//   });

//   after(()=>{
//     sinon.restore();
//   })

//   it('', async () => {});

// });