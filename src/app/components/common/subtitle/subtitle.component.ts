import { Component, OnInit, Input, HostBinding } from "@angular/core";

@Component({
  selector: "app-subtitle",
  templateUrl: "./subtitle.component.html",
  styleUrls: ["./subtitle.component.scss"]
})
export class SubtitleComponent implements OnInit {
  @Input() title: string = "Title";
  @Input() subtitle: string = "SubTitle";
  @Input() fontSize: number = 40;

  @Input()
//   @HostBinding("class")
  orientation: string = "right";

  constructor() {}

  ngOnInit() {}
}
