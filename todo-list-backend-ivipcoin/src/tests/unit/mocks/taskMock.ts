// const fakeId = "62e45fe854ac30f03ef53982";
const fakeId = "aaaaaaaaaaaaaaaaaaaaaaaa";

const taskMock = {
  title: "Title task 1",
  details: "Details task 1",
  isDone: true,
  userId: "62e4486c5db2ec3d8c01b1cf"
}

const taskMockWithId = {
  ...taskMock,
  id: "62e4486c5db2ec3d8c01b1cf"
}

export {
  taskMock, 
  taskMockWithId,
  fakeId
}