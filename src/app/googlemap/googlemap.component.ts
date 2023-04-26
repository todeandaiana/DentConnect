import { Component, OnInit } from '@angular/core';
import { MapGeocoder } from '@angular/google-maps';

@Component({
  selector: 'app-googlemap',
  templateUrl: './googlemap.component.html',
  styleUrls: ['./googlemap.component.css']
})
export class GooglemapComponent implements OnInit {

  ngOnInit(): void {
    
  }

//   // adresele punctelor
//   adrese: string[]= [
//   'Str. Constantin Brâncuși, Nr. 149, Cluj-Napoca, Cluj',
//   'Calea Mănăștur 68A, Cluj-Napoca',
//   'Strada Alverna 33, Cluj-Napoca'
// ];

// // creeaza o harta
// public map = new google.maps.Map(document.getElementById('map'), {
//   zoom: 12,
//   center: {lat: 44.4268, lng: 26.1025}
// });

// // geocode adresele si adauga punctele pe harta

// showLocations(){
//   this.adrese.forEach(adresa => {
//     const geocoder = new google.maps.Geocoder();
//     geocoder.geocode({ address: adresa }, (results, status) => {
//       if (status === "OK") {
//         const pozitie = results[0].geometry.location;
//         new google.maps.Marker({
//           position: pozitie,
//           map: this.map,
//           icon: {
//             url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
//           }
//         });
//       } else {
//         alert("Geocode was not successful for the following reason: " + status);
//       }
//     });
//   });
// }

}
