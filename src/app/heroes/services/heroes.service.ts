import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from "rxjs";
import { Hero } from "../interfaces/hero.interfaces";
import { environmets } from "../../../environments/environments";



@Injectable({providedIn: 'root'})
export class HeroesService {

  private baseUrl: string = environmets.baseUrl;

  constructor(private httpClient: HttpClient) {

  }

  getHeroes(): Observable<Hero[]>{
    return this.httpClient.get<Hero[]>(`${this.baseUrl}/heroes`);
  }

  getHeroById(id: string): Observable<Hero | undefined>{
    return this.httpClient.get<Hero>(`${this.baseUrl}/heroes/${id}`)
    .pipe(
      catchError(err=> of(undefined))
    )
  }

  getSuggestions(query: string): Observable<Hero[]>{

    return this.httpClient.get<Hero[] >(`${this.baseUrl}/heroes?q=${query}&_limit=6`);
  }


  addHero(hero: Hero): Observable<Hero>{
    const whithOutId = {...hero, id: undefined}
    return this.httpClient.post<Hero>(`${this.baseUrl}/heroes`, whithOutId);
  }

  updateHero(hero: Hero): Observable<Hero>{
    if(!hero.id) throw Error ('Hero id is required')
    return this.httpClient.patch<Hero>(`${this.baseUrl}/heroes/${hero.id}`, hero);
  }
  deleteHeroById(id: string): Observable<boolean>{

    return this.httpClient.delete(`${this.baseUrl}/heroes/${id}`)
    .pipe(
      map( resp => true),
      catchError(err=> of(false))

    )
  }



}
