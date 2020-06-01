import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class YoutubeapiService {
  apiKey : string = 'AIzaSyCu6MpP4Aq-JtGWXhzb5sBNxioV9SPYaTs';
  returnapimethod: any;
  headers:any;

  constructor(private http:HttpClient) { }

  getYoutubeVideos(url) {
    var headers = new HttpHeaders()
    .append("Content-Type", "application/json");

    // let url = 'https://www.googleapis.com/youtube/v3/search?part=id%2Csnippet&type=video,playlist&key=' + this.apiKey + '&q=' + searchquery;
    this.returnapimethod = this.http.get(url, {
      headers: this.headers,
    });
    return this.returnapimethod;
  }
}
