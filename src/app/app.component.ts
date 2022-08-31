import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';
import { Router, RouterLink } from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'CURD-angular';
  displayedColumns: string[] = [
    'id',
    'productName',
    'productCategory',
    'productPrice',
    'productFreshness',
    'productDate',
    'productComment'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private dialog: MatDialog,
    private api: ApiService,
    private router:Router) { }
  ngOnInit(): void {
    this.getAllProducts();    
  }
  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width:'30%',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  showProduct() {
    console.log('hi');
    

  }
  getAllProducts(){
      this.api.getProduct()
        .subscribe({
          next: (res) => {
            this.dataSource = new MatTableDataSource(res); 
            console.log(this.dataSource);
          },
          error: (res) => { alert('geting data failed'!); }
          
        });

  }
  
  applyFilter(event:Event): void{
  const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }  
  formatedDate(myDate:Date) {
    const format = 'dd/MM/yyyy';
    const locale = 'en-US';
    return formatDate(myDate, format, locale);
  }
}
