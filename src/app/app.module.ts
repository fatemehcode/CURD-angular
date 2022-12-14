import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router, Routes } from '@angular/router';
//materials
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule } from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { DialogComponent } from './dialog/dialog.component';
import { ProductComponent } from './product/product.component';
import { formatDate } from "@angular/common";
const routes:
  Routes = [
    { path: '/products', component: ProductComponent }
  ];

@NgModule({
  declarations: [
    AppComponent,
    DialogComponent,
    ProductComponent
  ],
  imports: [
    BrowserModule,AppRoutingModule,BrowserAnimationsModule,
    MatToolbarModule,MatIconModule,MatButtonModule,MatDialogModule,
    MatFormFieldModule, MatInputModule, MatSelectModule, MatDatepickerModule,
    MatNativeDateModule,MatRadioModule, ReactiveFormsModule, HttpClientModule,
    MatPaginatorModule, MatTableModule,
    

  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
