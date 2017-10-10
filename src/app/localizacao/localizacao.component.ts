import { Http, RequestOptions } from '@angular/http';
import { environment } from '../../environments/environment';
import { DefaultRequestOptionsService } from '../services/default-request-options.service';
import { Estabelecimento } from '../perfil/estabelecimento';
import { LocalStorageService } from '../services/local-storage.service';
import { Component, OnInit } from '@angular/core';

declare var google: any;
declare var swal: any;

@Component({
  selector: 'app-localizacao',
  templateUrl: './localizacao.component.html',
  styleUrls: ['./localizacao.component.css']
})

export class LocalizacaoComponent implements OnInit {

  options: any;
  overlays: any[] = [];
  selectedPosition: any;
  dialogVisible: boolean;
  estabelecimento: Estabelecimento = new Estabelecimento();
  enderecoGMaps: any;

  api_route: string = environment.api_address + environment.api_version + 'estabelecimentos/';

  constructor(private http: Http,
    public requestOptions: DefaultRequestOptionsService,
    public localStorageService: LocalStorageService) {
  }

  ngOnInit() {
    let latitude: number;
    let longitude: number;
    this.estabelecimento = this.localStorageService.getObject('estabelecimento');

    if (!this.estabelecimento.endereco) {
      this.getLocation();
      latitude = parseFloat(localStorage.getItem('latitude'));
      longitude = parseFloat(localStorage.getItem('longitude'));
    } else {
      latitude = parseFloat(this.estabelecimento.latitude);
      longitude = parseFloat(this.estabelecimento.longitude);
      this.addMarkerEstabelecimento();
    }

    this.options = {
      center: { lat: latitude, lng: longitude },
      zoom: 12
    };

    localStorage.removeItem('latitude');
    localStorage.removeItem('longitude');
  }

  handleMapClick(event) {
    this.selectedPosition = event.latLng;
    // REPRODUZIR O FORMATO DE event.latLng NA LINHA 103 para a localização do estabelecimento
    this.estabelecimento.latitude = event.latLng.lat();
    this.estabelecimento.longitude = event.latLng.lng();

    swal({
      title: 'Deseja vincular esta localização ao seu estabelecimento?',
      text: 'Os tutores poderão visualizar esta localização',
      type: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    }).then(() => {
      this.http
        .get('http://maps.googleapis.com/maps/api/geocode/json?latlng=' + this.estabelecimento.latitude + ',' +
        this.estabelecimento.longitude)
        .toPromise()
        .then(response => {
          this.estabelecimento.endereco = response.json().results[0].formatted_address;

          this.http
            .put(this.api_route + this.estabelecimento.id, this.estabelecimento, this.requestOptions.merge(new RequestOptions()))
            .toPromise()
            .then(estabelecimento => {
              this.estabelecimento.endereco = estabelecimento.json();
            });
        });

      this.localStorageService.setObject('estabelecimento', this.estabelecimento);
      this.addMarker();

      swal(
        'Parabéns!',
        'A localização foi definida com sucesso',
        'success'
      );
    }).catch(swal.noop);
  }

  addMarker() {
    this.overlays[0] = (new google.maps.Marker({
      position: {
        lat: this.selectedPosition.lat(),
        lng: this.selectedPosition.lng()
      },
      title: 'Estabelecimento'
    }));
  }

  addMarkerEstabelecimento() {
    this.overlays[0] = (new google.maps.Marker({
      position: {
        lat: +this.estabelecimento.latitude,
        lng: +this.estabelecimento.longitude
      },
      title: this.estabelecimento.nome
    }));
  }

  clearMarkers() {
    this.overlays = [];
  }

  getLocation() {
    if (navigator.geolocation) {
       this.http
        .get('https://ipinfo.io/geo')
        .toPromise()
        .then(response => {
          let loc = response.json().loc.split(',');
          localStorage.setItem('latitude', loc[0]);
          localStorage.setItem('longitude', loc[1]);
      });
    } else {
      alert('Seu browser não suporta Geolocalização. Navegue pelo mapa para encontrar a localização desejada');
    }
  }

  showPosition(position) {
    localStorage.setItem('latitude', position.coords.latitude.toString());
    localStorage.setItem('longitude', position.coords.longitude.toString());
  }
}
