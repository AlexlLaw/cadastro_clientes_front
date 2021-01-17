import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ListarClientesComponent } from './listar-clientes.component';



@NgModule({
  declarations: [ListarClientesComponent],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [ListarClientesComponent]
})
export class ListarClientesModule { }
