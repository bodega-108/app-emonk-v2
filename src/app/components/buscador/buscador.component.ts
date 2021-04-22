import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InformacionService } from 'src/app/services/informacion.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent implements OnInit {

  public formbuscador : FormGroup;
  public resultado:any;
  public exito: boolean;
  public fail: boolean;

  constructor( private InfoService: InformacionService, private router: Router) { }

  ngOnInit(){
    this.buscador();
  }

  buscador(){
      this.formbuscador = new FormGroup({
        dato: new FormControl('',[Validators.required]),
      });

      this.formbuscador.valueChanges.subscribe(data => {
        console.log(data);
      });
  }

  search(event:Event){

    this.fail = false;
    if(this.formbuscador.valid){

      let data = this.formbuscador.value.dato;
      this.cargarBuscador(data);
    }
  }

  cargarBuscador(data){

    this.InfoService.getBuscador(data).subscribe(data => { 
      console.log(data);
      if(data.ok == true) {
        this.exito = true;
        this.resultado = data.producto;
        
        for(let i = 0; i <= this.resultado.length; i++) {
        
          if(this.resultado[i].id_categoria == 1){
             
            this.resultado[i].id_categoria="Laboratorio";
          }
          if(this.resultado[i].id_categoria == 2){
            this.resultado[i].id_categoria="Medica";
          }
        }
      }else{
        this.exito = false;
        this.fail = true;
      
      }    
    });
  }
  redireccion(sku){
    console.log(sku)
     this.router.navigate([`/producto/${sku}`]);
  }
}
