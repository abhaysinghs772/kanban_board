import { Request, Response } from "express";
import { KanbanColumnsModel } from '../models'; 

export async function create_kanban_column(req: Request, res: Response){
    try { 
        
        let { name, kanban_board_id: kanban_board } = req.body;

        let { _id: created_By } = JSON.parse( req.user);
        
        let kanban_column_body = new KanbanColumnsModel();

        if (req.called_inside_controller){
            kanban_board = JSON.parse(kanban_board);
        }

        Object.assign(kanban_column_body,  {
            name,
            kanban_board,
            created_By
        });

        let saved_kanban_column = await KanbanColumnsModel.create(kanban_column_body);

        // we can use better approach then this by simply creating a new typeScript file 
        // and then by extending the required express's class, but for simplycity sake of purpose i keep it like this 
        if (!req.called_inside_controller){
            return res.status(201).json({ message: 'successfully saved kanban column', saved_kanban_column });
        }
        
        return { message: 'successfully saved kanban column', saved_kanban_column };
    } catch (error) {
        console.error(error);
        if (!req.called_inside_controller){            
            return res.status(500).json({ message: 'Server error' });
        }
        return { message: 'something went wrong' };
    }
}

export async function getAllColumns(req: Request, res: Response) {
    try {
        const page: number = parseInt(req.query.page as string) || 1;
        const pageSize: number = parseInt(req.query.pageSize as string) || 10;

        const skip = (page - 1) * pageSize;

        let { _id: created_By } = JSON.parse(req.user);
        let allColumns = await KanbanColumnsModel.find({ created_By })
            .skip(skip)
            .limit(pageSize)
            .exec();

        const totalItems = await KanbanColumnsModel.countDocuments({ created_By });
        const hasMore = page * pageSize < totalItems;

        return res.status(200).json({
            columns: allColumns,
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

export async function getSingleColumn(req: Request, res: Response) {
    try {
        let kanban_Column_Id = req.params.kanban_column_id;
        let { _id: created_By } = JSON.parse(req.user);

        let kanban_column = await KanbanColumnsModel.find({ _id: kanban_Column_Id, created_By });

        if (!kanban_column.length) {
            return res.status(404).json({ message: 'kanban column not found' });
        }

        return res.status(201).json({ kanban_column: kanban_column[0] });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
}

export async function updateColumn(req: Request, res: Response) {
    try {
        let kanban_column_Id = req.params.kanban_column_id;

        let { _id: created_By } = JSON.parse(req.user);
        
        // check whether kanban column exist or not 
        let kanban_column : any= await KanbanColumnsModel.find({_id: kanban_column_Id, created_By});

        if (!kanban_column.length){
            return res.status(404).json({ message: 'kanban column not found' });
        }

        let { name }  = req.body;

        let updateBody : any = {
            kanban_board : kanban_column.kanban_board
        };

        if (name) {
            updateBody.name = name
        }

        let updated_kanban_column = await KanbanColumnsModel.findByIdAndUpdate(kanban_column_Id, updateBody);

        res.status(201).json({message: 'successfully updated kanban column', updated_kanban_column });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
}

export async function removeColumn(req: Request, res: Response) {
    try {
        let kanban_column_Id = req.params.kanban_column_id;
        let { _id: created_By } = JSON.parse(req.user);

        // check whether kanban columns exist or not 
        let kanban_columns = await KanbanColumnsModel.find({_id: kanban_column_Id, created_By});

        if (!kanban_columns.length){
            return res.status(404).json({ message: 'kanban column not found' });
        }
        
        let deletedColumn = await KanbanColumnsModel.findByIdAndRemove(kanban_column_Id);
        // console.log(deletedcolumn);
        
        return res.status(201).json({ message: "successfully removed kanban column" });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
}
