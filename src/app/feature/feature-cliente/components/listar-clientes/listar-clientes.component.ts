import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { ClienteInterface } from 'src/app/core/interface/cliente-interface';
import { ClienteService } from '../../services/cliente.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-listar-clientes',
  templateUrl: './listar-clientes.component.html',
  styleUrls: ['./listar-clientes.component.css']
})
export class ListarClientesComponent implements OnInit, OnDestroy {

  public clientes: Array<ClienteInterface> = [];
  private _subscription: Subscription;

  constructor(
    private clienteService: ClienteService,
    private router: Router,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this._subscription = this.notificationService.notification.subscribe(() => { this.listarClientes(); });
    this.listarClientes();
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  public listarClientes(): void {
    this.clienteService.getClientes().subscribe((response: Array<ClienteInterface>) => {
      this.clientes = response;
    });
  }

  public openForm(id: number): void {
    void this.router.navigate(['/cliente/', id]);
  }

  public delet(id: number): void {
    this.clienteService.deletCliente(id).subscribe(
      (res) => {
        alert('Deletado com sucesso');
        this.listarClientes();
      },
      (error) => {
        console.log(error);
      });
  }

}
