import { ObjectId } from "mongoose";

export interface createKanbanBody {
    name: string,
    description: string,
    created_By: ObjectId,
    columns?: ObjectId[]
}