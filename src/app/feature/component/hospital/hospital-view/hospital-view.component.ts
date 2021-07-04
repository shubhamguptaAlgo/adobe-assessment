import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/feature/service/modal.service';
import { HospitalService } from 'src/app/feature/service/hospital.service';
import { environment } from 'src/environments/environment';
import { apiUrls } from 'src/app/shared/constants/apiUrl';
import { Observable, of} from 'rxjs';
import { Hospital } from 'src/app/feature/interfaces/hospital';
import { map } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/feature/service/common.service';

@Component({
  selector: 'app-hospital-view',
  templateUrl: './hospital-view.component.html',
  styleUrls: ['./hospital-view.component.css']
})
export class HospitalViewComponent implements OnInit {
  hospitals$: Observable<Hospital[]>;
  hospitalForm : FormGroup;
  hospital:any;
  constructor(
    private _modalService : ModalService,
    private _commonService : CommonService,
    private fb : FormBuilder,
    private _hospitalService : HospitalService) { }

  ngOnInit(): void {
    this.createForm();
   this.getHospitalList();
  }


  /**
   * Creates form
   */
  createForm(){
  this.hospitalForm  = this.fb.group({
    hospitalname : ["",[Validators.required]],
    contactnumber : ["",[Validators.required, Validators.pattern(/^[6-9]\d{9}$/),
    Validators.maxLength(10), Validators.minLength(10)]],
  })
  }

  /**
   * Gets hospital
   */
  getHospitalList(){
    let url = environment.baseUrl + apiUrls.getHospitals;
    this.hospitals$ = this._hospitalService.get(url).pipe(
      map((res: any) => {
            return res.data.hospitals;
      }),
    );
  }



  /**
   * Deletes hospital
   */
  deleteHospital(){
    let url = environment.baseUrl + apiUrls.deleteHospital+"/"+this.hospital.hospitalname;
     this._hospitalService.delete(url,{})
     .subscribe((res:Hospital)=>{
       this.onCloseModal('deleteModal')
       this.getHospitalList();
     })
  }




  /**
   * Update hospital
   */
  updateHospital(){
    // const id = this.hospitalId;
    let url = environment.baseUrl + apiUrls.updateHospital;
    let body = {
      ...this.hospitalForm.value
    }
    this._hospitalService.put(url,body)
     .subscribe((res:Hospital)=>{
       this.onCloseModal('form')
       this.getHospitalList();
     })
  }

  /**
   * Determines whether submit on
   */
  onSubmit(){
    let url = environment.baseUrl + apiUrls.createHospital;
    let body = {
     ...this.hospitalForm.value
    }
    console.log("Bosy is:", body)
    this._hospitalService.post(url,body).pipe(
      map((res: any) => {
        return res;
      })
    ).subscribe((res:Hospital)=>{
      console.log("res:", res);
        this.getHospitalList();
  
    })
  }

    // convenience getter for easy access to form fields
    get f() {
      return this.hospitalForm.controls;
    }
  /**
   * Sorts by name
   */
  sortByName(){
    this.hospitals$ = this.hospitals$.pipe(map((data:Hospital[]) => {
      data.sort((a, b) => {
          return a.hospitalname.toLowerCase() < b.hospitalname.toLowerCase() ? -1 : 1;
       });
      return data;
      }))
  }


  navigate(name:any){
    let hospitalName = name.replace(/\s/g,"_"); 
    let navigationOptions = {
      queryParams : {name:hospitalName}
    } 
    this._commonService.navigate('/department', navigationOptions)
  }
  /**
   * Opens modal
   * @param id 
   */
  openModal(id:string, hospital:any , action:string) {
    this._modalService.showPopup(id)
    this.hospital = hospital;
    // this.hospitalId = hospital.id;
    console.log("Id:", this.hospital);
    if(action == "edit"){
       this.hospitalForm.patchValue(this.hospital)
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
