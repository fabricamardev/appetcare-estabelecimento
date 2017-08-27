import { AppetAuthService } from './../services/appet-auth.service';
import { LocalStorageService } from '../services/local-storage.service';
import { Estabelecimento } from '../perfil/estabelecimento';
import { Component, OnInit } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  perfil: Estabelecimento;

  constructor(private auth: AppetAuthService,
              private localStorageService: LocalStorageService) { }

  ngOnInit() {
    this.perfil = this.localStorageService.getObject('estabelecimento');

    if (this.auth.isSocial) {
      this.perfil.image = this.localStorageService.getObject('social').image;
      this.perfil.email = this.localStorageService.getObject('social').email;
    }
  }

}
