import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "newline" })
export class NewLinePipe implements PipeTransform {
  transform(value: string, separator:string = ' ',  fill: string = "<br>"): any {
	  return value.split(separator).join(fill)
  }
}
