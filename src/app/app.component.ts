import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
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
export class AppComponent implements AfterViewInit  {
  title = 'CURD-angular';
  displayedColumns: string[] = [
    'id',
    'productName',
    'productCategory',
    'productPrice',
    'productFreshness',
    'productDate',
    'productComment',
    'action'
  ];

  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private dialog: MatDialog,
    private api: ApiService,
    private router:Router) { }
  
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    }
  
  ngOnInit(): void {
       this.getAllProducts();   
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width:'30%',
    }).afterClosed().subscribe(val => {
      if (val === 'save') { this.getAllProducts(); }
    });   
  }
  
  getAllProducts(): void{
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
  
  editProduct(row:any) {
    this.dialog.open(DialogComponent,{
      width: '30%',
      data:row,
    }).afterClosed().subscribe(val => {
      if (val === 'update') { this.getAllProducts(); }
    });  
  }

  deleteProduct(row:any) {
    this.api.deleteProduct(row.id).subscribe({
        next: (res) => {
        alert(' delete successfully!'); 
        this.getAllProducts();
        },
        error: (res) => {
          alert('delete problem!');         
        },
      });
    }
}
