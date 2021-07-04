import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Department } from 'src/app/feature/interfaces/department';
import { CommonService } from 'src/app/feature/service/common.service';
import { HospitalService } from 'src/app/feature/service/hospital.service';
import { ModalService } from 'src/app/feature/service/modal.service';
import { apiUrls } from 'src/app/shared/constants/apiUrl';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-department-view',
  templateUrl: './department-view.component.html',
  styleUrls: ['./department-view.component.css']
})
export class DepartmentViewComponent implements OnInit {
  departments$: Observable<Department[]>;
  departmentForm : FormGroup;
  department:any;
  hospitalName : string;

  constructor(private _modalService : ModalService,
    private fb : FormBuilder,
    private _activatedRoute : ActivatedRoute,
    private _hospitalService : HospitalService) { }

  ngOnInit(): void {
    
    this._activatedRoute.queryParams
    .subscribe(params => {
      console.log(params);
      this.hospitalName = params.name;
      console.log("HN:",this.hospitalName); 
      this.createForm();
      this.getDepartmentList(this.hospitalName);
    }
  );
  }


   /**
   * Creates form
   */
    createForm(){
      this.departmentForm  = this.fb.group({
        departmentname : ["",[Validators.required]],
        head : ["", [Validators.required]],
        contactnumber : ["",[Validators.required, Validators.pattern(/^[6-9]\d{9}$/),
         Validators.maxLength(10), Validators.minLength(10)]],
        hospitalname : [this.hospitalName,[Validators.required]],
      })
    }

     /**
      * Gets department list
      */
  getDepartmentList(hospitalName:string){

     let params = {
       hospitalName : hospitalName
     }


    let url = environment.baseUrl + apiUrls.getDepartment
    this.departments$ = this._hospitalService.get(url, params).pipe(
      map((res: any) => {
            return res.data;
      }),
    );
  }



  /**
   * Deletes department
   */
  deleteDepartment(){
    let url = environment.baseUrl + apiUrls.deleteDepartment+"/"+this.department.departmentname;
     this._hospitalService.delete(url,{})
     .subscribe((res:Department)=>{
       this.onCloseModal('deleteModal')
       this.getDepartmentList(this.hospitalName);
     })
  }




 
  /**
   * Updates department
   */
  updateDepartment(){
    let url = environment.baseUrl + apiUrls.updateDepartment;
    let body = {
      ...this.departmentForm.value
    }
    this._hospitalService.put(url,body)
     .subscribe((res:Department)=>{
       this.onCloseModal('form')
       this.getDepartmentList(this.hospitalName);
     })
  }

  /**
   * Determines whether submit on
   */
  onSubmit(){
    let url = environment.baseUrl + apiUrls.createDepartment;
    let body = {
      hospitalname : this.hospitalName,
     ...this.departmentForm.value
    }
    // console.log("Bosy is:", body)
    this._hospitalService.post(url,body).pipe(
      map((res: any) => {
        return res;
      })
    ).subscribe((res:Department)=>{
      console.log("res:", res);
        this.getDepartmentList(this.hospitalName);
    })
  }

    // convenience getter for easy access to form fields
    get f() {
      return this.departmentForm.controls;
    }
  /**
   * Sorts by name
   */
  sortByName(){
    this.departments$ = this.departments$.pipe(map((data:Department[]) => {
      data.sort((a, b) => {
          return a.departmentname.toLowerCase() < b.departmentname.toLowerCase() ? -1 : 1;
       });
      return data;
      }))
  }


  // navigate(name:any){
  //   let departmentName = name.replace(/\s/g,"_"); 
  //   let navigationOptions = {
  //     queryParams : {name:departmentName}
  //   } 
  //   this._commonService.navigate('/department', navigationOptions)
  // }

  /**
   * Opens modal
   * @param id 
   */
  openModal(id:string, department:any , action:string) {
    this._modalService.showPopup(id)
    this.department = department;
    console.log("Id:", this.department );
    if(action == "edit"){
       this.departmentForm.patchValue(this.department )
    }
  }

  /**
   * Determines whether close modal on
   * @param id 
   */
  onCloseModal(id:string) {
    this._modalService.closePopup(id)
  }


}
