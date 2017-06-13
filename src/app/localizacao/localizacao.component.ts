import { Estabelecimento } from '../perfil/estabelecimento';
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
  estabelecimento: Estabelecimento;

  ngOnInit() {
    this.getLocation();

    const latitude = parseFloat(localStorage.getItem('latitude'));
    const longitude = parseFloat(localStorage.getItem('longitude'));

    this.options = {
      center: { lat: latitude, lng: longitude },
      zoom: 12
    };

    localStorage.removeItem('latitude');
    localStorage.removeItem('longitude');
  }

  handleMapClick(event) {
    this.selectedPosition = event.latLng;

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

  clearMarkers() {
    this.overlays = [];
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition);
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }

  showPosition(position) {
    localStorage.setItem('latitude', position.coords.latitude);
    localStorage.setItem('longitude', position.coords.longitude);
  }
}
