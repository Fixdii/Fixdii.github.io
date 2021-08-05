import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services.service';


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  constructor(private servicesService: ServicesService) { }

  show(){
    this.servicesService.eventSubject.next('showSaved');
  }

  ngOnInit(): void {
  }

}
