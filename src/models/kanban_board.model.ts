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
    // in order to keep track of who has created the resource
    created_By: {
      type: Schema.ObjectId,
      ref: 'User',
      required: true
    },
    // One kanban_board can have multiple columns that's why Array is used below
    // required: true is not given below because, I am assuming that a user can create or delete 
    // these columns and recreate them if required or they can create their own columns as well
    columns: [{
      type: Schema.ObjectId,
      ref: 'Kanban_column'
    }]
  },
  // timestamps to add created_at and updated_at
  { timestamps: true },
);

export const KanbanModel 
  = mongoose.models.Kanban_board || mongoose.model('Kanban_board', kanban_Board_Schema);
