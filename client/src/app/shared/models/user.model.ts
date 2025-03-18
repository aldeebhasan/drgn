export class User {

  constructor(public id?: string, public name: string = '') {
  }

  symbol(): string {
    return this.name.slice(0, 2).toUpperCase();
  }
}
