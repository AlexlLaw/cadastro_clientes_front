import { Mask } from './mask';
import { CpfMask } from './cpf.mask';
import { CepMask } from './cep.mask';

export class TextMaskFactory {

  public createCpf(): Mask {
    return new CpfMask();
  }

  public createCep(): Mask {
    return new CepMask();
  }
}
