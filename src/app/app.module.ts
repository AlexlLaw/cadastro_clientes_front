import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { CadastroClienteModule } from './feature/feature-cliente/components/cadastro-cliente/cadastro-cliente.module';
import { RouterModule } from '@angular/router';
import { ListarClientesModule } from './feature/feature-cliente/components/listar-clientes/listar-clientes.module';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    CadastroClienteModule,
    ListarClientesModule,
    AppRoutingModule,
    RouterModule.forRoot([])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
