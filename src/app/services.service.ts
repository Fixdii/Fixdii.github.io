import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';

export interface FlickrPhoto {
  farm: string;
  id: string;
  secret: string;
  server: string;
  title: string;
}

export interface FlickrOutput {
  photos: {
    photo: FlickrPhoto[];
  };
}

@Injectable({
  providedIn: 'root',
})

export class ServicesService {
  constructor(private http: HttpClient) {}

  prevKeyword: string = '';
  currPage = 1;
  eventSubject: Subject<string> = new Subject<string>();

  getImages(key: string, page: number){
    this.prevKeyword = key;
    const url = 'https://www.flickr.com/services/rest/?method=flickr.photos.search&';
    const params = `api_key=${environment.flickr.key}&text=${key}&format=json&nojsoncallback=1&per_page=12&page=${page}`;

    return this.http.get<FlickrOutput>(url + params).pipe(map((res: FlickrOutput) => {
      const urlArr: any[] = [];
      res.photos.photo.forEach((ph: FlickrPhoto) => {
        const photoObj = {
          url: `https://farm${ph.farm}.staticflickr.com/${ph.server}/${ph.id}_${ph.secret}`,
          title: ph.title
        };
        urlArr.push(photoObj);
      });
      return urlArr;
    }));
  }
}
