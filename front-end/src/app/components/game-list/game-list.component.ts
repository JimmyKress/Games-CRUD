import { GamesService } from '../../services/games.service';
import { Component, OnInit, OnDestroy, HostBinding  } from '@angular/core';
import { Subscription } from 'rxjs'; //Angular utiliza RxJS de manera extensiva para manejar flujos de datos asíncronos, como las respuestas de HTTP, eventos del usuario
import { Game } from '../../models/Game';
import { Router } from '@angular/router'
//import { error } from 'node:console';

@Component({
  selector: 'app-games',
  standalone: true , // se agrega esta propiedad para marcar el componente como standalone
  imports:[], 
  template: ' ',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css'],
  providers:[GamesService]

})
export class GameListComponent implements OnInit, OnDestroy {
  
  @HostBinding('class') classes = 'row';

  gamesSubscription!: Subscription;
  games: Game[] = [];

  constructor(private gamesService: GamesService, private router:Router) {}
  
  ngOnInit() {
    this.getGames();
  }

  getGames(){
    this.gamesSubscription = this.gamesService.getGames().subscribe({
      next: (res: any) => {
        //res.json(this.games);
        this.games = res;
        console.log('Juegos obtenidos:',this.games);
      },
      error: (err: any) => {
        console.error('Error al obtener juegos:', err);
      }
    }); 
  }

  ngOnDestroy() {
    if (this.gamesSubscription) {
      this.gamesSubscription.unsubscribe();
    }
  }

  deleteGame(id: any){
    this.gamesService.deleteGame(id).subscribe({
      next: (res: any) => {
        this.games = res;
        console.log('Juego eliminado:',this.games);
        this.getGames();
      },
      error: (err: any) => {
        console.error('Error al eliminar el juego:', err);
      }
    });
  }

  editGame(id: any){
    console.log(id),
    this.router.navigate(['/games/edit/',id]);
    //this.gamesService.updateGame(id, updateGame)
  }
}
