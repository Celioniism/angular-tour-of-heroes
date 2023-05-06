import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pingleApp/home/home.component';
import { GameComponent } from './pingleApp/game/game.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { GrowComponent } from './pingleApp/game/grow/grow.component';
import { MovementEngine } from './pingleApp/game/grow/tomoComponents/TomoMovementEngine';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GameComponent,
    HeaderComponent,
    FooterComponent,
    GrowComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [MovementEngine],
  bootstrap: [AppComponent],
})
export class AppModule {}
