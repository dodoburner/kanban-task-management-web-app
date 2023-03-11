import { RequestHandler } from "express";
import { Types } from "mongoose";
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
    const board = await Board.create({ name, columns });

    await board.populate("columns");

    res.status(201).json(board);
  } catch (error) {
    next(error);
  }
};

export const updateBoard: RequestHandler = async (req, res, next) => {
  const { name, columnsToRemove, columnsToAdd } = req.body;
  const { boardId } = req.params;

  try {
    let board = await Board.findByIdAndUpdate(boardId, {
      $set: { name },
    }).exec();

    // Update the columnsToAdd using $push
    if (columnsToAdd) {
      board = await Board.findByIdAndUpdate(
        boardId,
        {
          $push: { columns: { $each: columnsToAdd } },
        },
        { new: true }
      ).exec();
    }

    // Update the columnsToRemove using $pull
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
