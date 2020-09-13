import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-arrows',
  templateUrl: './arrows.component.html',
  styleUrls: ['./arrows.component.scss']
})
export class ArrowsComponent implements OnInit {

  @Output() prev = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();
  constructor() { }
  ngOnInit() {
  }
}
