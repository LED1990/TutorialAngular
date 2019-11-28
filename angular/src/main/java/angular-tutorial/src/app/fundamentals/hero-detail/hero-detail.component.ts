import { Component, OnInit, Input } from '@angular/core';
import {Hero} from "../../classes/fundamentals/hero";
import {ActivatedRoute} from "@angular/router";
import {HeroService} from "../services/hero.service";
import {Location} from "@angular/common";

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private heroService: HeroService,
              private location: Location) { }

  ngOnInit() {
    this.getHero();
  }

  @Input() hero: Hero; //since details comes from route @Input isn't necessery (left just to remember)

  private getHero():void{
    const id = +this.route.snapshot.paramMap.get('id'); //'+' at the beggining is to convert nubmer to string
    this.heroService.getHero(id).subscribe(result => this.hero = result);
  }

  goBack(): void{
    this.location.back();
  }

}
