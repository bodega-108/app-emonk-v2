import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { GeneradorComponent } from './components/generador/generador.component';
import { BuscadorComponent } from './components/buscador/buscador.component';
import { ProductoComponent } from './components/producto/producto.component';

const routes: Routes = [

  { path: 'generador', component: GeneradorComponent },
  { path: 'buscador', component: BuscadorComponent },
  { path: 'producto/:sku', component: ProductoComponent },
];  
@NgModule({
  declarations: [
    AppComponent,
    GeneradorComponent,
    BuscadorComponent,
    ProductoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
