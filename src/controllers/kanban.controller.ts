import { Request, Response } from "express";
import { KanbanModel } from '../models'; 
import { createKanbanBody, updateKanbanBody } from '../interfaces';

export async function create_Kanban_Board(req: Request, res: Response) {
    try {

        let { name, description } = req.body;

        let { _id: created_By } = JSON.parse( req.user) ;
        let kanban_Board_Body: createKanbanBody = {
            name,
            description,
            created_By
        }

        let saved_kanban_Board = await KanbanModel.create(kanban_Board_Body);

        return res.status(201).json({ message: 'successfully saved kanban board', saved_kanban_Board });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
}


export async function getAllBoards(req: Request, res: Response) {
    try {
        const page: number = parseInt(req.query.page as string) || 1;
        const pageSize: number = parseInt(req.query.pageSize as string) || 10;

        const skip = (page - 1) * pageSize;

        // nested destructring because _id is present in _doc
        let { _id: created_By } = JSON.parse(req.user);
        let allBoards = await KanbanModel.find({ created_By })
            .skip(skip)
            .limit(pageSize)
            .exec();

        const totalItems = await KanbanModel.countDocuments({ created_By });
        const hasMore = page * pageSize < totalItems;

        return res.status(200).json({
            boards: allBoards,
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

export async function getSingleBoard(req: Request, res: Response) {
    try {
        let kanban_Board_Id = req.params.kanban_board_id;
        let { _id: created_By } = JSON.parse(req.user);

        let kanban_board = await KanbanModel.find({ _id: kanban_Board_Id, created_By });

        if (!kanban_board.length) {
            return res.status(404).json({ message: 'kanban boared not found' });
        }

        return res.status(201).json({ kanban_board: kanban_board[0] });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
}

export async function updateBoard(req: Request, res: Response) {
    try {
        let kanban_board_Id = req.params.kanban_board_id;

        let { _id: created_By } = JSON.parse(req.user);
        
        // check whether kanban board exist or not 
        let kanban_board = await KanbanModel.find({_id: kanban_board_Id, created_By});

        if (!kanban_board.length){
            return res.status(404).json({ message: 'kanban board not found' });
        }

        let { name, description} = req.body;

        let updateBody: updateKanbanBody = {};
        
        if (name) {
            updateBody.name = name
        }
        if (description){
            updateBody.description = description;
        }

        let updated_kanban_board = await KanbanModel.findByIdAndUpdate(kanban_board_Id, updateBody);

        res.status(201).json({message: 'successfully updated kanban board', updated_kanban_board });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
}

export async function removeBoard(req: Request, res: Response) {
    try {
        let kanban_board_Id = req.params.kanban_board_id;
        let { _id: created_By } = JSON.parse(req.user);

        // check whether kanban board exist or not 
        let kanban_board = await KanbanModel.find({_id: kanban_board_Id, created_By});

        if (!kanban_board.length){
            return res.status(404).json({ message: 'kanban board not found' });
        }
        
        let deletedBoard = await KanbanModel.findByIdAndRemove(kanban_board_Id);
        // console.log(deletedBoard);
        
        return res.status(201).json({ message: "successfully removed kanban board" });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
}
