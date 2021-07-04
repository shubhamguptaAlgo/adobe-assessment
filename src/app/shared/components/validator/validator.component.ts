import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, AbstractControlDirective } from '@angular/forms';

@Component({
  selector: 'app-validator',
  template:`
  <div *ngIf="shouldShowErrors()">
    <span *ngFor="let error of listOfErrors()" class="errorMsg">
      <i class="fa fa-exclamation-triangle"></i> {{error}}
    </span>
  </div>
`,
  styleUrls: ['./validator.component.css']
})
export class ValidatorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }
  private static readonly errorMessages:any = {
    'required': () => 'This field is required',
    'pattern': (params : any) => 'Invalid no.',
    'minlength': (params : any) => 'The min number of characters is ' + params.requiredLength,
    'maxlength': (params : any) => 'The max allowed number of characters is ' + params.requiredLength,
  };

  @Input() public control: AbstractControlDirective | AbstractControl;

  shouldShowErrors(): any {
    return this.control &&
      this.control.errors &&
      (this.control.dirty || this.control.touched);
  }

  listOfErrors(): string[] {
    let error:any = this.control.errors
    return Object.keys(error)
      .map(field => this.getMessage(field, error[field]));
  }
  
  private getMessage(type: string, params: any){
    return ValidatorComponent.errorMessages[type](params);
  }


}
