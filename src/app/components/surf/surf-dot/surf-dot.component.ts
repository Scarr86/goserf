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
  HostListener,
} from "@angular/core";
import Beach from "src/app/models/beach.model";
import { BeachService } from "src/app/service/beach.service";
import { fromEvent } from "rxjs";
import { TooltopControl } from "src/app/directive/tooltip.directive";

interface ContextTooltip {
  $implicit: Beach;
}

@Component({
  selector: "app-surf-dot",
  templateUrl: "./surf-dot.component.html",
  styleUrls: ["./surf-dot.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SurfDotComponent implements OnInit, AfterViewInit {
  @Input() beach: Beach;
  @ViewChild("toolTip", { static: false }) toolTipRef: ElementRef<HTMLElement>;
  @ViewChild("circle", { static: false }) circleRef: ElementRef<HTMLElement>;
  private curBeach: Beach;
  private isHover: boolean = false;

  //   @HostListener("mouseenter", ["$event"])
  //   onMouseEnter(ev) {
  // 	this.isHover = true;
  // 	console.log(ev);

  //   }
  //   @HostListener("mouseleave")
  //   onMouseLeave() {
  //     this.isHover = false;
  //   }
  get isShow() {
    return this.beachService.isCurrent(this.beach);
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
    this.beachService.currentBeach.subscribe((b) => {
      this.curBeach = b;
    });
  }

  ngAfterViewInit() {
    //this.setPosition();
  }

  //   setPosition() {
  //     if (!this.toolTipRef) return;

  //     let top, left;

  //     const nativeTooltip = this.toolTipRef.nativeElement;
  //     const nativeCircle = this.circleRef.nativeElement;

  //     let coordCircle = nativeCircle.getBoundingClientRect();
  //     let circleWidth = nativeCircle.offsetWidth;

  //     let tooltipHeight = nativeTooltip.offsetWidth;
  //     let tootipWidth = nativeTooltip.offsetWidth;

  //     left = coordCircle.left + (circleWidth - tootipWidth) / 2;
  //     left = Math.max(left, 0);
  //     // console.log(coordCircle, circleWidth, tootipWidth, left );

  //     // if (Math.abs(left) > coordCircle.left) {
  //     //   left = -coordCircle.left;
  //     //  }

  //     let diffRight =
  //       tootipWidth / 2 -
  //       (document.documentElement.clientWidth - coordCircle.right);

  //     if (diffRight > 0) {
  //       left -= diffRight;
  //     }
  //     top = -(tooltipHeight + 20);

  //     this.render.setStyle(nativeTooltip, "left", Math.floor(left) + "px");
  //     this.render.setStyle(nativeTooltip, "top", Math.floor(top) + "px");
  //   }
}
