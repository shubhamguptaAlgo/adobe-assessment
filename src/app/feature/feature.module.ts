import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartmentViewComponent } from './component/department/department-view/department-view.component';
import { HospitalViewComponent } from './component/hospital/hospital-view/hospital-view.component';
import { FeatureRoutingModule } from './feature-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    DepartmentViewComponent,
    HospitalViewComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    FeatureRoutingModule
  ]
})
export class FeatureModule { }
