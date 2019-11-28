import { Component, OnInit } from '@angular/core';
import {Hero} from "../../classes/fundamentals/hero";
import {HEROES} from "../../classes/mocks/mock-heroes";

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  hero: Hero = {
    id: 1,
    name:'Windstorm'
  };
  heroesList = HEROES;
  selectedHero: Hero;

  constructor() { }

  // initialization method called after creating component
  ngOnInit() {
  }

  onSelect(selected: Hero): void{
    this.selectedHero = selected;
  }
}
