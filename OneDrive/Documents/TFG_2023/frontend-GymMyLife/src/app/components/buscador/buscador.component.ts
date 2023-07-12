import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { MunicipalityService } from '../../services/municipality.service';
import { Autocompletado } from '../../models/autocompletado.model';
import { Municipio } from '../../models/municipio.model';
import { delay } from 'rxjs/operators';
import { LoadingService } from '../../services/loading.service';
import { NgbPaginationNumber } from '@ng-bootstrap/ng-bootstrap';
import SwiperCore, { Navigation, Pagination } from 'swiper/core';

// import { User } from '../../models/user.model';
// import { AuthService } from 'src/app/services/auth.service';
// import { CommonsService } from 'src/app/services/commons.service';
// import { ProfileService } from 'src/app/services/profile.service';

SwiperCore.use([Navigation, Pagination]);

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class BuscadorComponent implements OnInit {
  // user: User;
  // name: string;
  // email: string;

  fondoNegro: boolean;
  myControl = new FormControl();
  options = [];
  respuesta: Autocompletado[];
  filteredOptions: Observable<string[]>;
  texto: string;
  municipio = new Municipio();
  idSearch: number;
  idMunicipio: number;
  topBusquedas: { name: string, shield: string, province: string, ccaa: string, numBusquedas: number }[];
  nHospitales: number;
  nConsultorios: number;
  nUrgencias: number;
  nEstaciones: number;
  noMuni: boolean;

  loading: boolean = false;

  data: { nombre: String, valor: any }[] = [];
  
  // public datauser: any[];
  nombre: string;
  valor: string;


  constructor(
    private _loading: LoadingService,
    private municipalityService: MunicipalityService,
    

    // private commonsService: CommonsService,
    // private profileService: ProfileService,
    // private authService: AuthService
  ) { }

  ngOnInit() {
    this.fondoNegro = true;
   // this.getUser();
    this.listenToLoading();
    this.getListaPueblos();
    this.getTopMunicipios();

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
  }
  /**
   * Listen to the loadingSub property in the LoadingService class. This drives the
   * display of the loading spinner.
   */
  listenToLoading(): void {
    this._loading.loadingSub
      .pipe(delay(0)) // This prevents a ExpressionChangedAfterItHasBeenCheckedError for subsequent requests
      .subscribe((loading) => {
        this.loading = loading;
      });
  }


  // getUser() {
  //   this.profileService.getUser().subscribe(
  //     (response) => {
  //       console.log('response is ', response);
  //       this.user.name= response['datauser']['name'];
  //       this.user.email = response['datauser']['email'];
  //     },
  //     (error) => {
  //       console.log('error is ', error);
  //     }
  //   );
  // }

  getFondo() {
    return this.fondoNegro;
  }
  getListaPueblos() {
    this.municipalityService.getListaPueblos().subscribe(
      (response) => {
        // console.log('response is ', response);
        this.respuesta = response['data'];
        console.log('mis opciones', this.respuesta[0]['name']);
        // this.options[0] = this.respuesta[0]['name'];
        // this.options[1] = this.respuesta[1]['name'];
        let i = 0;
        for (i; i < this.respuesta.length; i++) {
          this.options[i] = this.respuesta[i]['name'];
        }
        // console.log('mis opciones', this.options);
      },
      (error) => {
        console.log('error is ', error);
      }
    );
  }

  getTopMunicipios() {
    this.municipalityService.getTopMunicipios().subscribe(
      (response) => {
        this.topBusquedas = response['data'];
        console.log('Municipios Informacion', this.topBusquedas);
        console.log('Nombre', this.topBusquedas[0]['name']);
        console.log('Provincia', this.topBusquedas[0]['province']);
        console.log('CCAA', this.topBusquedas[0]['ccaa']);
        // let aux = new Array()
        // aux = response['data'];
        // for (let i = 0; i < aux.length; i++) {
        //   // console.log(aux[])
        //   this.topBusquedas[i].push(aux[i]['name'])
        //   // this.topBusquedas[i]['nombre'] = aux[i]['name'];
        //   console.log('nombre municipio', this.topBusquedas[i]['nombre']);
        // }
      },
      (error) => {
        console.log('error is ', error);
      }
    );
  }

  getIdPueblo(pueblo: string) {
    let i = 0;
    for (i; i < this.respuesta.length; i++) {
      // console.log(this.respuesta[i]['name'])
      // console.log(pueblo)
      if (this.respuesta[i]['name'] == pueblo) {
        // console.log(this.respuesta[i]['name'])
        // console.log(this.respuesta[i]['idMunicipality'])
        return Number(this.respuesta[i]['idMunicipality']);
      }
    }
    return -1;
  }

  getInfoPueblo() {

    this.noMuni = false;
    // console.log("hola")
    // console.log(this.getIdPueblo(this.texto))
    this.nConsultorios = 0;
    this.nHospitales = 0;
    this.nUrgencias = 0;
    let id = this.getIdPueblo(this.texto)
    if (id == -1) {
      console.log("Error")
      this.noMuni = true;
    }
    else {
      this.fondoNegro = false;
      this.municipalityService
        .getBusqueda(id)
        .subscribe((response) => {
          console.log("Hola")
          if (response['status'] == 200) {
            this.municipio.name = response['data']['name'];
            this.municipio.shield = response['data']['shield'];
            this.municipio.region = response['data']['region'];
            this.municipio.province = response['data']['province'];
            this.municipio.ccaa = response['data']['ccaa'];
            this.municipio.population = response['data']['population'];
            this.municipio.surface = response['data']['surface'];
            this.municipio.altitude = response['data']['altitude'];
            this.municipio.density = response['data']['density'];
            this.municipio.stations = response['data']['stations'];
            this.municipio.medicalcenters = response['data']['medicalcenters'];
            this.municipio.supermarkets = response['data']['supermarkets'];

            this.nEstaciones = this.municipio.stations.length;

            for (let i = 0; i < this.municipio.medicalcenters.length; i++) {
              console.log("tipo de medico", this.municipio.medicalcenters[i]['type'])
              if (this.municipio.medicalcenters[i]['type'] == 'CENTRO SALUD' ||
                this.municipio.medicalcenters[i]['type'] == 'CONSULTORIO LOCAL' || this.municipio.medicalcenters[i]['type'] == 'Otros Centros con Internamiento') {
                this.nConsultorios++;
              }
              else if (this.municipio.medicalcenters[i]['type'] == 'Dispositivos de Urgencia Extrahospitalaria') {
                this.nUrgencias++;
              }
              else {
                this.nHospitales++;
              }
            }

            if (response['data']['nRestaurants'] == -10) {
              this.municipio.nRestaurants = 0;
              this.municipio.media = 0;
            } else {
              this.municipio.nRestaurants = response['data']['nRestaurants'];
              this.municipio.media = response['data']['media'];
            }
            if (this.municipio.media >= -1 && this.municipio.media <= -0.8) {
              this.municipio.media = 1;
            }
            if (this.municipio.media >= -0.8 && this.municipio.media <= -0.6) {
              this.municipio.media = 2;
            }
            if (this.municipio.media >= -0.6 && this.municipio.media <= -0.4) {
              this.municipio.media = 3;
            }
            if (this.municipio.media >= -0.4 && this.municipio.media <= -0.2) {
              this.municipio.media = 4;
            }
            if (this.municipio.media >= -0.2 && this.municipio.media <= 0) {
              this.municipio.media = 5;
            }
            if (this.municipio.media >= 0 && this.municipio.media <= 0.2) {
              this.municipio.media = 6;
            }
            if (this.municipio.media >= 0.2 && this.municipio.media <= 0.4) {
              this.municipio.media = 7;
            }
            if (this.municipio.media >= 0.4 && this.municipio.media <= 0.6) {
              this.municipio.media = 8;
            }
            if (this.municipio.media >= 0.6 && this.municipio.media <= 0.8) {
              this.municipio.media = 9;
            }
            if (this.municipio.media >= 0.8 && this.municipio.media <= 1) {
              this.municipio.media = 10;
            }
            console.log('Devuelto de BD', response['data']['unpopulated'])
            if (response['data']['unpopulated'] == 0 || response['data']['unpopulated'] == -1) {
              this.municipio.unpopulated = 'Municipio despoblado';
              console.log('ESTADOOOO: ', this.municipio.unpopulated)
            } else {
              this.municipio.unpopulated = 'Municipio poblado';
              console.log('ESTADOOOO: ', this.municipio.unpopulated)
            }
          } else {
            console.log('ELSEEE');
            this.idSearch = response['data']['idSearch'];
            this.idMunicipio = response['data']['idMunicipality'];
            this.municipalityService
              .getInfoPueblo(this.idMunicipio)
              .subscribe((response) => {
                this.municipio = response['data'];
                console.log('OBJETO: ', this.municipio);
              });

            this.municipalityService
              .getEstaciones(this.idMunicipio)
              .subscribe((response) => {
                console.log(response);
                this.municipio.stations = response['data'];
                this.nEstaciones = this.municipio.stations.length;
                console.log(this.nEstaciones)
                console.log('ESTACIONES: ', this.municipio.stations);
                console.log('OBJETO: ', response['data']);
              });

            this.municipalityService
              .getCentrosMedicos(this.idMunicipio)
              .subscribe((response) => {
                console.log(response);
                this.municipio.medicalcenters = response['data'];
                for (let i = 0; i < this.municipio.medicalcenters.length; i++) {
                  console.log("tipo de medico", this.municipio.medicalcenters[i]['type'])
                  if (this.municipio.medicalcenters[i]['type'] == 'CENTRO SALUD' ||
                    this.municipio.medicalcenters[i]['type'] == 'CONSULTORIO LOCAL' || this.municipio.medicalcenters[i]['type'] == 'Otros Centros con Internamiento') {
                    this.nConsultorios++;
                  }
                  else if (this.municipio.medicalcenters[i]['type'] == 'Dispositivos de Urgencia Extrahospitalaria') {
                    this.nUrgencias++;
                  }
                  else {
                    this.nHospitales++;
                  }
                }
              });

            this.municipalityService
              .getSupermercados(this.idMunicipio, this.idSearch)
              .subscribe((response) => {
                console.log(response);
                this.municipio.supermarkets = response['data'];
                // console.log("SUPERMERCADOS: ",this.municipio.supermarkets)
                // console.log("OBJETO: ", response['data'])
              });

            this.municipalityService
              .getRestaurantes(this.idMunicipio, this.idSearch)
              .subscribe((response) => {
                console.log(response);
                if (response['data']['nRestaurants'] == -10) {
                  this.municipio.nRestaurants = 0;
                  this.municipio.media = 0;
                } else {
                  this.municipio.nRestaurants = response['data']['nRestaurants'];
                  this.municipio.media = response['data']['media'];
                  if (this.municipio.media >= -1 && this.municipio.media <= -0.8) {
                    this.municipio.media = 1;
                  }
                  if (this.municipio.media >= -0.8 && this.municipio.media <= -0.6) {
                    this.municipio.media = 2;
                  }
                  if (this.municipio.media >= -0.6 && this.municipio.media <= -0.4) {
                    this.municipio.media = 3;
                  }
                  if (this.municipio.media >= -0.4 && this.municipio.media <= -0.2) {
                    this.municipio.media = 4;
                  }
                  if (this.municipio.media >= -0.2 && this.municipio.media <= 0) {
                    this.municipio.media = 5;
                  }
                  if (this.municipio.media >= 0 && this.municipio.media <= 0.2) {
                    this.municipio.media = 6;
                  }
                  if (this.municipio.media >= 0.2 && this.municipio.media <= 0.4) {
                    this.municipio.media = 7;
                  }
                  if (this.municipio.media >= 0.4 && this.municipio.media <= 0.6) {
                    this.municipio.media = 8;
                  }
                  if (this.municipio.media >= 0.6 && this.municipio.media <= 0.8) {
                    this.municipio.media = 9;
                  }
                  if (this.municipio.media >= 0.8 && this.municipio.media <= 1) {
                    this.municipio.media = 10;
                  }
                }
                console.log(this.municipio.media)
                // this.municipio.nRestaurants = response['data']['nRestaurants'];
                // console.log(this.municipio.media)
                // console.log(this.municipio.nRestaurants)
              });

            this.municipalityService
              .getNoticias(this.idMunicipio, this.idSearch)
              .subscribe((response) => {
                console.log(response);
                if (response['data']['populated'] == 0 || response['data']['populated'] == -1)
                  this.municipio.unpopulated = 'Municipio despoblado';
                else
                  this.municipio.unpopulated = 'Municipio poblado';
                // this.municipio.unpopulated = response['data']['populated'];
                // console.log("OBJETO: ", this.municipio)
                // console.log(this.municipio.name)
                // console.log(this.municipio.ccaa)
                // console.log(this.municipio.density)
                // console.log(this.municipio.province)
                // console.log(this.municipio.population)
                // console.log(this.municipio.unpopulated)
              });
          }

          //construyo data para el examen
          // this.data.push({ "nombre": "id", "valor": this.idMunicipio });
          this.data.push({ "nombre": "Municipo", "valor": this.municipio.name });
          this.data.push({ "nombre": "escudo", "valor": this.municipio.shield });
          this.data.push({ "nombre": "region", "valor": this.municipio.region });
          this.data.push({ "nombre": "provincia", "valor": this.municipio.province });
          this.data.push({ "nombre": "ccaa", "valor": this.municipio.ccaa });
          this.data.push({ "nombre": "poblacion", "valor": this.municipio.population });
          this.data.push({ "nombre": "superficie", "valor": this.municipio.surface });
          this.data.push({ "nombre": "altitud", "valor": this.municipio.altitude });
          this.data.push({ "nombre": "densidad", "valor": this.municipio.density });
          this.data.push({ "nombre": "nRestaurantes", "valor": this.municipio.nRestaurants });
          this.data.push({ "nombre": "media", "valor": this.municipio.media });
          this.data.push({ "nombre": "unpopulated", "valor": this.municipio.unpopulated });

          for (let i = 0; i < this.municipio.medicalcenters.length; i++) {
            this.data.push({ "nombre": "Centro Medico", "valor": this.municipio.medicalcenters[i]['name'] });
          }

          for (let i = 0; i < this.municipio.supermarkets.length; i++) {
            this.data.push({ "nombre": "Centro Medico", "valor": this.municipio.supermarkets[i]['name'] });
          }

          for (let i = 0; i < this.municipio.stations.length; i++) {
            this.data.push({ "nombre": "Estacion", "valor": this.municipio.stations[i]['name'] });
          }

          console.log(this.data)

        });
    }
  }

  rowSelected(d: any) {
    this.nombre = d['nombre'];
    this.valor = d['valor'];
  }

  ocultar() {
    this.nombre = null;
  }

  getNoMuni() {
    return this.noMuni == true;
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }
}
