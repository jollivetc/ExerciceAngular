import { ANALYZE_FOR_ENTRY_COMPONENTS, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ConsumerService } from '../consumer.service';

@Component({
  selector: 'crm-consumer-fiche',
  templateUrl: './consumer-fiche.component.html',
  styleUrls: ['./consumer-fiche.component.scss']
})
export class ConsumerFicheComponent implements OnInit {

  consumerForm:FormGroup;

  constructor(private consumerService: ConsumerService, private router:Router, private activatedRoute:ActivatedRoute) {
    this.consumerForm = new FormGroup({
      civility: new FormControl(),
      firstname: new FormControl(),
      lastname: new FormControl(),
      email: new FormControl('', [Validators.email]),
      phone: new FormControl(),
      id:new FormControl(),
      createdAt: new FormControl(),
      updatedAt: new FormControl()
    });
   }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(
      (paramMap:ParamMap)=>{
        const id = paramMap.get('id')
        if(id !== null){
          this.consumerService.getConsumerById(id).subscribe(
            (consumer)=>{
              this.consumerForm.patchValue(consumer)
            },
            (error)=>{console.error(error)},
            ()=>{}
          )
        }
      }
    )
  }

  validate(){
    this.consumerService.saveConsumer(this.consumerForm.value)
      .subscribe(
        (result)=>{ this.router.navigateByUrl('/consumers')},
        (error)=>{console.error(error)},
        ()=>{}
      )
  }
}
