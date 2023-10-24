import { ZodError } from 'zod';
import { expect } from 'chai';
import * as sinon from 'sinon';
import { taskMock, taskMockWithId } from '../mocks/taskMock';
import TaskService from '../../../services/TaskService';
import TaskModel from '../../../models/TaskModel';


describe('3 - Task Service', () => {
	const taskModel = new TaskModel();
	const taskService = new TaskService(taskModel);
 
	before(() => {
		sinon.stub(taskModel, 'create').resolves(taskMockWithId);
	})

	after(() => { sinon.restore() })

	describe('1 - Create task', () => {
		it('Success', async () => {
			const taskCreated = await taskService.create(taskMock);
			expect(taskCreated).to.be.deep.equal(taskMockWithId);
		});

		it('Failure', async () => {
			try { await taskService.create({} as any) } 
			catch (error) { expect(error).to.be.instanceOf(ZodError) }
		});
	});
});

// template para criação dos testes de cobertura da camada de service


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