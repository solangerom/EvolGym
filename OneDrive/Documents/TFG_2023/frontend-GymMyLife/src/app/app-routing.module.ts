import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { EntrenamientoComponent } from './components/entrenamiento/entrenamiento.component';
import { ProfileComponent } from './components/profile/profile.component';
import { BuscadorComponent } from './components/buscador/buscador.component';
import { AdminComponent } from './components/admin/admin.component';
import { AlimentacionComponent } from './components/alimentacion/alimentacion.component';
import { EventosComponent } from './components/eventos/eventos.component';
import { CarritoComponent } from './components/carrito/carrito.component';
//import { ProductoComponent } from './components/producto/producto.component';

const routes: Routes = [
  { path: '', component: BuscadorComponent, pathMatch: 'full' },
  { path: 'sobreNosotros', component: HomeComponent, pathMatch: 'full' },
  { path: 'entrenamiento', component: EntrenamientoComponent, pathMatch: 'full' },
  { path: 'profile', component: ProfileComponent, pathMatch: 'full' },
  { path: 'alimentacion', component: AlimentacionComponent, pathMatch: 'full' },
  { path: 'eventos', component: EventosComponent, pathMatch: 'full' },
  { path: 'carrito', component: CarritoComponent, pathMatch: 'full' },
  //{ path: 'producto', component: ProductoComponent, pathMatch: 'full' },
  { path: 'admin', component: AdminComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
