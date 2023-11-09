import { Router } from "express";
import { authMiddleware } from "../middlewares";
import { 
    create_kanban_column,
    getAllColumns,
    getSingleColumn,
    updateColumn,
    removeColumn,
} from "../controllers";

const kanbanColumnsRoute = Router();

/**
 * create kanban column route 
 */
kanbanColumnsRoute
    .post(
        "/create-kanban-column",
        authMiddleware, 
        create_kanban_column
    );

/**
 * get kanban column route 
 */
kanbanColumnsRoute
    .get(
        "/get-kanban-column/:kanban-column_id", 
        authMiddleware, 
        getSingleColumn
    );

/**
 * get all kanban columns route 
 */    
kanbanColumnsRoute
    .get(
        "/get-all-kanban-columns", 
        authMiddleware,
        getAllColumns
    );

/**
 * update kanban column route 
 */
kanbanColumnsRoute
    .put(
        "/update-kanban-column/:kanban_column_id", 
        authMiddleware, 
        updateColumn
    );

/**
 * remove kanban column route 
 */
kanbanColumnsRoute
    .delete(
        "/delete-kanban-column/:kanban-column_id",
        authMiddleware, 
        removeColumn
    );

export { kanbanColumnsRoute };
