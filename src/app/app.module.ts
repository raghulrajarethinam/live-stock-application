import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {LiveStockComponent} from './livestock.component'
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule,MatInputModule} from '@angular/material';
import {LiveStockService} from './livestock.service'
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';


import { AppComponent } from './app.component';
@NgModule({
  imports:      [ BrowserModule,FormsModule,MatChipsModule,MatIconModule,MatFormFieldModule,HttpClientModule,BrowserAnimationsModule,MatInputModule,ToastrModule.forRoot({
    positionClass: 'toast-bottom-right'
  })],
  declarations: [ AppComponent,LiveStockComponent ],
  bootstrap:    [ AppComponent ],
  providers: [LiveStockService]
})
export class AppModule { }
