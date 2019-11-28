import {Component, OnInit} from '@angular/core';
import {Hero} from "../../classes/fundamentals/hero";
import {HeroService} from "../services/hero.service";

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
  heroesList: Hero[];
  selectedHero: Hero;

  constructor(private heroService: HeroService) { }

  // initialization method called after creating component
  ngOnInit() {
    this.getHeroesListFromService();
  }

  onSelect(selected: Hero): void{
    this.selectedHero = selected;
  }

  private getHeroesListFromService(): void{
    // subscribe is for async witing for data from service
    this.heroService.getHeroes().subscribe(heroes => this.heroesList = heroes)
  }
}
