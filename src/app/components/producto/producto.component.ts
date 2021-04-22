import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InformacionService } from 'src/app/services/informacion.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  public formEdit: FormGroup;
  public loadFull: boolean = false;
  public id_producto: number;
  public loading: boolean = false;
  public resultadoRegistroBol: boolean = false;
  public resultadoRegistro:String;

  constructor(private InformacionService: InformacionService, private route:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    
    // this.getProducto();
    this.getParameters();
  }

  updateForm(sku,nombre,categoria,precio,kam,cliente){
      this.formEdit = new FormGroup({
        sku: new FormControl(`${sku}`,[Validators.required]),
        nombre: new FormControl(`${nombre}` ,[Validators.required]),
        categoria: new FormControl(`${categoria}` ,[Validators.required]),
        precio: new FormControl(`${precio}` ,[Validators.required]),
        cliente: new FormControl(`${cliente}` ,[Validators.required]),
        kam: new FormControl(`${kam}` ,[Validators.required])
      });
  }

  getProducto(sku){

    this.InformacionService.getBuscador(sku).subscribe(data => {
      console.log(data);
     
      let sku = data.producto[0].sku;
      let nombre = data.producto[0].nombre;
      let categoria = data.producto[0].id_categoria;
      let precio = data.producto[0].precio;
      let kam = data.producto[0].id_kam;
      this.id_producto = data.producto[0].id;
      let cliente = data.producto[0].id_cliente;
      console.log(sku);

       this.updateForm(sku,nombre,categoria,precio,kam,cliente);
       this.loadFull= true;
    });
  }
  
  getParameters(){
    
    this.route.params.subscribe(params => {
      let sku = params['sku'];
      
      if(sku){
        this.getProducto(sku);
      }
    });
  }

  update(){
    console.log(this.formEdit.value );

      
    if(this.formEdit.valid){
      let data = this.formEdit.value;
      data.id = this.id_producto;
      this.InformacionService.postUpdateSku(data).subscribe(resultado =>{
        console.log(resultado);

        if(resultado.ok ){
          
          this.loading = true;
          setTimeout(() =>{
            this.resultadoRegistroBol = true;
            this.resultadoRegistro = "Actualizado con exito";
            this.loading = false;

            setTimeout(() => {
              this.router.navigate([`/buscador`]);
            },1000)
           
          },2000)
          
        }

      });
    }
  }
}
