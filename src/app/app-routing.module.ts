import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pingleApp/home/home.component';
import { GameComponent } from './pingleApp/game/game.component';
import { GrowComponent } from './pingleApp/game/grow/grow.component';
import { ErrorComponent } from './shared/error/error.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      { path: 'home', component: HomeComponent },
    ],
  },
  {
    path: 'game',
    component: GameComponent,
  },
  {
    path: 'grow',
    component: GrowComponent,
  },
  {
    path: '**',
    component: ErrorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
