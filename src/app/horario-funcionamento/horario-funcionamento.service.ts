import { Injectable, Input } from '@angular/core';
import { HorarioFuncionamento } from './horario-funcionamento';

@Injectable()
export class HorarioFuncionamentoService {
  @Input()
  horarioFuncionamento: HorarioFuncionamento;

  constructor() { }
}
