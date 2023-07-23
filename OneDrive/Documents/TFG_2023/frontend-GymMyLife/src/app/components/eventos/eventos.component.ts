import { Component, OnInit } from '@angular/core';
import { CommonsService } from 'src/app/services/commons.service';
import { Message } from '../../models/message.model';
import { MessageService} from '../../services/message.service';
import { Autocompletado } from '../../models/autocompletado.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// app-eventos= app-forms    
@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html', //forms.component.html
  styleUrls: ['./eventos.component.scss']
  
})
export class EventosComponent implements OnInit {
 public datoSeleccionado = null;
 public informacion(dato){
  this.datoSeleccionado = dato;}
  municipio: String;
  descripcion: String;
 //data: { nombre: String, valor: any }[] = [];
public data: any[];
 public topmensajes: { municipio: string, descripcion: string }[];
 public options = [];
  respuesta: Message[];//llama al modelo
  public evento: FormGroup;

  constructor(
  private messageService: MessageService,
  private _fb: FormBuilder
  ) {}


  public ngOnInit(): void {
    this.getListaMensajes();
    this.getMensajes();
    this.initForms();
    let name = this.evento.get('input1').value; //como llamar este let ??para no tener que escribir todo el input?
    
  }
  initForms() {
    this.evento = this._fb.group({
       input1: [, Validators.required]
      // input2: [, Validators.required]
  
    });
    
  }
  getDescripcion() {
    return this.evento.valid == true;
  }

  public validarValores(): any {
    if(this.evento.valid){
      console.log('Datos son diferente de null');
    }else{
     console.log('Datos estan null');
    }
  }

  getListaMensajes() {
    this.messageService.getListaMensajes().subscribe(
      (response) => {
        //console.log('response is response', response);
        this.respuesta = response['data'];
        console.log('mis opciones', this.respuesta[0]['municipio']); //huelva
        let i = 0;
        for (i; i < this.respuesta.length; i++) {
          this.options[i] = this.respuesta[i]['municipio'];
        }
        console.log('mis opciones', this.options);
      },
      (error) => {
        console.log('error is ', error);
      }
    );
  }

  getMensajes() {
    this.messageService.getListaMensajes().subscribe(
      (response) => {
        console.log('response is response', response);
        this.municipio = response['data']['municipio'];
        this.descripcion = response['data']['descripcion'];   
      },
      (error) => {
        console.log('error is ', error);
      }
    );
  }

}
// jdfhbv 

