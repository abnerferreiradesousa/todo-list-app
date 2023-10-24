import { Router } from "express";
import TaskModel from "../models/TaskModel";
import TaskService from "../services/TaskService";
import TaskController from "../controllers/TaskController";

// const task = new TaskModel();
// const taskService = new TaskService(task);
// const taskController = new TaskController(taskService);

const route = Router();

// route.post('/', (req, res) => taskController.create(req, res));
// route.get('/', (req, res) => taskController.read(req, res));

export default route;