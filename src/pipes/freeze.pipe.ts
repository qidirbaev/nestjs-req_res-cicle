import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class FreezePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log('FreezePipe.transform() value:', value);
    return value;
  }
}