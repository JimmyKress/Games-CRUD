import { Request, Response, text } from "express";
import keys from '../keys';
import mysql, { Pool } from 'promise-mysql';

class GamesControllers{
    public async list(req: Request, res: Response): Promise<void>{
        //res.json({text:'welcome a to section of Games'});
        const pool: Pool = await mysql.createPool(keys.database);
        const games = await pool.query('SELECT * FROM game');
        
        res.json(games);
        
    }

    public async getOne(req: Request, res: Response): Promise<any>{
        const { id } = req.params;
        const pool: Pool = await mysql.createPool(keys.database);
        const game = await pool.query('SELECT * FROM game WHERE id = ?', [id]);
        if(game.length > 0){
            return res.json(game[0]);
        }else{
            res.status(404).json({text:"The game doesn't exist"})
        }
        console.log(game);
        //res.json({text:'This a game ' + req.params.id});
        //res.json(game);
    }

    public async create(req: Request, res: Response): Promise<void>{
        const pool: Pool = await mysql.createPool(keys.database);
        //console.log(req.body);
        await pool.query('INSERT INTO game set ?', [req.body]);
        //res.json({text:'Creating a game'});
        res.json({text:'Game saved'});
    }
    
    public async delete (req: Request, res: Response):Promise<void>{
        const pool: Pool = await mysql.createPool(keys.database);
        const {id} = req.params;
        const game = await pool.query('DELETE FROM game WHERE id = ?', [id]);
        res.json({message:'Deleting a game '});
    }

    
    public async update (req: Request, res: Response):Promise<void>{
        const pool: Pool = await mysql.createPool(keys.database);
        const {id} = req.params;
        const game = await pool.query('UPDATE game set ? WHERE id = ?', [req.body, id]);
        res.json({message:'The was updated'});
        //res.json({text:'Updating a game ' + req.params.id});
    }

}

const gamesControllers = new GamesControllers();
export default gamesControllers;