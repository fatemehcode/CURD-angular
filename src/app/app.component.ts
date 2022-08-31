import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'CURD-angular';
  constructor(private dialog: MatDialog,private api:ApiService) {}
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
    getAllProducts(){
      this.api.getProduct()
        .subscribe({
          next: (res) => { alert('geting data successfully'); },
          error: (res) => { alert('geting data failed'); }
          
        });

    }
  
}
