import mongoose, { Schema } from 'mongoose';

// used the snake case because the schema name contains more then 3 words 
const kanban_Board_Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
        type : String,
    },
    created_By: Schema.ObjectId // in order to keep track of who has created the resource
  },
  { timestamps: true },
); // timestamps to add created_at and updated_at

export const KanbanModel 
  = mongoose.models.Kanban_board || mongoose.model('Kanban_board', kanban_Board_Schema);
