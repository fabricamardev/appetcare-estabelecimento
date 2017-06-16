import { Injectable, Input } from '@angular/core';
import { Servico } from './servico';

@Injectable()
export class ServicoService {
  @Input()
  servico: Servico;

  constructor() { }
}
