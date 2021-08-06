import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
})
export class ContentComponent implements OnInit {
  images: any[] = [];
  savedImages: any[] = [];
  keyword: string = '';
  page: number = 0;
  length = 1000;
  pageSize = 12;
  pageSizeOptions: number[] = [12];
  searchValue: string = '';

  constructor(
    private servicesService: ServicesService,
    private cd: ChangeDetectorRef
  ) {}

  search(event: any) {
    this.images = [];
    this.keyword = event.target.value.toLowerCase();

    if (this.keyword && this.keyword.length > 0) {
      this.servicesService
        .getImages(this.keyword, (this.page = 1))
        .toPromise()
        .then((res) => {
          this.images = res;
        });
    }
  }

  paginator(event: any) {
    this.page = event.pageIndex + 1;
    if (this.keyword && this.keyword.length > 0) {
      this.servicesService
        .getImages(this.keyword, this.page)
        .toPromise()
        .then((res) => {
          this.images = res;
        });
    }
  }

  save(event: any) {
    const target = event.target;
    const parent = target.closest('.card');
    const url = parent.querySelector('img').getAttribute('src');

    if (target.textContent == 'save') {
      // this.savedImages.map((obj) => {
      //   if (obj.url === url) {
      //     alert('This photo has already been added!');
      //     return;
      //   }
      // })
      this.savedImages.push({ url: url });
      localStorage.setItem('url', JSON.stringify(this.savedImages));
    } else {
      //this.delete(url);
    }
  }

  // delete(url: string) {
  //   this.savedImages.map((obj) => {
  //     if (obj.url === url.substr(0, url.length - 6)) {
  //       let index = this.savedImages.indexOf(obj);
  //       this.savedImages.splice(index, 1);
  //       localStorage.setItem('url', JSON.stringify(this.savedImages));
  //       this.servicesService.eventSubject.next('showSaved');
  //       this.cd.detectChanges();
  //     }
  //   });
  // }

  showSavedPhoto() {
    this.searchValue = '';
    const returnUrl: any = localStorage.getItem('url');

    if (JSON.parse(returnUrl)) {
      this.savedImages = JSON.parse(returnUrl);
    }
    this.images = JSON.parse(returnUrl);
    this.cd.detectChanges();

    let buttonSaved = document.querySelectorAll('.save');
    let buttons = Array.from(buttonSaved);
    for (const btn of buttons) {
      btn.textContent = 'delete';
    }
  }

  ngOnInit(): void {
    const returnUrl: any = localStorage.getItem('url');
    this.savedImages = JSON.parse(returnUrl);

    this.servicesService.eventSubject.subscribe((event) => {
      this.showSavedPhoto();
    });
  }
}
