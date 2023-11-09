import { Router } from "express";
import { authMiddleware } from "../middlewares";

import {
    create_kanban_items,
    getAllItemss,
    getSingleItem,
    updateItem,
    removeItem,
} from "../controllers";

const kanbanItemsRoute = Router();

/**
 * create kanban items route 
 */
kanbanItemsRoute
    .post(
        "/create-kanban-item", 
        authMiddleware, 
        create_kanban_items
    );

/**
 * get kanban item route 
 */
kanbanItemsRoute
    .get(
        "/get-kanban-item/:kanban-item_id", 
        authMiddleware, 
        getSingleItem
    );

/**
 * get all kanban items route 
 */    
kanbanItemsRoute
    .get(
        "/get-all-kanban-items", 
        authMiddleware, 
        getAllItemss
    );

/**
 * update kanban item route 
 */
kanbanItemsRoute
    .put(
        "/update-kanban-item/:kanban_item_id", 
        authMiddleware, 
        updateItem
    );

/**
 * remove kanban item route 
 */    
kanbanItemsRoute
    .delete(
        "/delete-kanban-item/:kanban-item_id",
        authMiddleware,
        removeItem
    );

export { kanbanItemsRoute };
