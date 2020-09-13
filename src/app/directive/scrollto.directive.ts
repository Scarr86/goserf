import {
  Directive,
  Input,
  ViewContainerRef,
  TemplateRef,
  OnInit,
  ElementRef
} from "@angular/core";

@Directive({
  selector: "[scrollTo]",
  host: { "(click)": "onClick($event)" }
})
export class ScrollToDirective implements OnInit {
  context = null;
  @Input("scrollTo") id: string = "class to need scroll";

  constructor() {}
  ngOnInit() {}
  onClick(ev:MouseEvent) {
	  ev.preventDefault();
    let el = document.querySelector(`.${this.id}`) as HTMLElement;
    el.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }
}
