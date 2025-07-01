import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "toSymbol",
})
export class ToSymbolPipe implements PipeTransform {
    transform(value: unknown, ...args: unknown[]): unknown {
        return (value as string)?.slice(0, 2).toUpperCase() || "UK";
    }
}
