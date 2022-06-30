import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from "@angular/common/http";
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import {HomeComponent} from "./components/home/home.component";
import { HeaderComponent } from './components/header/header.component';
import { AggregateComponent } from './components/aggregate/aggregate.component';
import { PlayersComponent } from './components/players/players.component';

import {DataService} from "./services/data.service";



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
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
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
