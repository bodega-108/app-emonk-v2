import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProcesadorService {

  constructor() { }


  ultimo(sku:number[]){
    
    let ultimo =  Math.max(...sku);
    return ultimo; 
  }

  nuevo(idCategoria:number, lastNumber:number, tipo:string, variantes:number){
   

    let categoria = idCategoria;

    let variante = 1;
    let contadorVariante = 0;
    let cantidad = lastNumber;
    let preDigito = "00000";
    let newSku;
    let newSkuConfig =[];
    let preVariante = "00";

    if(tipo == "simple"){
      switch(categoria){
        case 9:
          cantidad++;
        for(let i = 1; i <=variantes; i++){
          
          contadorVariante++;
          
          if(cantidad >=10){
            preDigito = "0000"
          }
          if(contadorVariante > 10){
            preVariante = "0";
          }
          newSku = `9-${preDigito}${cantidad}-${preVariante}${[i]}`;
          
          newSkuConfig.push(newSku);
        }        
              return newSkuConfig;   
            break;
        case 12:
          cantidad++;
          for(let i = 1; i <=variantes; i++){
          
            contadorVariante++;
            
            if(cantidad >=10){
              preDigito = "0000"
            }
            if(contadorVariante > 10){
              preVariante = "0";
            }
            newSku = `12-${preDigito}${cantidad}-${preVariante}${[i]}`;
            
            newSkuConfig.push(newSku);
          }        
                return newSkuConfig;   
          break;
      }
    }

    if(tipo == "configurable"){
      switch(categoria){
        case 9:
          cantidad++;
        for(let i = 0; i <=variantes; i++){
          
          contadorVariante++;
          
          if(cantidad >=10){
            preDigito = "0000"
          }
          if(contadorVariante > 10){
            preVariante = "0";
          }
          newSku = `9-${preDigito}${cantidad}-${preVariante}${[i]}`;
          
          newSkuConfig.push(newSku);
        }        
              return newSkuConfig;   
            break;
        case 12:
          cantidad++;
          for(let i = 0; i <=variantes; i++){
          
            contadorVariante++;
            
            if(cantidad >=10){
              preDigito = "0000"
            }
            if(contadorVariante > 10){
              preVariante = "0";
            }
            newSku = `12-${preDigito}${cantidad}-${preVariante}${[i]}`;
            
            newSkuConfig.push(newSku);
          }        
                return newSkuConfig;   
          break;
      }
    }

  }
}
