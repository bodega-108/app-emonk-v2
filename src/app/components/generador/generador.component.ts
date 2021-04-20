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
  public configurable : boolean;
  public registroNuevo : Array<any> = [];
  

  public skuSimple : String;
  public resultadoRegistro:String = 'Procesando'; 
  public resultadoRegistroBol:Boolean = false; 
  //loading
  public loading : boolean = false;

  constructor(private EmonkService: InformacionService, private ProcesadorService:ProcesadorService ) { }

  ngOnInit(): void {
    this.formulario();
  }

  formulario(){

    this.form = new FormGroup({
      nombre: new FormControl('',[Validators.required]),
      categoria: new FormControl('',[Validators.required]),
      precio: new FormControl('',[Validators.required]),
      cliente: new FormControl('',[Validators.required]),
      kam: new FormControl('',[Validators.required]),
      tipo: new FormControl('simple',[Validators.required]),
      variantes: new FormControl(1,[Validators.required]),
   
     
      
    });

    this.form.valueChanges.subscribe(data => {
       console.log(data);

      if(data.tipo === "configurable"){
        this.tipoProducto = false;
        this.configurable = true;
      }

      if(data.tipo === "simple"){
        this.configurable = false;
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
      // console.log(data);
      let numero= [];
      for(let i = 0; i < data.productos.length; i++) {
        
        //console.log(data.productos[i].sku);
        //console.log(data.productos[i].sku.substring(6,9));
         //console.log(Number(data['productos'][i].sku.substring(6,9)));
         numero.push(parseFloat(data.productos[i].sku.substring(6,9)));
      }

      // console.log(numero);
      
      let resultado = this.ProcesadorService.ultimo(numero);
      console.log(resultado);

      let newSku = this.ProcesadorService.nuevo(idCategoria,resultado,tipo,variantes);

      // console.log(newSku);

      let skuNuevo;
      
      for(let i = 0; i < newSku.length; i++) {

       skuNuevo = {
         sku: `${newSku[i]}`,
        
       }
       skuNuevo.nombre = this.form.value.nombre;
       skuNuevo.estado = 'Pendiente';
      skuNuevo.id_categoria = this.form.value.categoria;
      //  if(this.form.value.categoria == 9) {
      //   skuNuevo.id_categoria = 1;
      //  }
      //  if(this.form.value.categoria == 12) {
      //   skuNuevo.id_categoria = 2;
      //  }
      
       skuNuevo.precio= this.form.value.precio;
       skuNuevo.id_cliente= this.form.value.cliente;
       skuNuevo.id_kam = this.form.value.kam;

        this.registroNuevo.push(skuNuevo);
      }

        console.log(this.registroNuevo);

      if(this.registroNuevo.length === 1){
         // console.log('es solo uno');
          this.skuSimple = this.registroNuevo[0].sku;
          this.tipoProducto = true;
      }else{
        this.tabla = true;
        this.tipoProducto=false;
      }
          setTimeout(() => {
        this.loading = false;
      },2000);
    });
  }

  generar(event:Event){
    this.loading = true;
    const informacion = this.form.value;
    const categoria = parseFloat(informacion.categoria);
    this.solicitudInfo(categoria,informacion.tipo ,informacion.variantes);
  }

  save(){
    this.loading = true;
    this.EmonkService.guardarSku(this.registroNuevo).subscribe(data=>{
      console.log(data);

        if(data.ok){
          this.resultadoRegistro = 'Registro exitoso';
        }else{
          this.loading = false;
          this.resultadoRegistro = 'Lo sentimos, ha ocurrido un error';
        }

      setTimeout(() => {
        this.loading = false;
        console.log(this.loading);
        this.tipoProducto = false;
        this.tabla = false;
        this.resultadoRegistroBol = true;
        
        setTimeout(() => {
          this.resultadoRegistroBol = false;  
        },2000);

      },3000);
    });

    this.form.reset();
    // this.form.setValue({variantes:1});
    //Vaciar Array
    for(let i = this.registroNuevo.length; i > 0; i--) {
      this.registroNuevo.pop();
    }
  }
}
