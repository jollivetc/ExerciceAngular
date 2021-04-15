import { Component, OnInit } from '@angular/core';
import { DemoObservableService } from '../common/demo-observable.service';
import { map, take } from 'rxjs/operators'

@Component({
  selector: 'crm-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private demoObservable: DemoObservableService) { }

  ngOnInit(): void {
  }

  launchDemo(){
    this.demoObservable.test1().pipe(
        map( value => value *10),
        take(2)
    ).subscribe(
      (result)=>{console.log(`received result : ${result}`)},
      (error)=>{console.error(error)},
      ()=>{console.log('complete')}
    )
  }

}
