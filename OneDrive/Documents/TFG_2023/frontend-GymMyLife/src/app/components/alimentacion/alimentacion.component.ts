import { Component, OnInit, ViewChild,ViewEncapsulation } from '@angular/core';
import SwiperCore, { Navigation, Pagination } from 'swiper/core'; 

SwiperCore.use([Navigation, Pagination]); 
@Component({
  selector: 'app-alimentacion',
  templateUrl: './alimentacion.component.html',
  styleUrls: ['./alimentacion.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AlimentacionComponent implements OnInit {


  constructor() {}

  ngOnInit(): void {
  }
}


