import { Injectable } from "@angular/core";
import Resorts from "../models/resorts.model";
import { Observable } from "rxjs";
import { HttpClient, HttpParams } from "@angular/common/http";
import { BeachService } from "./beach.service";
import { switchMap, pluck, map, repeat, reduce } from "rxjs/operators";
import Beach from "../models/beach.model";
import { environment } from "src/environments/environment";

@Injectable({ providedIn: "root" })
export class ResortsService {
  resorts: Observable<Resorts[]>;
  private url = environment.resortsUrl;
  constructor(private http: HttpClient, private beachService: BeachService) {
    this.resorts = this.beachService.currentBeach.pipe(
      switchMap(this.getResortsByCoutry.bind(this))
    );
  }

  private getResortsByCoutry(beach: Beach) {
    let params: HttpParams = new HttpParams().set("country", beach.country);
    return this.http.get(this.url, { params }).pipe(
      pluck<Object, Resorts[]>("resorts"),
      map((resorts) =>
        resorts.filter((a) =>
          a.country
            .toLocaleLowerCase()
            .includes(beach.country.toLocaleLowerCase())
        )
      ),
      repeat(4),
      reduce((acc, res, i) => {
		  if (acc.length == 0) return [];
		  
        res[0].name += ` ${i}`;
        res[0].price = i == 0 ? res[0].price : this.randomInteger(15, 18);
        res[0].rating = Math.floor(this.randomInteger(2, 5));
        return acc.concat(res);
      })
    );
  }
  randomInteger(min, max) {
    let rand = min + Math.random() * (max - min + 1);
    rand = Math.floor(rand * 10);
    return rand / 10;
  }
}
