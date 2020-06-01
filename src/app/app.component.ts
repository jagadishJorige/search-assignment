import { Component, OnInit } from '@angular/core';
import { YoutubeapiService } from './youtubeapi.service';
declare var $:any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'youtubeproject';
  videos: any = [];
  nextPageToken:string;
  prevPageToken:string;
  ytvideolist:any = [];
  searchQuery:string;
  autosearchQuery:string;
  layout:string = 'default';

  constructor(
    private youtubeAPI:YoutubeapiService
  ) {
  }

  ngOnInit() {
  }


  clear() {
    this.layout = 'default';
  }

  // to get youtube list
  getYoutubeResults() {
    if(this.searchQuery && this.searchQuery.length < 3) {
      alert('Not Enough letters for searching');
    } else {
      let url:any = 'https://www.googleapis.com/youtube/v3/search?part=id%2Csnippet&type=video&key=' + this.youtubeAPI.apiKey + '&q=' + this.searchQuery;
      this.youtubeAPI.getYoutubeVideos(url).subscribe(res => {
        let ytresults= res;
        this.layout = 'default2';
        if(ytresults.nextPageToken) {
          this.nextPageToken = ytresults.nextPageToken;
        }
       
         ytresults.items.forEach(obj => {
            //  this.ytvideolist.push(obj.id.videoId);
            this.ytvideolist.push(obj);
          });
          console.log(this.ytvideolist);
      });
    }
  }

  gotoPage(type) {
    let url:any;
    if(type == 'next') {
      url = 'https://www.googleapis.com/youtube/v3/search?part=id%2Csnippet&pageToken=' + this.nextPageToken + 
      '&type=video&key=' + this.youtubeAPI.apiKey + '&q=' + this.searchQuery;
    } else {
      url = 'https://www.googleapis.com/youtube/v3/search?part=id%2Csnippet&pageToken=' + this.prevPageToken + 
      '&type=video&key=' + this.youtubeAPI.apiKey + '&q=' + this.searchQuery;
    }
    this.youtubeAPI.getYoutubeVideos(url).subscribe(res => {
      let ytresults= res;
      this.ytvideolist = [];
      if(ytresults.nextPageToken) {
        this.nextPageToken = ytresults.nextPageToken;
      }
      if(ytresults.prevPageToken) {
         this.prevPageToken = ytresults.prevPageToken;
      } else {
        this.prevPageToken = '';
      }
       ytresults.items.forEach(obj => {
          //  this.ytvideolist.push(obj.id.videoId);
          this.ytvideolist.push(obj);
        });
        
    });
  }

  autoCompleteSearch(value) {
    console.log(value);
    if(value && value.length < 3) {
      // alert('Not Enough letters for searching');
      return
    } else {
      let url:any = 'https://www.googleapis.com/youtube/v3/search?part=id%2Csnippet&type=video&key=' + this.youtubeAPI.apiKey + '&q=' + value;
      this.youtubeAPI.getYoutubeVideos(url).subscribe(res => {
        let ytresults= res;
        this.ytvideolist = [];
        if(ytresults.nextPageToken) {
          this.nextPageToken = ytresults.nextPageToken;
        }
        if(ytresults.prevPageToken) {
           this.prevPageToken = ytresults.prevPageToken;
        } else {
          this.prevPageToken = '';
        }
         ytresults.items.forEach(obj => {
            //  this.ytvideolist.push(obj.id.videoId);
            this.ytvideolist.push(obj);
          });
          
      });
    }
  }

}
