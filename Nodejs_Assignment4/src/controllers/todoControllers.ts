import { Request, Response } from "express";
import TodoModel from "../services/todoServices"; // assuming todoService.ts exports the service object

const getTodos = (req: Request, res: Response): void => {
  const todos = TodoModel.getTodos();
  res.json(todos);
};

const addTodo = async (req: Request, res: Response) => {
  const todoAdd= req.body;
  const newTodo = TodoModel.addTodo(todoAdd);
  res.json(newTodo);
};

const updateTodo = async (req: Request, res: Response) => {
  const { id } = req.body;
  const update = req.body;
  const newUpdateTodo = TodoModel.updateTodo(id, update);
  res.json(newUpdateTodo);
};

const deleteTodo = async (req: Request, res: Response) => {
  const { id } = req.params;
  const todoId = parseInt(id);
  TodoModel.deleteTodo(todoId);
  res.json({ message: "Todo deleted successfully" });
};

const getByPagination = (req: Request, res: Response): void => {
  const todos = TodoModel.getByPagination();
  res.json(todos);
};


export const todoController = {
  getTodos,
  addTodo,
  deleteTodo,
  updateTodo,
  getByPagination,
};
