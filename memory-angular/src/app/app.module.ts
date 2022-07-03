import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { FormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import * as CanvasJSAngularChart from '../assets/canvasjs.angular.component'
var CanvasJSChart = CanvasJSAngularChart.CanvasJSChart;

import { NgxChartsModule } from '@swimlane/ngx-charts';

import { AppComponent } from './app.component';
import {HomeComponent} from "./components/home/home.component";
import { AggregateComponent } from './components/aggregate/aggregate.component';
import { PlayersComponent } from './components/players/players.component';
import { HttpClientModule } from '@angular/common/http';

import { HeaderComponent } from './components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { ModalComponent } from './components/modal/modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AggregateComponent,
    PlayersComponent,
    HeaderComponent,
    LoginComponent,
    ModalComponent,
    CanvasJSChart
  ],
  imports: [
    FormsModule,
    NgxChartsModule,
    MatTabsModule,
    MatInputModule,
    MatCardModule,
    MatFormFieldModule,
    MatDialogModule,
    MatTooltipModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
