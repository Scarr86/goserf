import { InjectionToken } from "@angular/core";

export const CONFIG_SLIDER_HEADER = {
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  dots: false,
  infinite: true,
  fade: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 1
      }
    }
  ]
};

export const CONFIG_SLIDE_SURF = {
  slidesToShow: 4,
  slidesToScroll: 1,
  infinite: true,
 
  arrows: false
};

export const CONFIG_SLIDE_TRAVEL = {
	slidesToShow: 1,
	slidesToScroll: 1,
	infinite: true,
	fade: true,
	arrows: false,
 };

export let CONFIG_SLIDER = new InjectionToken("configSider");
