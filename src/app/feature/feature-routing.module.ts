import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HospitalViewComponent } from './component/hospital/hospital-view/hospital-view.component';
import { DepartmentViewComponent } from './component/department/department-view/department-view.component';

const routes: Routes = [
  { path: '', redirectTo: 'hospital', pathMatch: 'full' },
  {
    path : 'hospital',
    component : HospitalViewComponent,
  },
  {
    path: 'department',
    component: DepartmentViewComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class FeatureRoutingModule { }
