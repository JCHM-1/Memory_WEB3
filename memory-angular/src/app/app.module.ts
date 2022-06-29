import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';

import {MatToolbarModule} from '@angular/material/toolbar';
import { AppComponent } from './app.component';
import { AggregateComponent } from './components/aggregate/aggregate.component';
import { HttpClientModule } from "@angular/common/http";
import {HttpService} from "./services/http.service";
import { PlayersComponent } from './components/players/players.component';
import { HeaderComponent } from './components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    AggregateComponent,
    PlayersComponent,
    HeaderComponent
  ],
  imports: [
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
