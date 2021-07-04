import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidatorComponent } from './components/validator/validator.component';



@NgModule({
  declarations: [
    ValidatorComponent
  ],
  imports: [
    CommonModule
  ],
  exports : [
    ValidatorComponent,
  ]
})
export class SharedModule { }
