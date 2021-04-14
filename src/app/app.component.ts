import { Component } from '@angular/core';

@Component({
  selector: 'crm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Formation Angular';

  fruits = ['apple', 'pear', 'banana'];

  clicked($event: MouseEvent): void{
    console.log($event);
  }

  dummyClicked(event: string){
    console.log(event)
  }
}
