"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexControllers = void 0;
class IndexControllers {
    index(req, res) {
        //res.send('Hello');
        res.json({ text: 'hello' });
        console.log('Iniciar ruta');
    }
}
exports.indexControllers = new IndexControllers();
