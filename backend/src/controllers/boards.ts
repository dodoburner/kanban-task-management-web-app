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

export const createBoard: RequestHandler = async (req, res, next) => {
  const { name, columns } = req.body;
  try {
    if (!name) {
      createHttpError(400, "Board must have a name");
    }
    const board = await Board.create({ name, columns });

    res.status(201).json(board);
  } catch (error) {
    next(error);
  }
};

export const updateBoard: RequestHandler = async (req, res, next) => {
  const { name, columnsToRemove, columnsToAdd } = req.body;
  const { boardId } = req.params;

  try {
    if (!isValidObjectId(boardId)) {
      throw createHttpError(400, "The board id is not valid!");
    }

    if (!name) {
      throw createHttpError(400, "Board must have a name!");
    }

    let board = await Board.findByIdAndUpdate(boardId, {
      $set: { name },
    }).exec();

    if (!board) {
      throw createHttpError(404, "Board not found!");
    }

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
