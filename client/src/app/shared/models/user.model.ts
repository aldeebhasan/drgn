export class User {

  public color: string = 'indigo';

  constructor(public id?: string, public name: string = '') {
    let colors = ['red', 'blue', 'green', 'indigo', 'gray', 'amber', 'lime', 'orange'];
    this.color = colors[Math.ceil(Math.random() * 100) % colors.length] || 'indigo';
  }
}
