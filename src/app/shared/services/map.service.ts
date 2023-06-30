import { Injectable, NgZone } from '@angular/core';
import { MapGeocoderResponse } from '@angular/google-maps';
import { Observable } from 'rxjs';


declare var google: any;

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private _geocoder: google.maps.Geocoder | undefined;

    constructor(private readonly _ngZone: NgZone) {}

    geocode(request: google.maps.GeocoderRequest): Observable<MapGeocoderResponse> {
      return new Observable(observer => {

        if (!this._geocoder) {
          this._geocoder = new google.maps.Geocoder();
        }
  
        this._geocoder.geocode(request, (results, status) => {
          this._ngZone.run(() => {
            observer.next({results: results || [], status});
            observer.complete();
          });
        });
      });
    }
}
