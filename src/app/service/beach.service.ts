import { Injectable } from "@angular/core";
import { BehaviorSubject, of } from "rxjs";
import Beach, { Shore } from "../models/beach.model";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { pluck, map, catchError } from "rxjs/operators";
import { environment } from "src/environments/environment";

// new гаваи  доминикана  бразилия перу
@Injectable({ providedIn: "root" })
export class BeachService {
  private url = environment.beachsUrl;
  private _currentBeach: BehaviorSubject<Beach> = new BehaviorSubject(null);
  private _currentIndex = 0;
  beachs: Beach[];
  get currentBeach() {
    return this._currentBeach.asObservable();
  }

  constructor(private http: HttpClient) {}

  load() {
    return this.http.get(this.url).pipe(
      pluck<Object, Beach[]>("beachs"),
      map((data) => {
        this.beachs = data;
        this._currentBeach.next(this.beachs[this._currentIndex]);
      }),
      catchError((err) => {
        console.log(err);
        return of(err);
      })
    ).toPromise()
  }
  isCurrent(beach: Beach): boolean {
    return beach === this._currentBeach.getValue();
  }

  beachChange(beach: Beach) {
    this._currentIndex = this.beachs.indexOf(beach);
    this._currentBeach.next(beach);
    //  let params: HttpParams = new HttpParams().set("name", name);
    //  return this.http.get(this.url, { params }).pipe(
    //    pluck("beachs"),
    //    map((beachs: Beach[]) => beachs.find(b => b.name === name))
    //  );
  }
  beachNext() {
    this._currentIndex = ++this._currentIndex % this.beachs.length;
    this._currentBeach.next(this.beachs[this._currentIndex]);
  }
  beachPrev() {
    this._currentIndex = this._currentIndex
      ? (this._currentIndex -= 1)
      : this.beachs.length - 1;
    this._currentBeach.next(this.beachs[this._currentIndex]);
  }
}
