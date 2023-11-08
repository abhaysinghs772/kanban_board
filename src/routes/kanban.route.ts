import { Router } from "express";
import { authMiddleware } from "../middlewares";
import {
    create_Kanban_Board,
    getSingleBoard,
    getAllBoards,
    updateBoard,
    removeBoard
} from '../controllers';

const kanbanRoute = Router();

kanbanRoute
    .post(
        "/create-board", 
        authMiddleware, 
        create_Kanban_Board
    );
kanbanRoute
    .get(
        "/get-board/:kanban_board_id", 
        authMiddleware, 
        getSingleBoard
    );
kanbanRoute
    .get(
        "/get-all-boards", 
        authMiddleware, 
        getAllBoards
    );
kanbanRoute
    .put(
        "/update-board/:kanban_board_id", 
        authMiddleware, 
        updateBoard
    );
kanbanRoute
    .delete(
        "/delete-board/:kanban_board_id",
        authMiddleware, 
        removeBoard
    );

export { kanbanRoute };
