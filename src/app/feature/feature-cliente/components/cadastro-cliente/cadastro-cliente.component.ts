import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { take } from 'rxjs/operators';

import { MethodsEnum } from 'src/app/core/enums/methods.enum';
import { ClienteInterface } from 'src/app/core/interface/cliente-interface';
import { Cliente } from 'src/app/core/models/cliente';
import { TextMaskFactory } from 'src/app/core/utils/mask/text-mask-factory';
import { ClienteService } from '../../services/cliente.service';
import { NotificationService } from '../../services/notification.service';
import { ClienteForm } from './cliente.form';

@Component({
  selector: 'app-cadastro-cliente',
  templateUrl: './cadastro-cliente.component.html',
  styleUrls: ['./cadastro-cliente.component.css']
})
export class CadastroClienteComponent implements OnInit {

  public id: number;
  public cliente: Cliente;
  private _clienteForm: ClienteForm;
  private _maskFactory: TextMaskFactory;

  constructor(
    private clienteService: ClienteService,
    private activeRouter: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService
  ) {
    this._clienteForm = new ClienteForm();
    this.id = this.activeRouter.snapshot.params.id;
    this._maskFactory = new TextMaskFactory();
   }

  ngOnInit(): void {
    if (this.isAlterar()) {
      this.getDadosCliente();
    }
  }

  public get maskFactory(): TextMaskFactory {
    return this._maskFactory;
  }

  public get clienteForm(): ClienteForm {
    return this._clienteForm;
  }

  public isAlterar(): boolean {
    return !!this.id;
  }

  public voltar(): void {
    void this.router.navigate(['/']);
  }

  public isFieldValid(form: FormGroup, field: string) {
    return !form.get(field).valid && form.get(field).dirty;
  }

  public getDadosCliente(): void {
    this.clienteService.getDadosCliente(this.id)
    .subscribe(
      (cliente) => {
          this.clienteForm.setValue(cliente);
          this.cliente = cliente;
      });
  }

  public salvar() {
   this.clienteForm.markAllAsTouched();
   const method = this.isAlterar() ? MethodsEnum.PUT : MethodsEnum.POST;
   const dados = this.clienteForm.getDadosEnvioCliente();

   if (this.id) {
    dados.id = this.id;
   }

   this.clienteService.postPutCliente(dados, method)
   .pipe(take(1))
   .subscribe((response: ClienteInterface) => {
    if (this.isAlterar()) {
      alert('Sucesso, Dados atualizados com sucesso');
      this.notificationService.notification.emit();
    }

    if (!this.isAlterar()) {
      alert('Sucesso, Dados cadastrados com sucesso');
      this.clienteForm.reset();
      this.notificationService.notification.emit();
    }
   },
   (error) => {
    alert('Falha ' + error);
  });
  }

}
