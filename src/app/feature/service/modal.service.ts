import { Injectable } from '@angular/core';
declare let $: any;

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor() { }

  showPopup(id:string) {
    $('#' + id).modal('show');
}

closePopup(id: string) {
  $('#' + id).modal('hide');
}
}
