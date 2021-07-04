import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private router: Router) { }

    //Routing Methods
    navigate(path: string, obj?: object) {
      if (obj) {
        this.router.navigate([path], obj)
      }
      else {
        console.log("ROuter called:", path)
        this.router.navigate([path])
      }
    }
  
    navigateByUrl(path: string) {
      this.router.navigateByUrl(path)
    }
  
}
