import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "time" })
export class TimePipe implements PipeTransform {
  transform(value: number): any {
    let days = Math.floor(value / (24 * 60));
    let hours = Math.floor((value % (24 * 60)) / 60);
    let minutes = Math.floor(value % 60);
    return `${days ? days + " day<br>" : ""}${hours ? hours + " hours<br>" : ""}${
      minutes ? minutes + " minutes" : ""
    }`;
  }
}
