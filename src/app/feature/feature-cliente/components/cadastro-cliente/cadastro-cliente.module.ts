import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { CadastroClienteComponent } from './cadastro-cliente.component';
import { TextMaskModule } from 'angular2-text-mask';


@NgModule({
  declarations: [CadastroClienteComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    TextMaskModule
  ],
  exports: [CadastroClienteComponent]
})
export class CadastroClienteModule { }
