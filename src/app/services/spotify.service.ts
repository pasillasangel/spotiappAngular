import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SpotifyService {

  constructor(public http: HttpClient ) {
    console.log('Servicio de Spotify Listo!!!');
  }

  artistas:any [] = [];

  urlSpotify:string = 'https://api.spotify.com/v1/';

  token:string = 'BQAaueCK-h7_lvMa0HPOjLBRZjzYmEn7cjm8nRAe2_yeiFuLB9IeAfJSvlMXhQmzd3qTU60VHkJGigGR6B0';

  private getHeaders():HttpHeaders {
    let headers = new HttpHeaders({
      'authorization': 'Bearer ' + this.token
    })
    return headers;
  }

  getArtist(termino:string){
    let url = `${ this.urlSpotify }search?query=${ termino }&type=artist&limit=20`;

    let headers = this.getHeaders();

    return this.http.get(url, { headers })
        .map( ( resp:any ) => {
          this.artistas = resp.artists.items;
          return this.artistas;
        })
  }

  getArtista(id:string){
    let url = `${ this.urlSpotify }artists/${ id }`;

    let headers = this.getHeaders();

    return this.http.get(url, { headers });
  }


  getTop(id:string){
    let url = `${ this.urlSpotify }artists/${ id }/top-tracks?country=US`;

    let headers = this.getHeaders();

    return this.http.get(url, { headers });
  }

}
