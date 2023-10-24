import { Router } from "express";
import UserModel from "../models/User";
import UserService from "../services/UserService";
import UserController from "../controllers/UserController";

const user = new UserModel();
const userService = new UserService(user);
const userController = new UserController(userService);

const route = Router();

route.post('/', (req, res) => userController.create(req, res));

export default route;