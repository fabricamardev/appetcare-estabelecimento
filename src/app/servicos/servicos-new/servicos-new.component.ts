import { Component, OnInit } from '@angular/core';
import { Servico } from '../servico';

@Component({
  moduleId: module.id,
  selector: 'app-servicos-new',
  templateUrl: './servicos-new.component.html',
  styleUrls: ['./servicos-new.component.css']
})
export class ServicosNewComponent implements OnInit {

  servico: Servico;

  constructor() {
    this.servico = new Servico();
   }

  ngOnInit() {
  }

  salvar() {
    console.log(this.servico);
  }

}
