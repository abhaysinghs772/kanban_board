import mongoose, { Schema } from 'mongoose';

// used the snake case because the schema name contains more then 3 words 
const kanban_Column_Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    // in order to keep track of who has created the resource
    created_By: {
      type: Schema.ObjectId,
      ref: 'User',
      required: true
    },
    // here "required: true" is given because a kanban_cloumn is related to a kanban_board
    kanban_board: {
      type: Schema.ObjectId,
      ref: 'Kanban_board',
      required: true
    },
    // here Array is used because one kanban_columns can have multiple kanban items and
    // it is similar to to One to Many Relationshep is seeing this in context to sql based dbs  
    kanban_items: [{
      type: Schema.ObjectId,
      ref: 'Kanban_item',
    }]
  },
  // timestamps to add created_at and updated_at
  { timestamps: true },
); 

export const KanbanColumnsModel 
  = mongoose.models.Kanban_column || mongoose.model('Kanban_column', kanban_Column_Schema);
