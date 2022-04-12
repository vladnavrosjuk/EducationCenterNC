import { Component, OnInit } from '@angular/core';
import {Routes} from "../routes";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor() { }

  public routes: typeof Routes = Routes;


  ngOnInit(): void {
  }

}
