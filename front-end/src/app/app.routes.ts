//import { NgModel } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { GameListComponent } from './components/game-list/game-list.component';
import { GameFormComponent } from './components/game-form/game-form.component';

export const routes: Routes = [
    {
        path:'',
        redirectTo:'/games',
        pathMatch: 'full'
    },
    { 
        path:'games', //creo la ruta games
        component: GameListComponent //la ruta games renderiza un componente
    },
    {
        path:'games/add', //creo la ruta addgames
        component: GameFormComponent
    },
    {
        path:'games/edit/:id',
        component: GameFormComponent
    }
];

@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
})

export class AppRoutingModule{
    
}