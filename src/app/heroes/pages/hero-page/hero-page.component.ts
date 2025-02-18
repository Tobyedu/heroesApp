import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, switchMap } from 'rxjs';
import { Hero } from '../../interfaces/hero.interfaces';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styles: ``
})
export class HeroPageComponent implements OnInit {


  public hero? : Hero;


  constructor(
    private heroService:HeroesService,
    private activatedRoute: ActivatedRoute,
    private route: Router

  ) {

  }
  ngOnInit(): void {

    this.activatedRoute.params
    .pipe(

      switchMap(({ id }) => this.heroService.getHeroById(id)),

    ).subscribe( hero => {
      if(!hero) return this.route.navigate(['/heroes/list']);

      this.hero = hero;
      console.log(hero)
      return;
    })

  }

  goBack(){
    this.route.navigateByUrl('heroes/list')
  }




}
