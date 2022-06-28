import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-aggregate',
  templateUrl: './aggregate.component.html',
  styleUrls: ['./aggregate.component.scss']
})
export class AggregateComponent implements OnInit {
  token: string;

  constructor(private route: ActivatedRoute, private router: Router ) {
  this.token = "";
  }

  ngOnInit() {
    this.route.params
      .subscribe(params => {
        this.token = params['token']
        localStorage.setItem('token', this.token)
        this.router.navigate([''], { relativeTo: this.route })
      })
  }

}
