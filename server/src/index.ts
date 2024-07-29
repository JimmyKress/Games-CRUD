import express, { Application } from 'express'; 
import morgan from 'morgan';
import cors from 'cors';
import indexRoutes from './routes/indexRoutes';
import gamesRoutes from './routes/gamesRoutes';
import bodyParser from 'body-parser'; // Importar bodyParser directamente

const app = express();

class Server {
    public app:Application; //creo un atributo app de tipo 'Application'
    constructor(){
        this.app = express(); // Crear una instancia de la aplicación Express
        this.config();
        this.routes();
        
    }

    config(): void{
        this.app.set('port', process.env.PORT || 3000)//estoy validando/creando  el puerto en la nube
        this.app.use(morgan("dev")); //me permite ver en consola lo que los clientes estan haciendo
        this.app.use(cors()); //Angular podra pedir los datos al servidor
        this.app.use(express.json()); //recibo peticiones de las aplicaciones-cliente en formato json
        this.app.use(express.urlencoded({extended: false})); //en caso de enviar desde un formulario html
        // Configurar el límite de carga máximo
        this.app.use(bodyParser.json({ limit: '20mb' }));
        this.app.use(bodyParser.urlencoded({ limit: '20mb', extended: true }));

    }

    routes(): void{
        this.app.use('/', indexRoutes);
        this.app.use('/api/games',gamesRoutes);
    }

    start(): void{
        this.app.listen(this.app.get('port'), () => { //se utiliza para iniciar un servidor HTTP y hacer que escuche en un puerto específico en una aplicación web
            console.log('Server on port', this.app.get('port'));
        });
    }

}

const server = new Server();
server.start();