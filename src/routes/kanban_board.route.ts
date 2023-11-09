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

/**
 * create kanban board route 
 */
kanbanRoute
    .post(
        "/create-kanban-board", 
        authMiddleware, 
        create_Kanban_Board
    );

/**
 * get kanban board route 
 */    
kanbanRoute
    .get(
        "/get-board/:kanban_board_id", 
        authMiddleware, 
        getSingleBoard
    );

/**
 * get all kanban boards route 
 */    
kanbanRoute
    .get(
        "/get-all-boards", 
        authMiddleware, 
        getAllBoards
    );

/**
 * update kanban board route 
 */
kanbanRoute
    .put(
        "/update-board/:kanban_board_id", 
        authMiddleware, 
        updateBoard
    );

/**
 * remove kanban board route 
 */
kanbanRoute
    .delete(
        "/delete-kanban-board/:kanban_board_id",
        authMiddleware, 
        removeBoard
    );

export { kanbanRoute };
