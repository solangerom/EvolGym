import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { EntrenamientoComponent } from './components/entrenamiento/entrenamiento.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { BuscadorComponent } from './components/buscador/buscador.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AlimentacionComponent } from './components/alimentacion/alimentacion.component';
import { EventosComponent } from './components/eventos/eventos.component';
import { CarritoComponent } from './components/carrito/carrito.component';
//import { ProductoComponent } from './components/producto/producto.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Interceptor } from './services/interceptor';
import { HttpRequestInterceptor } from './services/http-request-interceptor';
import { AdminComponent } from './components/admin/admin.component';
import { GridAllModule } from '@syncfusion/ej2-angular-grids';
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { BarchartComponent } from './components/barchart/barchart.component';
import { ChartsModule } from 'ng2-charts';
import { PieChartComponent } from './components/piechart/piechart.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SwiperModule } from "swiper/angular";
import { ScrolltopComponent } from './components/scrolltop/scrolltop.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FooterComponent,
    HomeComponent,
    EntrenamientoComponent,
    LoginComponent,
    RegisterComponent,
    BuscadorComponent,
    ProfileComponent,
    AdminComponent,
    BarchartComponent,
    PieChartComponent,
    ScrolltopComponent,
    AlimentacionComponent,
    EventosComponent,
    CarritoComponent,
    //ProductoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    GridAllModule,
    ToolbarModule,
    CheckBoxModule,
    ChartsModule,
    MatProgressSpinnerModule,
    SwiperModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
