import { Router } from "express";
import UserModel from "../models/UserModel";
import UserService from "../services/UserService";
import UserController from "../controllers/UserController";

const user = new UserModel();
const userService = new UserService(user);
const userController = new UserController(userService);

const route = Router();

route.post('/login', (req, res) => userController.login(req, res));
route.post('/', (req, res) => userController.create(req, res));

export default route;