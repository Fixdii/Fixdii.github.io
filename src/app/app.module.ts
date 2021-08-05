import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule }   from '@angular/common/http';
import {MatPaginatorModule} from '@angular/material/paginator';


import { AppComponent } from './app.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ContentComponent } from './content/content.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    SidenavComponent,
    ContentComponent
  ],
  imports: [
    BrowserModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatPaginatorModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
