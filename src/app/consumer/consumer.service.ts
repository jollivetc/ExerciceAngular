import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Consumer } from './model/consumer';

@Injectable({
  providedIn: 'root'
})
export class ConsumerService {

  constructor(private http:HttpClient) { }

  getConsumers(){
    //GET http://localhost:4200/api/consumers
    return this.http.get<Consumer[]>('/api/consumers');
  }

  getConsumerById(id:string){
    // GET http://localhost:4200/api/consumers/id
    return this.http.get<Consumer>(`/api/consumers/${id}`);
  }

  getFilteredConsumers(filter:string){
    //GET http://localhost:4200/api/consumers?q=XXXXXX
    return this.http.get<Consumer[]>('/api/consumers', {params:{q: filter}});
  }

  deleteConsumer(id:number){
    //DELETE http://localhost:4200/api/consumers/ID
    return this.http.delete(`/api/consumers/${id}`);
  }

  saveConsumer(consumer:Consumer){
    //POST http://localhost:4200/api/consumers
    //PUT http://localhost:4200/api/consumers/ID
    if(consumer.id){
     return this.http.put<Consumer>(`/api/consumers/${consumer.id}`, consumer)
    }
    return this.http.post<Consumer>('/api/consumers', consumer);
  }
}
