import { Router } from "express";
import TaskModel from "../models/TaskModel";
import TaskService from "../services/TaskService";
import TaskController from "../controllers/TaskController";
import { authToken } from "../middlewares/checkToken";

const task = new TaskModel();
const taskService = new TaskService(task);
const taskController = new TaskController(taskService);

const route = Router();


route.use((req, res, next) => authToken(req, res, next));

route.post('/', (req, res) => taskController.create(req, res));
route.get('/', (req, res) => taskController.find(req, res));
route.put('/:id', (req, res) => taskController.update(req, res));
route.delete('/:id', (req, res) => taskController.delete(req, res));

export default route;