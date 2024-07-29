import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './components/navigation/navigation.component';
import { GamesService } from './services/games.service';
import { GameListComponent } from './components/game-list/game-list.component';
import { BrowserModule } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import {NgIf, NgFor} from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true , // se agrega esta propiedad para marcar el componente como standalone
  imports: [
    CommonModule,
    //BrowserModule,
    HttpClientModule,
    RouterOutlet,
    AppComponent,
    NavigationComponent,
    GameListComponent,
    NgIf,
    NgFor,
    RouterModule
  ],
  providers: [
    GamesService,
    BrowserModule
  ],
  //bootstrap: [AppComponent]
})

export class AppComponent {
  title = 'front-end';
}

export class AppModule { }
