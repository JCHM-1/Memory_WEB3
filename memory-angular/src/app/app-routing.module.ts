import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {AggregateComponent} from "./components/aggregate/aggregate.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'token/:token',
    component: AggregateComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
