import { Request, Response } from "express";
import { KanbanItemsModel , KanbanColumnsModel} from '../models'; 

export async function create_kanban_items(req: Request, res: Response){
    try { 
        
        let { 
            name,
            description,
            due_date,
            kanban_board_id: kanban_board,
            kanban_column_id: kanban_column,
        } = req.body;

        let { _id: created_By } = JSON.parse( req.user);
        
        let kanban_items_body = new KanbanItemsModel();

        Object.assign(kanban_items_body,  {
            name,
            kanban_board,
            kanban_column,
            created_By
        });

        if ( description ) kanban_items_body.description = description;
        if ( due_date ) kanban_items_body.due_date = new Date(due_date);

        let saved_kanban_item = await KanbanItemsModel.create(kanban_items_body); 

        // after creating item tieng this item to its respective column as well
        let updated_kanban_column = await KanbanColumnsModel.findOneAndUpdate(
                { _id: kanban_column[0]._id, created_By },
                { $push: { kanban_items: saved_kanban_item._id } }
            );
        
        return res.status(201).json({ message: 'successfully saved kanban item', saved_kanban_item });
        
    } catch (error) {
        console.error(error);
        if (!req.called_inside_controller){            
            return res.status(500).json({ message: 'Server error' });
        }
        return { message: 'something went wrong' };
    }
}

export async function getAllItemss(req: Request, res: Response) {
    try {
        const page: number = parseInt(req.query.page as string) || 1;
        const pageSize: number = parseInt(req.query.pageSize as string) || 10;

        const skip = (page - 1) * pageSize;

        let { _id: created_By } = JSON.parse(req.user);
        let allItems = await KanbanItemsModel.find({ created_By })
            .skip(skip)
            .limit(pageSize)
            .exec();

        const totalItems = await KanbanItemsModel.countDocuments({ created_By });
        const hasMore = page * pageSize < totalItems;

        return res.status(200).json({
            items: allItems,
            has_more: hasMore,
            page,
            pageSize,
            totalPages: Math.ceil(totalItems / pageSize),
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
}

export async function getSingleItem(req: Request, res: Response) {
    try {
        let kanban_Item_Id = req.params.kanban_item_id;
        let { _id: created_By } = JSON.parse(req.user);

        let kanban_item = await KanbanItemsModel.find({ _id: kanban_Item_Id, created_By });

        if (!kanban_item.length) {
            return res.status(404).json({ message: 'kanban item not found' });
        }

        return res.status(201).json({ kanban_item: kanban_item[0] });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
}

export async function updateItem(req: Request, res: Response) {
    try {
        let kanban_item_Id = req.params.kanban_item_id;

        let { _id: created_By } = JSON.parse(req.user);
        
        // check whether kanban item exist or not 
        let kanban_item : any = await KanbanItemsModel.find({_id: kanban_item_Id, created_By});

        if (!kanban_item.length){
            return res.status(404).json({ message: 'kanban item not found' });
        }

        let { name }  = req.body;

        let updateBody : any = {
            kanban_board : kanban_item.kanban_board
        };

        if (name) {
            updateBody.name = name
        }

        let updated_kanban_item = await KanbanItemsModel.findByIdAndUpdate(kanban_item_Id, updateBody);

        res.status(201).json({message: 'successfully updated kanban item', updated_kanban_item });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
}

export async function removeItem(req: Request, res: Response) {
    try {
        let kanban_item_Id = req.params.kanban_item_id;
        let { _id: created_By } = JSON.parse(req.user);

        // check whether kanban items exist or not 
        let kanban_item = await KanbanItemsModel.find({_id: kanban_item_Id, created_By});

        if (!kanban_item.length){
            return res.status(404).json({ message: 'kanban item not found' });
        }
        
        let deletedItem = await KanbanItemsModel.findByIdAndRemove(kanban_item_Id);
        // console.log(deletedItem);
        
        return res.status(201).json({ message: "successfully removed kanban item" });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
}
