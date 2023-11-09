import { ObjectId } from "mongoose";

export interface create_Kanban_Column_Body {
    name : string
    kanban_board_id: ObjectId;
    kanban_items_ids?: ObjectId[]; // An array of items Ids which is related to columns (optional)
    created_By : ObjectId;
}