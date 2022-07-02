import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { single } from '../aggregate/data';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];


@Component({
  selector: 'app-aggregate',
  templateUrl: './aggregate.component.html',
  styleUrls: ['./aggregate.component.scss']
})
  
export class AggregateComponent {
	chartOptions = {
	  animationEnabled: true,
	  theme: "dark2",
	  exportEnabled: true,
	  title: {
		text: "Developer Work Week"
	  },
	  subtitles: [{
		text: "Median hours/week"
	  }],
	  data: [{
		type: "pie", //change type to column, line, area, doughnut, etc
		indexLabel: "{name}: {y}%",
		dataPoints: [
			{ name: "Overhead", y: 9.1 },
			{ name: "Problem Solving", y: 3.7 },
			{ name: "Debugging", y: 36.4 },
			{ name: "Writing Code", y: 30.7 },
			{ name: "Firefighting", y: 20.1 }
		]
	  }]
  }
}  
