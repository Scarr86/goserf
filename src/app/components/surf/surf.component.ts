import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  ChangeDetectorRef,
  ViewChildren,
  QueryList,
  Injectable,
  ElementRef,
  NgZone,
  ChangeDetectionStrategy,
  ContentChildren,
  Inject
} from "@angular/core";
import { BeachService } from "src/app/service/beach.service";
import Beach from "src/app/models/beach.model";
import { SlickCarouselComponent, SlickItemDirective } from "ngx-slick-carousel";
import { SurfSlideComponent } from "./surf-slide/surf-slide.component";
import { Observable, ReplaySubject, asapScheduler, fromEvent } from "rxjs";
import { tap, map, take, delay, observeOn } from "rxjs/operators";
import {
  CONFIG_SLIDER,
  CONFIG_SLIDE_SURF
} from "src/app/service/slider.config";

@Component({
  selector: "app-surf",
  templateUrl: "./surf.component.html",
  styleUrls: ["./surf.component.scss"],
  providers: [{ provide: CONFIG_SLIDER, useValue: CONFIG_SLIDE_SURF }],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SurfComponent implements OnInit, AfterViewInit {
  curBeach: Beach;
  beachs: Beach[];

  constructor(
    private beachService: BeachService,
    private cdr: ChangeDetectorRef,
    @Inject(CONFIG_SLIDER) public slideConfig
  ) {}

  ngOnInit() {
    this.beachs = this.beachService.beachs;

    this.beachService.currentBeach.subscribe(curBeach => {
      this.curBeach = curBeach;
      //   this.cdr.markForCheck();
	});
  }
  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  slickInit({ event, slick }) {
    $("app-surf-slide").on("click", ev => {
      const index = $(ev.currentTarget).data("slick-index");
      slick.slickGoTo(index);
    });
  }

  beforeChange({ event, slick, currentSlide, nextSlide }) {
    this.beachService.beachChange(this.beachs[nextSlide]);
  }

  trackBySlide(i, item) {
    return i;
  }
}
