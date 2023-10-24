import { expect } from 'chai';
import sinon from 'sinon';
import TaskModel from '../../../models/TaskModel';
import { Model } from 'mongoose';
import { taskMock, taskMockWithId } from '../mocks/taskMock';


describe('2 - Task Model', () => {
	const taskModel = new TaskModel();

	before(() => {
		sinon.stub(Model, 'create').resolves(taskMockWithId);
	});

	after(() => {
		sinon.restore();
	})

	describe('1 - Create task', () => {
		it('successfully', async () => {
			const taskCreated = await taskModel.create(taskMock);
			expect(taskCreated).to.be.deep.equal(taskMockWithId);
		});
	});
});

// template para criação dos testes de cobertura da camada de model


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