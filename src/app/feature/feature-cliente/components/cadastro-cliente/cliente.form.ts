import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';

import { isValidCpf } from '@brazilian-utils/is-valid-cpf';

import { ClienteInterface } from 'src/app/core/interface/cliente-interface';
import { clearMask } from 'src/app/core/utils/clearMask/regexClearMask';

export class ClienteForm extends FormGroup {
  private _errorMessages = {
    required: 'O campo %s é obrigatorio.',
    quantidadeInvalidaCpf: 'O CPF deve possuir 11 caracteres.',
    valorInvalido: 'O valor informado no campo %s é inválido',
  };

  constructor(){
    super({
      id: new FormControl(null),
      protocolo: new FormControl(null),
      nome: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      cpf: new FormControl(null, [
        ClienteForm.validaQuantidaDeDigito(11, true),
        ClienteForm.validaCpf(true)
    ]),
    dataNascimento: new FormControl(null, [Validators.required]),
    cep: new FormControl(null, [Validators.required]),
    endereco: new FormControl(null, [Validators.required]),
    bairro: new FormControl(null, [Validators.required]),
    });
  }

  private static validaQuantidaDeDigito(quantidade: number, isCpf?: boolean): ValidatorFn {
    return (control: AbstractControl): Record<string, true> => {

        const conteudo = control.value ? control.value.replace(clearMask, '') : '';

        if (conteudo.length > 0 && conteudo.length < quantidade && isCpf) {
            return { quantidadeInvalidaCpf: true };
        }
    };
  }

  private static validaCpf(isCpf: boolean): ValidatorFn {
    return (control: AbstractControl): any => {

        const cpf = control.value ? control.value : '';

        if (!isValidCpf(cpf) && cpf.replace(clearMask, '').length && isCpf) {
            return { valorInvalido: true };
        }
    };
  }

  public get id(): AbstractControl {
    return this.get('id');
  }

  public get protocolo(): AbstractControl {
    return this.get('protocolo');
  }

  public get nome(): AbstractControl {
    return this.get('nome');
  }

  public get email(): AbstractControl {
    return this.get('email');
  }

  public get cpf(): AbstractControl {
    return this.get('cpf');
  }

  public get dataNascimento(): AbstractControl {
    return this.get('dataNascimento');
  }

  public get endereco(): AbstractControl {
    return this.get('endereco');
  }

  public get cep(): AbstractControl {
    return this.get('cep');
  }

  public get bairro(): AbstractControl {
    return this.get('bairro');
  }

  public getFirstErrorFrom(controlName: string, label: string): string {
    return this._errorMessages[Object.keys(this.get(controlName).errors)[0]].replace('%s', label || controlName);
  }

  public markAllAsTouched(): void {
    Object.keys(this.controls).map((control) => this.get(control).markAsDirty());
  }

  public setValues(data: ClienteInterface): void {
    this.id.setValue(data.id);
    this.protocolo.setValue(data.protocolo)
    this.nome.setValue(data.nome);
    this.email.setValue(data.email);
    this.cpf.setValue(data.cpf);
    this.dataNascimento.setValue(data.dataNascimento);
    this.endereco.setValue(data.endereco);
    this.cep.setValue(data.cep);
    this.bairro.setValue(data.bairro);
  }

  public getDadosEnvioCliente(): ClienteInterface {
    return {
      id: this.id.value,
      protocolo: this.protocolo.value,
      nome: this.nome.value,
      email: this.email.value,
      cpf: clearMask(this.cpf.value),
      dataNascimento: this.dataNascimento.value,
      endereco: this.endereco.value,
      cep: this.cep.value,
      bairro: this.bairro.value
    };
  }
}
