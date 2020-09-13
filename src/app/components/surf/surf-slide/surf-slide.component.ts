import {
  Component,
  OnInit,
  Input,
  ElementRef,
  Renderer2,
  Output,
  EventEmitter,
  HostBinding
} from "@angular/core";
import Beach from "src/app/models/beach.model";
import { BeachService } from "src/app/service/beach.service";
import { Observable, fromEvent } from "rxjs";
import { map, tap } from "rxjs/operators";

@Component({
  selector: "app-surf-slide",
  templateUrl: "./surf-slide.component.html",
  styleUrls: ["./surf-slide.component.scss"]
})
export class SurfSlideComponent implements OnInit {
  @Input() beach: Beach;
  @Input() active: boolean = true;

  constructor(private el: ElementRef, private render: Renderer2) {}

  ngOnInit() {
    this.render.setStyle(
      this.el.nativeElement,
      "background-image",
      `url(${this.beach.bgi})`
    );
  }
}
