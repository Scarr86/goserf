import { BrowserModule } from "@angular/platform-browser";
import { NgModule, APP_INITIALIZER } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppComponent } from "./app.component";

// Import your library
import { SlickCarouselModule, SlickItemDirective } from "ngx-slick-carousel";
import { HeaderComponent } from "./components/header/header.component";
import { ArrowsComponent } from "./components/common/arrows/arrows.component";
import { HttpClientModule } from "@angular/common/http";
import { BeachService } from "./service/beach.service";
import { TitleComponent } from "./components/common/title/title.component";
import { SurfComponent } from "./components/surf/surf.component";
import { TravelComponent } from "./components/travel/travel.component";
import { SleepComponent } from "./components/sleep/sleep.component";
import { ShopComponent } from "./components/shop/shop.component";
import { SubtitleComponent } from "./components/common/subtitle/subtitle.component";
import { HeaderSlideComponent } from "./components/header/header-slide/header-slide.component";
import { HeaderMapComponent } from "./components/header/header-map/header-map.component";
import { HeaderAsideComponent } from "./components/header/header-aside/header-aside.component";
import { SurfSlideComponent } from "./components/surf/surf-slide/surf-slide.component";
import { ScrollToDirective } from "./directive/scrollto.directive";
import { SurfDotComponent } from "./components/surf/surf-dot/surf-dot.component";
import { TimePipe } from "./components/travel/time.pipe";
import { NewLinePipe } from './components/travel/newline';

function loadBeachs(beachService: BeachService) {
  return () => beachService.load();
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ArrowsComponent,
    TitleComponent,
    SurfComponent,
    TravelComponent,
    SleepComponent,
    ShopComponent,
    SubtitleComponent,
    HeaderSlideComponent,
    HeaderMapComponent,
    HeaderAsideComponent,
    SurfSlideComponent,
    ScrollToDirective,
    SurfDotComponent,
	 TimePipe,
	 NewLinePipe,
  ],
  imports: [
    BrowserModule,
    SlickCarouselModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: loadBeachs,
      deps: [BeachService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
