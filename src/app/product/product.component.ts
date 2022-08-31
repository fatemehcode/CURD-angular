import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'showProduct',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})

export class ProductComponent implements OnInit {
  freshnessList = ['new', 'second Hand', 'Refurbished'];
  productForm!: FormGroup;
  
  constructor(private formBuilder: FormBuilder,
    private api: ApiService,
   private dialogRef:MatDialogRef<ProductComponent>) { }

  ngOnInit(): void {
   
  }
  showProduct() {   

  }

}
