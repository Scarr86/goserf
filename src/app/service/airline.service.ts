import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import Airline from "../models/airline.model";
import { Observable } from "rxjs";
import { BeachService } from "./beach.service";
import { environment } from "src/environments/environment";
import { pluck, switchMap, map, filter, repeat, reduce } from "rxjs/operators";
import Beach from "../models/beach.model";

@Injectable({ providedIn: "root" })
export class AirlineService {
  private url = environment.travelUrl;
  airline: Observable<Airline[]>;

  constructor(private http: HttpClient, private beachService: BeachService) {
    this.airline = this.beachService.currentBeach.pipe(
      switchMap(this.getAirlineByCountry.bind(this))
    );
  }
  getAirlineByCountry(beach: Beach) {
    let params: HttpParams = new HttpParams(); //.set("name", name);
    params.set("country", beach.country);
    return this.http.get(this.url, { params }).pipe(
      pluck<Object, Airline[]>("airline"),
      map(airlines =>
        airlines.filter(a =>
          a.destination
            .toLocaleLowerCase()
            .includes(beach.country.toLocaleLowerCase())
        )
      ),
      repeat(4),
      reduce((acc, air, i) => {
        // debugger;
        air[0].name += ` ${i}`;
        air[0].price = Math.floor(Math.random() * 1000 + 1000);
        air[0].time = Math.floor(Math.random() * 100 + 1000);
        air[0].distance = Math.floor(Math.random() * 1000 + 7000);
        return acc.concat(air);
      })
    );
  }
}
