import { Component, OnDestroy, OnInit } from '@angular/core';
import { Game } from '../../models/Game';
import { GamesService } from '../../services/games.service';
import { FormsModule } from '@angular/forms';
import { subscribe } from 'node:diagnostics_channel';
import { Subscription } from 'rxjs'; //Angular utiliza RxJS de manera extensiva para manejar flujos de datos asíncronos, como las respuestas de HTTP, eventos del usuario
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router'


@Component({
  selector: 'app-game-form',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './game-form.component.html',
  styleUrl: './game-form.component.css'
})

export class GameFormComponent implements OnInit, OnDestroy{
  gamesSubscription!: Subscription;
  constructor(private gameService:GamesService, private http: HttpClient, private router:Router, public activedRouter: ActivatedRoute){}
  
  game: Game = {
    id: 0,
    title: '',
    description: '',
    image: '', 
    create_at: new Date()
  }

  edit: boolean = false;

  ngOnInit(): void {
  /*
    const params: any = this.activedRouter.snapshot.params;
    console.log(params);

    if(params.id){
      this.gameService.getGame(params.id);
    }this.gamesSubscription = this.gameService.getGame(params.id).subscribe({
      next: (res: any) => {
        this.game = res;
        this.edit = true;
        console.log('Juego obtenido:',res);  
      },
      error: (err: any) => {
        console.error('Error al mostrar el juego:', err);
      }
     });
  */
     
  }

  saveGame(){
    delete this.game.create_at;
    delete this.game.id;
    this.gameService.saveGames(this.game);
    console.log(this.game);

    this.gamesSubscription = this.gameService.saveGames(this.game).subscribe({
    next: (res: any) => {
      console.log('Juego guardado:',res);
      this.game = res;
      this.router.navigate(['/games']);
      return this.http.put<any>('http://localhost:3000/api/games/id:', this.game)

    },
    error: (err: any) => {
      console.error('Error al guardar el juego:', err);
    }
   }); 
  }

  updateGames(){ 
    delete this.game.id;
    delete this.game.create_at;
    console.log(this.game);
     this.gameService.updateGame(this.game.id, this.game);
     this.gamesSubscription = this.gameService.updateGame(this.game.id, this.game).subscribe({
       next: (res: any) => {
         this.game = res;
         console.log('Juego actualizado:',res);  
         this.router.navigate(['/games']);
         return this.http.put<any>('http://localhost:3000/api/games/', this.game.id)
       },
       error: (err: any) => {
         console.error('Error al actualizar el juego:', err);
       }
     });
   }

   onFileSelected(event: any) {
    const file: File = event.target.files[0]; // Obtiene el archivo seleccionado

    if (file) {
      // Lee el contenido del archivo como URL
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.game.image = e.target.result; // Asigna la URL del archivo a game.image
      };
      reader.readAsDataURL(file); // Lee el contenido del archivo como una URL base64
    }
  }


  

  ngOnDestroy() {
    if (this.gamesSubscription) {
      this.gamesSubscription.unsubscribe();
    }
  }

  
}

