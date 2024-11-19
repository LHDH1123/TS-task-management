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
  let objectSearch = searchHelper(req.query);

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

export const changeStatus = async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;
    const status: string = req.body.status;

    await Task.updateOne(
      {
        _id: id,
      },
      {
        status: status,
      }
    );

    res.json({
      code: 200,
      message: "Cập nhật trạng thái thành công!",
    });
  } catch (error) {
    res.json({
      code: 400,
      message: "Không tồn tại!",
    });
  }
};

export const changeMultiPatch = async (req: Request, res: Response) => {
  try {
    enum Key {
        STATUS = "status",
        DELETE = "delete"
    }

    const ids: string[] = req.body.ids;
    const key: string = req.body.key;
    const value: string = req.body.value;

    switch (key) {
      case Key.STATUS:
        await Task.updateMany(
          {
            _id: { $in: ids },
          },
          {
            status: value,
          }
        );

        res.json({
          code: 200,
          message: "Cập nhật trạng thái thành công!",
        });
        break;

      case Key.DELETE:
        await Task.updateMany(
          {
            _id: { $in: ids },
          },
          {
            deleted: true,
            deletedAt: new Date()
          }
        );

        res.json({
          code: 200,
          message: "Xóa thành công!",
        });
        break;

      default:
        res.json({
          code: 400,
          message: "Không tồn tại!",
        });
        break;
    }
  } catch (error) {
    res.json({
      code: 400,
      message: "Không tồn tại!",
    });
  }
};

export const createPost = async (req: Request, res: Response) => {
  try {
    const task = new Task(req.body);
    await task.save();

    res.json({
      code: 200,
      message: "Tạo công việc thành công!",
    });
  } catch (error) {
    res.json({
      code: 400,
      message: "Thất bại!",
    });
  }
};

export const editPatch = async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;

    await Task.updateOne(
      {
        _id: id,
      },
      req.body
    );

    res.json({
      code: 200,
      message: "Cập nhật thành công!",
    });
  } catch (error) {
    res.json({
      code: 400,
      message: "Thất bại!",
    });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;

    await Task.updateOne(
      {
        _id: id,
      },
      { deleted: true, deletedAt: new Date() }
    );

    res.json({
      code: 200,
      message: "Xóa thành công!",
    });
  } catch (error) {
    res.json({
      code: 400,
      message: "Thất bại!",
    });
  }
};
