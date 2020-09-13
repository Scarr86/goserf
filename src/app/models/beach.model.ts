import Country from './country.model';

export interface Shore {
  title: string;
  bgi:string
}

export default interface Beach {
  country: string;
  state:string;
  name: string;
  bgi:string;
  shores: Shore[];
  coordinates:{
	  N:number,
	  W:number
  }
  condition: {
    surf: {
      min: number;
      max: number;
    };
    tide: number;
    wind: number;
  };
}
