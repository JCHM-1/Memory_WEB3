import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { single } from '../aggregate/data';
import {HttpClient} from "@angular/common/http";
import {TokenStorageService} from "../../services/token-storage.service";

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
		text: "Api\'s"
	  },
	  subtitles: [{
		text: "Percentage of players"
	  }],
	  data: [{
		type: "pie", //change type to column, line, area, doughnut, etc
		indexLabel: "{name}: {y}%",
		dataPoints: [
			{ name: "No api", y: 9.1 },
			{ name: "cats", y: 3.7 },
			{ name: "clouds", y: 36.4 },
			{ name: "dogs", y: 30.7 },
			{ name: "people", y: 20.1 }
		]
	  }]
  }

  public isDataAvailable:boolean=false;
  token: string | null;
  aantSpellen: number;
  aantSpelers: number;

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {
    this.token = ""
    this.aantSpellen = 0
    this.aantSpelers = 0
  }


  ngOnInit(): void {
    this.token =this.tokenStorage.getToken() as string
    console.log(this.token)
    this.getAggregateList()

  }

  getAggregateList() {
    this.http.get<any>('http://localhost:8000/api/admin/aggregate', {
      headers: {
        'Authorization': `bearer ${this.token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).subscribe(
      response => {
        this.aantSpellen = response[0]['aantal_spellen']
        this.aantSpelers = response[1]['aantal_spelers']
        console.log(response[2])
        console.log(response[2][0])
        console.log(this.chartOptions.data[0].dataPoints)
        for(let i=0; i<response[2].length; i++){
          console.log(response[2][i].aantal); //use i instead of 0
          this.chartOptions.data[0].dataPoints[i].y = response[2][i].aantal
        }
        this.isDataAvailable=true;
        console.log("na einde: ", this.chartOptions.data[0].dataPoints)

        if(response.status == 200){
          console.log(response)
        }
      });
  }

}
