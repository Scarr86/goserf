import { Component, OnInit } from "@angular/core";
import { ResortsService } from "src/app/service/resorts.service";
import Resort from "src/app/models/resorts.model";
import { BeachService } from "src/app/service/beach.service";

@Component({
  selector: "app-sleep",
  templateUrl: "./sleep.component.html",
  styleUrls: ["./sleep.component.scss"],
})
export class SleepComponent implements OnInit {
  resorts: Resort[] = [];
  indxResort: number = 0;

  nights: number = 5;
  guests: number = 4;

  constructor(
    private resortsService: ResortsService,
    private beachService: BeachService
  ) {}

  ngOnInit() {
    this.resortsService.resorts.subscribe((r) => {
      this.resorts = r;
    });
  }

  next() {
    this.indxResort++;
    if (this.indxResort > this.resorts.length - 1) this.indxResort = 0;
  }
  prev() {
    this.indxResort--;
    if (this.indxResort < 0) this.indxResort = this.resorts.length - 1;
  }

  getPrice() {
    if (this.resorts.length)
      return this.guests * this.resorts[this.indxResort].price;
    else return 0;
  }
  setNights(num) {
    this.nights = this.nights + num < 1 ? 1 : this.nights + num;
  }
  setGuests(num) {
    this.guests = this.guests + num < 1 ? 1 : this.guests + num;
  }
}
