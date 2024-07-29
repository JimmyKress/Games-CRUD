import { Router } from 'express';
import gamesControllers from '../controllers/gamesControllers';

class GamesRoutes{
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/', gamesControllers.list); //defino mi ruta para games
        this.router.get('/:id', gamesControllers.getOne);
        this.router.post('/', gamesControllers.create);
        this.router.put('/:id', gamesControllers.update);
        this.router.delete('/:id', gamesControllers.delete);

    }  

}

const gamesRoutes = new GamesRoutes;
export default gamesRoutes.router;