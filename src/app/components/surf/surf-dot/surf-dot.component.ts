import {
  Component,
  OnInit,
  Input,
  ViewChild,
  TemplateRef,
  ViewContainerRef,
  AfterContentInit,
  AfterViewInit,
  ElementRef,
  Renderer2,
  AfterViewChecked,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  HostListener
} from "@angular/core";
import Beach from "src/app/models/beach.model";
import { BeachService } from "src/app/service/beach.service";
import { fromEvent } from "rxjs";

interface ContextTooltip {
  $implicit: Beach;
}

@Component({
  selector: "app-surf-dot",
  templateUrl: "./surf-dot.component.html",
  styleUrls: ["./surf-dot.component.scss"]
})
export class SurfDotComponent implements OnInit, AfterViewInit {
  @Input() beach: Beach;
  @ViewChild("toolTip", { static: false }) toolTipRef: ElementRef<HTMLElement>;
  @ViewChild("circle", { static: false }) circleRef: ElementRef<HTMLElement>;
  private curBeach: Beach;
  private isHover: boolean = false;

  @HostListener("mouseenter")
  onMouseEnter() {
    this.isHover = true;
  }
  @HostListener("mouseleave")
  onMouseLeave() {
    this.isHover = false;
  }

  get active() {
    return this.beachService.isCurrent(this.beach) || this.isHover;
  }
  constructor(
    private beachService: BeachService,
    private render: Renderer2,
    private el: ElementRef
  ) {}

  ngOnInit() {
    this.beachService.currentBeach.subscribe(b => {
      this.curBeach = b;
    });
  }

  ngAfterViewInit() {
    this.setPosition();
  }

  setPosition() {
    if (!this.toolTipRef) return;

    let top, left;

    const nativeTooltip = this.toolTipRef.nativeElement;
    const nativeCircle = this.circleRef.nativeElement;

    let coordCircle = nativeCircle.getBoundingClientRect();
    let circleWidth = nativeCircle.scrollWidth;

    let tooltipHeight = nativeTooltip.scrollHeight;
    let tootipWidth = nativeTooltip.scrollWidth;

    left = (circleWidth - tootipWidth) / 2;
    if (Math.abs(left) > coordCircle.left) {
      left = -coordCircle.left;
	 }
	 
    let diffRight =
      tootipWidth / 2 -
      (document.documentElement.clientWidth - coordCircle.right);

    if (diffRight > 0) {
      left -= diffRight;
    }
    top = -(tooltipHeight + 20);

    this.render.setStyle(nativeTooltip, "left", Math.floor(left) + "px");
    this.render.setStyle(nativeTooltip, "top", Math.floor(top) + "px");
  }
}
