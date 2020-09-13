import { Component, OnInit, Input, HostBinding } from "@angular/core";
import { Shore } from "src/app/models/beach.model";

@Component({
  selector: "app-header-slide",
  templateUrl: "./header-slide.component.html",
  styleUrls: ["./header-slide.component.scss"]
})
export class HeaderSlideComponent implements OnInit {
  @Input() shore: Shore;
  constructor() {}

  ngOnInit() {}
}
