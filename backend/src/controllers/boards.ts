import { RequestHandler } from "express";
import createHttpError from "http-errors";
import { isValidObjectId, Types } from "mongoose";
import Board from "../models/Board";

export const getBoards: RequestHandler = async (req, res, next) => {
  try {
    const boards = await Board.find().exec();

    res.status(200).json(boards);
  } catch (error) {
    next(error);
  }
};

interface CreateBoardParams {
  name?: string;
  columns?: { name: string }[];
}

export const createBoard: RequestHandler<
  unknown,
  unknown,
  CreateBoardParams,
  unknown
> = async (req, res, next) => {
  const { name, columns } = req.body;

  try {
    if (!name) {
      throw createHttpError(400, "Board must have a name");
    }
    const board = await Board.create({ name, columns });

    res.status(201).json(board);
  } catch (error) {
    next(error);
  }
};

interface UpdateBoardParams {
  name?: string;
  columnsToRemove?: string[];
  columnsToAdd?: string[];
}

interface BoardUrlParams {
  boardId: string;
}

export const updateBoard: RequestHandler<
  BoardUrlParams,
  unknown,
  UpdateBoardParams,
  unknown
> = async (req, res, next) => {
  const { name, columnsToRemove, columnsToAdd } = req.body;
  const { boardId } = req.params;

  try {
    if (!isValidObjectId(boardId)) {
      throw createHttpError(400, "The board id is not valid!");
    }

    if (!name) {
      throw createHttpError(400, "Board must have a name!");
    }

    let board = await Board.findById(boardId).exec();

    if (!board) {
      throw createHttpError(404, "Board not found!");
    }

    board.name = name;

    if (columnsToAdd) {
      board = await Board.findByIdAndUpdate(
        boardId,
        {
          $push: { columns: { $each: columnsToAdd } },
        },
        { new: true }
      ).exec();
    }

    if (columnsToRemove) {
      const updatedColumns = columnsToRemove.map(
        (col: string) => new Types.ObjectId(col)
      );

      board = await Board.findByIdAndUpdate(
        boardId,
        {
          $pull: { columns: { _id: { $in: updatedColumns } } },
        },
        { new: true }
      ).exec();
    }

    await board?.save();

    res.status(200).json(board);
  } catch (error) {
    next(error);
  }
};
