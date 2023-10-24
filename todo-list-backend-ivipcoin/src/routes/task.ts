import { Router } from "express";
import TaskModel from "../models/Task";
import TaskService from "../services/TaskService";
import TaskController from "../controllers/TaskController";

const task = new TaskModel();
const taskService = new TaskService(task);
const taskController = new TaskController(taskService);

const route = Router();

route.post('/', (req, res) => taskController.create(req, res));

export default route;