import { ITask } from '../../../interfaces/ITask';

const fakeId = "aaaaaaaaaaaaaaaaaaaaaaaa";

const taskMockWithId: ITask & { _id: string } = {
  title: 'Title task 1 Title task 1',
  details: 'Details task 1 Title task 1 Title task 1',
  userId: "62e4486c5db2ec3d8c01b1cf",
  _id: "62e4486c5db2ec3d8c01b1cf",
  isDone: false,
}

export {
  taskMock, 
  taskMockWithId,
  fakeId
}


const taskMock: ITask = {
  userId: '62e4486c5db2ec3d8c01b1cf',
  title: 'Title task 1 Title task 1',
  details: 'Details task 1 Title task 1 Title task 1',
  isDone: false
};
