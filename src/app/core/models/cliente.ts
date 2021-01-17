import { ClienteInterface } from '../interface/cliente-interface';
import { clearMask } from '../utils/clearMask/regexClearMask';

export class Cliente {
  private _id: number;
  private _protocolo: string;
  private _nome: string;
  private _cpf: string;
  private _email: string;
  private _dataNascimento: string;
  private _endereco: string;
  private _cep: string;
  private _bairro: string;

  constructor({
    id = null,
    protocolo = null,
    nome = null,
    cpf = null,
    email = null,
    dataNascimento = null,
    endereco = null,
    cep = null,
    bairro = null
  }) {
    this.id = id;
    this.protocolo = protocolo;
    this.nome = nome;
    this.cpf = cpf;
    this.email = email;
    this.dataNascimento = dataNascimento;
    this.endereco = endereco;
    this.cep = cep;
    this.bairro = bairro;
  }

  get id(): number {
      return this._id;
  }

  set id(value: number) {
      this._id = value;
  }

  get protocolo(): string {
    return this._protocolo;
  }

  set protocolo(value: string) {
      this._protocolo = value;
  }

  get nome(): string {
    return this._nome;
  }

  set nome(value: string) {
      this._nome = value;
  }

  get cpf(): string {
    return this._cpf;
  }

  set cpf(value: string) {
      this._cpf = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
      this._email = value;
  }


  get dataNascimento(): string {
    return this._dataNascimento;
  }

  set dataNascimento(value: string) {
      this._dataNascimento = value;
  }

  get endereco(): string {
    return this._endereco;
  }

  set endereco(value: string) {
      this._endereco = value;
  }

  get cep(): string {
    return this._cep;
  }

  set cep(value: string) {
      this._cep = value;
  }

  get bairro(): string {
    return this._bairro;
  }

  set bairro(value: string) {
      this._bairro = value;
  }

  public getValues(): ClienteInterface {
    return {
      id: this.id,
      protocolo: this.protocolo,
      nome: this.nome,
      email: this.email,
      cpf: clearMask(this.cpf),
      dataNascimento: this.dataNascimento,
      endereco: this.endereco,
      cep: this.cep,
      bairro: this.bairro
    };
  }
}
