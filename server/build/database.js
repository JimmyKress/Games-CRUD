"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = void 0;
const promise_mysql_1 = __importDefault(require("promise-mysql")); //En la biblioteca promise-mysql, la función createPool() devuelve un objeto de tipo Pool
const keys_1 = __importDefault(require("./keys"));
function connectToDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        const pool = yield promise_mysql_1.default.createPool(keys_1.default.database); // Await, indica que la ejecución de la función debe pausarse hasta que la promesa que está siendo esperada se resuelva o se rechace
        try {
            //Obtengo la conexión
            const connection = yield pool.getConnection();
            connection.release(); // Libero la conexión utilizando release()
            //pool.releaseConnection(connection);
            console.log('DB is connected');
        }
        catch (error) {
            console.error('Error connecting to database:', error);
        }
    });
}
;
exports.connect = connectToDatabase();
