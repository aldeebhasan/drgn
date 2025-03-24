export class User {

  public color: string = 'indigo';

  constructor(public id?: string, public name: string = '') {
    let colors = ['#F05252', '#3F83F8', '#0E9F6E', '#6875F5', '#6B7280', '#E74694', '#C27803', '#9061F9'];
    this.color = colors[Math.ceil(Math.random() * 100) % colors.length] || 'indigo';
  }
}
