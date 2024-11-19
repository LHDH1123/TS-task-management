import { Request, Response } from "express";
import { Task } from "../models/task.model";
import paginationHelper from "../helpers/panigation";
import searchHelper from "../helpers/search";

export const index = async (req: Request, res: Response) => {
  //Danh sach task
  const find = {
    deleted: false,
  };

  if (req.query.status) {
    find["status"] = req.query.status;
  }
  //Loc theo tieu chi
  const sort = {};

  if (req.query.sortKey && req.query.sortValue) {
    const sortKey = req.query.sortKey.toString();
    sort[sortKey] = req.query.sortValue;
  }

  //Phan trang
  let initPagination = {
    currentPage: 1,
    limitItem: 5,
  };
  const countTasks = await Task.countDocuments(find);
  const objectPagination = paginationHelper(
    initPagination,
    req.query,
    countTasks
  );

  //Search
  let objectSearch = searchHelper(req.query)

  if (req.query.keyword) {
    find["title"] = objectSearch.regex;
  }

  const tasks = await Task.find(find)
    .limit(objectPagination.limitItem)
    .skip(objectPagination.skipItem)
    .sort(sort);

  res.json(tasks);
};

export const detail = async (req: Request, res: Response) => {
  const id: string = req.params.id;

  const task = await Task.find({
    _id: id,
    deleted: false,
  });

  res.json(task);
};
