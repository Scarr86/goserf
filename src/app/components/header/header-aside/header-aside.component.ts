import { Component, OnInit } from '@angular/core';
import { BeachService } from 'src/app/service/beach.service';
import { Observable } from 'rxjs';
import Beach from 'src/app/models/beach.model';

@Component({
  selector: 'app-header-aside',
  templateUrl: './header-aside.component.html',
  styleUrls: ['./header-aside.component.scss']
})
export class HeaderAsideComponent implements OnInit {
	date = new Date();
	beach$:Observable<Beach>;

	
  constructor(public beachService: BeachService) { }

  ngOnInit() {
	this.beach$ = this.beachService.currentBeach;
  }

}
