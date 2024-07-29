"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express")); /*{{Aplicattion}}*/
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const gamesRoutes_1 = __importDefault(require("./routes/gamesRoutes"));
class Server {
    constructor() {
        this.app = (0, express_1.default)(); // Crear una instancia de la aplicación Express
        this.config();
        this.routes();
    }
    config() {
        this.app.set('port', process.env.PORT || 3000); //estoy validando/creando  el puerto en la nube
        this.app.use((0, morgan_1.default)("dev")); //me permite ver en consola lo que los clientes estan haciendo
        this.app.use((0, cors_1.default)()); //Angular podra pedir los datos al servidor
        this.app.use(express_1.default.json()); //recibo peticiones de las aplicaciones-cliente en formato json
        this.app.use(express_1.default.urlencoded({ extended: false })); //en caso de enviar desde un formulario html
    }
    routes() {
        this.app.use('/', indexRoutes_1.default);
        this.app.use('/api/games', gamesRoutes_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();
