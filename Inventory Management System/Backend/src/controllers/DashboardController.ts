import { Request, Response, NextFunction } from "express";
import * as dashboardService from "../services/DashboardService";
import HttpStatus from "http-status-codes";
// import Product from "../models/Product";

export const DashboardController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
    try {
       const user_id = res.locals.user.id;
    const dashboardData = await dashboardService.dashboardService(user_id);
    res.status(HttpStatus.ACCEPTED).json({
      message: "product Fetch Successfully",
      result: dashboardData,
    });
  } catch (error) {
    next(error);
  }
};
