import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'crm-dummy',
  templateUrl: './dummy.component.html',
  styleUrls: ['./dummy.component.scss']
})
export class DummyComponent implements OnInit {

  @Input()
  label: string= '';

  @Output()
  clicked= new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  buttonClicked() {
    console.log("button clicked");
    this.clicked.emit(`Hello from component with label ${this.label}`)
  }
}
