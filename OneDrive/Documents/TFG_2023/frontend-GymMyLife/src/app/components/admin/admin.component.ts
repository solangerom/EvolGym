import { Component, OnInit} from '@angular/core';
import { CommonsService } from 'src/app/services/commons.service';
import { AdminService } from 'src/app/services/admin.service';
// import { BarchartComponent } from 'src/app/components/barchart.component' 

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {

  public data: any[];
  public data1: any[];
  primer_puesto: string;
  segundo_puesto: string;
  tercer_puesto: string;
  public data2: any[];
  public toolbar: string[];
  public selectOptions: Object;
  public editSettings: Object;
  // public initialPage: Object;

    constructor(
      private commonsService: CommonsService,
      private adminService: AdminService,
    ) {}

    public ngOnInit(): void {
      this.getUser() 
      this.getMunicipios()
      this.getRankingActivos()
      this.toolbar = ['Search'];
      // this.initialPage = { pageSize: 10, pageCount: 2 };

  }

  getUser() {
    this.adminService.getUsers().subscribe(
      (response) => {
        console.log('response is ', response);
        this.data = response['data'];
      },
      (error) => {
        console.log('error is ', error);
      }
    );
  }

  getMunicipios() {
    this.adminService.getMunicipiosMasBuscados().subscribe(
      (response) => {
        console.log('response is ', response);
        this.data1 = response['data'];
        this.primer_puesto = this.data1[0]['name']
        this.segundo_puesto = this.data1[1]['name']
        this.tercer_puesto = this.data1[2]['name']
        console.log('primer puesto' , this.primer_puesto)
        console.log('segundo puesto' , this.segundo_puesto)
        console.log('tercer puesto' , this.tercer_puesto)
      },
      (error) => {
        console.log('error is ', error);
      }
    );
  }

  getRankingActivos() {
    this.adminService.getRankingActivos().subscribe(
      (response) => {
        console.log('response is ', response);
        this.data2 = response['data'];
      },
      (error) => {
        console.log('error is ', error);
      }
    );
  }

  actData() {
    this.adminService.actData().subscribe(
      (response) => {
        console.log('response is ', response);
      },
      (error) => {
        console.log('error is ', error);
      }
    );
  }

  printTest() {
    console.log("Hola")
  }

}