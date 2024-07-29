import { Injectable } from '@angular/core';
import { Game } from '../models/Game';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'; //me permite hacer peticiones http

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  API_URI = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

    getGames() {
      return this.http.get(`${this.API_URI}/games`); //hago una peticion para obtener todos los juegos 
    }
    
    getGame(id: string){
      return this.http.get(`${this.API_URI}/games/${id}`); //hago una peticion para obtener un solo juego
    }

    deleteGame(id: string){
      return this.http.delete(`${this.API_URI}/games/${id}`);
    }

    saveGames(game: Game){
      return this.http.post(`${this.API_URI}/games`, game)
    }
    
    updateGame(id: any, updateGame: Game) :Observable<Game>{
      return this.http.put(`${this.API_URI}/games/${id}`, updateGame);
    }
  
}
