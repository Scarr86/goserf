import { Component, OnInit, Inject, ViewChild } from "@angular/core";
import { AirlineService } from "src/app/service/airline.service";
import Airline from "src/app/models/airline.model";
import { BeachService } from "src/app/service/beach.service";
import Beach from "src/app/models/beach.model";
import {
  CONFIG_SLIDER,
  CONFIG_SLIDE_TRAVEL,
} from "src/app/service/slider.config";
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from "@angular/animations";
import { SlickCarouselComponent } from "ngx-slick-carousel";
import { pipe } from "rxjs";
import { delay } from "rxjs/operators";

export enum SlickFlag {
  next,
  prev,
}

@Component({
  selector: "app-travel",
  templateUrl: "./travel.component.html",
  styleUrls: ["./travel.component.scss"],
  //   changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: CONFIG_SLIDER,
      useValue: CONFIG_SLIDE_TRAVEL,
    },
  ],
  animations: [
    trigger("fly", [
      state(
        "out",
        style({
          right: "1920px",
          bottom: "338px",
          opacity: 0,
        })
      ),
      state(
        "in",
        style({
          right: "-43px",
          bottom: "0",
        })
      ),
      transition("* => out", [animate("700ms ease-in")]),
      transition("* => in", [
        style({
          right: "-800px",
          bottom: "-141px",
          opacity: 1,
        }),
        animate("500ms ease-out"),
      ]),
    ]),
  ],
})
export class TravelComponent implements OnInit {
  @ViewChild("slickModal", { static: false }) slick: SlickCarouselComponent;
  fly = "in";
  airlines: Airline[];
  beach: Beach;
  flag: number;
  constructor(
    private airlineService: AirlineService,
    private beachService: BeachService,
    @Inject(CONFIG_SLIDER) public slideConfig
  ) {}

  ngOnInit() {
    this.airlineService.airline.subscribe(
      (airlines) => (this.airlines = airlines)
    );
    this.beachService.currentBeach.subscribe((b) => (this.beach = b));
  }
  slickInit(ev) {
    this.airlineService.airline.subscribe((airlines) =>
      this.slick.slickGoTo(0)
    );
  }
  trackBySlide(i, item: Airline) {
    return i;
  }
  afterChange() {
    this.fly = "in";
  }
  next() {
    this.fly = "out";
    this.flag = SlickFlag.next;
  }
  prev() {
    this.fly = "out";
    this.flag = SlickFlag.prev;
  }
  done(ev) {
    if (ev.toState == "in") return;

    this.flag === SlickFlag.next
      ? this.slick.slickNext()
      : this.slick.slickPrev();
  }
}
