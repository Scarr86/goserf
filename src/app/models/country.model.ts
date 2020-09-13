import Beach from './beach.model';
import Airline from './airline.model';
import Resorts from './resorts.model';

export default interface Country {
  name: string;
  airline: string[];// Airline;
  resorts: string[];// Resorts;
}
