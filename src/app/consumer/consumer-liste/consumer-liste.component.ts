import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ConsumerService } from '../consumer.service';
import { Consumer } from '../model/consumer';

@Component({
  selector: 'crm-consumer-liste',
  templateUrl: './consumer-liste.component.html',
  styleUrls: ['./consumer-liste.component.scss']
})
export class ConsumerListeComponent implements OnInit {

  consumers: Consumer[] = [];
  searchForm: FormGroup;

  constructor(private consumerService : ConsumerService, private router:Router) {
    this.searchForm = new FormGroup({
      searchField: new FormControl()
    });
  }

  ngOnInit(): void {
    this.loadConsumers();
  }

  private loadConsumers(){
    this.consumerService.getConsumers().subscribe(
      (result)=>{ this.consumers = result},
      (error)=>{console.log(error)},
      ()=>{}
    )
  }

  search(){
    this.consumerService.getFilteredConsumers(this.searchForm.value.searchField)
      .subscribe(
        (result)=>{this.consumers = result},
        (error)=>{console.error(error)},
        ()=>{}
      )
  }

  deleteConsumer(id:number){
    this.consumerService.deleteConsumer(id)
      .subscribe(
        (result)=>{
          this.loadConsumers();
        },
        (error)=>{console.error(error)},
        ()=>{}
      )
  }

}
