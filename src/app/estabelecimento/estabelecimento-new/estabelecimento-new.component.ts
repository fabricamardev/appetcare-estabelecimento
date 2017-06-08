import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-estabelecimento-new',
  templateUrl: './estabelecimento-new.component.html',
  styleUrls: ['./estabelecimento-new.component.css']
})
export class EstabelecimentoNewComponent implements OnInit {

  estabelecimento = {};

  constructor() { }

  ngOnInit() {
  }

}
