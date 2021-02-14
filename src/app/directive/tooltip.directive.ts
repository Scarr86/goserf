import {
  Directive,
  TemplateRef,
  ViewContainerRef,
  Input,
  EmbeddedViewRef,
  HostListener,
  Renderer2,
  SimpleChanges,
  OnInit,
  DoCheck,
  OnChanges,
  AfterContentInit,
  AfterContentChecked,
  AfterViewChecked,
  AfterViewInit,
} from "@angular/core";
export interface TooltopControl {
  show: () => void;
  hide: () => void;
  toggle: () => void;
}

export interface TooltipContext {
  $implicit: TooltopControl;
}

@Directive({
  selector: "[appTooltip]",
})
export class TooltipDirective {
  @Input("appTooltip") tooltipRef: TemplateRef<any> = null;
  @Input("appTooltipContext") tooltipContext: any = null;
  @Input("appTooltipShow") isShow: boolean = false;
  tooltipView: EmbeddedViewRef<any> = null;
  context: TooltipContext;
  private log(msg: string) {
    console.log(msg);
  }
  ngOnChanges() {
	if (this.isShow) this.show();
	  console.log("ngOnChanges", this.isShow);
	  
  }
  ngDoCheck() {}
  ngAfterViewInit() {}
  ngAfterViewChecked() {}
  ngAfterContentInit() {}
  ngAfterContentChecked() {}
  constructor(
    private tpl: TemplateRef<TooltipContext>,
    private vcr: ViewContainerRef,
    private render2: Renderer2
  ) {}
  ngOnInit(): void {
    this.log(`ngOnInit`);
    this.context = {
      $implicit: {
        hide: this.hide.bind(this),
        show: this.show.bind(this),
        toggle: this.toggle.bind(this),
      },
    };
    this.vcr.createEmbeddedView(this.tpl, this.context);

    this.tooltipView = this.tooltipRef.createEmbeddedView({
      $implicit: this.tooltipContext,
    });
    const el = (this.tpl.elementRef.nativeElement as HTMLElement)
      .nextElementSibling;
    //this.render2.listen(el, "mouseenter", this.show.bind(this));
    //this.render2.listen(el, "mouseleave", this.hide.bind(this));

    this.render2.destroy = () => {
      (this.tooltipView.rootNodes[0] as HTMLElement).remove();
    };
    
  }

  timerId;
  show() {
    this.timerId = setTimeout(this.addTooltip.bind(this), 200);

    // this.isShow = true;
  }
  hide() {
    clearTimeout(this.timerId);
    this.removeTooltip();
    // this.isShow = false;
  }
  toggle() {
    this.isShow = !this.isShow;
  }

  addTooltip() {
    const tooltipEl = this.tooltipView.rootNodes[0] as HTMLElement;
    const el = (this.tpl.elementRef.nativeElement as HTMLElement)
      .nextElementSibling as HTMLElement;

    let coord = el.getBoundingClientRect();
    let top = coord.top + window.pageYOffset;
    let width = el.offsetWidth;

    this.render2.appendChild(document.body, tooltipEl);
    this.tooltipView.detectChanges();

    let heightTooltip = tooltipEl.offsetHeight;
    let widthTooltip = tooltipEl.offsetWidth;

    let left = coord.left + window.pageXOffset + (width - widthTooltip) / 2;
    if (left < 0) left = 0;
    this.render2.setStyle(tooltipEl, "left", left + "px");
    let coordTooltip = tooltipEl.getBoundingClientRect();
    console.log(
      coordTooltip.right,
      document.documentElement.clientWidth,
      widthTooltip,
      document.documentElement.clientWidth - widthTooltip
    );
    if (coordTooltip.right > document.documentElement.clientWidth) {
      this.render2.setStyle(
        tooltipEl,
        "left",
        document.documentElement.clientWidth - widthTooltip + "px"
      );
    }

    this.render2.setStyle(tooltipEl, "top", top - heightTooltip - 5 + "px");

    // if (coordTooltip.bottom > document.documentElement.clientHeight) {
    //   this.render2.setStyle(tooltipEl, "top", top - heightTooltip - 10 + "px");
    // }
    // console.log(tooltipEl);

    // console.log(`left: ${left} top: ${top} height: ${height}`);
  }
  removeTooltip() {
    this.render2.destroy();
  }
}
