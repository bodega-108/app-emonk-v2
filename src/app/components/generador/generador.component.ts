import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { InformacionService } from 'src/app/services/informacion.service';
import { ProcesadorService } from '../../services/procesador.service'; 



@Component({
  selector: 'app-generador',
  templateUrl: './generador.component.html',
  styleUrls: ['./generador.component.css']
})
export class GeneradorComponent implements OnInit {

  public form : FormGroup;
  
  public tipoProducto : Boolean;
  public tabla : Boolean;
  public registroNuevo : Array<any> = [];
  

  public skuSimple : String;

  constructor(private EmonkService: InformacionService, private ProcesadorService:ProcesadorService ) { }

  ngOnInit(): void {
    this.formulario();
  }

  formulario(){

    this.form = new FormGroup({
      sku: new FormControl('',[Validators.required]),
      categoria: new FormControl('',[Validators.required]),
      tipo: new FormControl('simple',[Validators.required]),
      variantes: new FormControl(1,[Validators.required]),
    });

    this.form.valueChanges.pipe(
      debounceTime(500)
    ).subscribe(data => {
      console.log(data);

      if(data.tipo === "configurable"){
        this.tipoProducto = true;
      }else{
        this.tipoProducto = false;
      }
      let catego = parseFloat(data.categoria);
     // this.solicitudInfo(catego,data.tipo ,data.variantes);
      
      // if(data.length > 3) {
      
      //   this.solicitudInfo(data.categoria);
      // }
    });
  }

  solicitudInfo(idCategoria:number, tipo, variantes){

    this.EmonkService.getSkus(idCategoria).subscribe(data => {
      console.log(data);
      
      let numero= [];
      
      for(let i = 0; i < data.productos.length; i++) {
        
        //console.log(data.productos[i].sku);
        //console.log(data.productos[i].sku.substring(6,9));
         //console.log(Number(data['productos'][i].sku.substring(6,9)));

         numero.push(parseFloat(data.productos[i].sku.substring(6,9)));
        
      
        
      }
      console.log(numero);
      
      let resultado = this.ProcesadorService.ultimo(numero);
      //console.log(resultado);

      let newSku = this.ProcesadorService.nuevo(idCategoria,resultado,tipo,variantes);

      console.log(newSku);

      let skuNuevo;
      
      for(let i = 0; i < newSku.length; i++) {

       skuNuevo = {
         sku: `${newSku[i]}`,
         nombre:`TEXTO DE PRUEBA-${i}`,
       }

        this.registroNuevo.push(skuNuevo);
      }

      console.log(this.registroNuevo);


      if(this.registroNuevo.length === 1){
         // console.log('es solo uno');
          this.skuSimple = this.registroNuevo[0].sku;
          this.tipoProducto = true;
      }else{
        console.log('no lo es');
        this.tabla = true;
        this.tipoProducto=false;
      }

    });
  }

  generar(event:Event){

    const informacion = this.form.value;
    const categoria = parseFloat(informacion.categoria);
    this.solicitudInfo(categoria,informacion.tipo ,informacion.variantes);


    
  }

  save(){
    console.log('guardar');
  }
}
