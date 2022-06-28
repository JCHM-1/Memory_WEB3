import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";

export class Data {
  constructor(

  ){
  }
}
@Component({
  selector: 'app-aggregate',
  templateUrl: './aggregate.component.html',
  styleUrls: ['./aggregate.component.scss']
})
export class AggregateComponent implements OnInit {

  constructor(private http: HttpClient) {
    this.getAggregateList();
  }

  ngOnInit(): void {
  }

  getAggregateList(){
    this.http.get<any>('http://localhost:8000/api/admin/aggregate',{
      headers: {
        'Authorization' : `bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsInN1YiI6MTMsImlzcyI6Im1lbW9yeSBiYWNrZW5kIn0.eyJpYXQiOjE2NTY0NDM5MjYsImV4cCI6MTY1NjQ0NzUyNiwic3ViIjoiMTMiLCJpc3MiOiJtZW1vcnkgYmFja2VuZCIsInJvbGVzIjpbIlJPTEVfVVNFUiIsIlJPTEVfQURNSU4iXSwidXNlcm5hbWUiOiJIZW5rIn0.Bl7HdDA_7G7o19RAJiXAshetkNuprQcvNuT25AXHTewBLC0VunD0MkQW7FeB6uXohYkJRn5_gpdaPB5veII1SjFttga3W85hP8J7YgPF8s57AkQW-h8oWzQzzID8HCIWfEuCAK61kbS7p2KXTHO0ZizXOX-RRXCZDzw2S5GTj6yC3QLv6_ZaTYlCB_RT5DwawWUMWjS4J6LcCKYJGyDl4cYK6CD8TVbw72RmrbUqK93BpAUzt3e23HRX67dJ6i0znucesXiEHxoq0GkmJIQBWITfGDfrp5sKv85XfKUkrmhMTe6icHocVB_Jo4wPGMB26HCkKLNSkXhoL-lIuFdn1PCzmcT-Z93viiZtOG6uqMBXrAha_0dFXJOZ1w4HRMy7g7FNANT1peFAZ7ssdUAnf4m10qkqgikgveAPolQBfRp4H5BV4kxpOVDBnlYmj9_0eZwmgWpWXK6uvluuvlEdButqaRA_b9ZoAL4wiugSmXM2QzcXtZEhZK3cx-Ph6fXPEBoLtLe_Rmhr7SVl0ZfV1GbT2RRXPn82ESvsTFehtNooAoF-5bvIML1fq6OZf9Y-QRnYS9ZqOOHmkRHKQg1kVUsozUCx-fVb6efOb73QtvjINq7cJP0lPrYyGFjJTQk1H9yhoOO1Wgjx_susZ981U30VBZb2SVoTKXI4ogObWuQ`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'}
    }).subscribe(
      response => {
        console.log(response);
      });

    console.log(sessionStorage)
  }
}
