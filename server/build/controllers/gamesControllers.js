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
const keys_1 = __importDefault(require("../keys"));
const promise_mysql_1 = __importDefault(require("promise-mysql"));
class GamesControllers {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //res.json({text:'welcome a to section of Games'});
            const pool = yield promise_mysql_1.default.createPool(keys_1.default.database);
            const games = yield pool.query('SELECT * FROM game');
            res.json(games);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const pool = yield promise_mysql_1.default.createPool(keys_1.default.database);
            const game = yield pool.query('SELECT * FROM game WHERE id = ?', [id]);
            if (game.length > 0) {
                return res.json(game[0]);
            }
            else {
                res.status(404).json({ text: "The game doesn't exist" });
            }
            console.log(game);
            //res.json({text:'This a game ' + req.params.id});
            //res.json(game);
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const pool = yield promise_mysql_1.default.createPool(keys_1.default.database);
            //console.log(req.body);
            yield pool.query('INSERT INTO game set ?', [req.body]);
            //res.json({text:'Creating a game'});
            res.json({ text: 'Game saved' });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const pool = yield promise_mysql_1.default.createPool(keys_1.default.database);
            const { id } = req.params;
            const game = yield pool.query('DELETE FROM game WHERE id = ?', [id]);
            res.json({ message: 'Deleting a game ' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const pool = yield promise_mysql_1.default.createPool(keys_1.default.database);
            const { id } = req.params;
            const game = yield pool.query('UPDATE game set ? WHERE id = ?', [req.body, id]);
            res.json({ message: 'The was updated' });
            //res.json({text:'Updating a game ' + req.params.id});
        });
    }
}
const gamesControllers = new GamesControllers();
exports.default = gamesControllers;
