import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})

export class DialogComponent implements OnInit {
  freshnessList = ['new', 'second Hand', 'Refurbished'];
  productForm!: FormGroup;
  
  constructor(private formBuilder: FormBuilder,
    private api: ApiService,
  private dialogRef:MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productName: ['', Validators.required],
      productCategory: ['', Validators.required],
      productPrice: ['', Validators.required],
      productFreshness: ['', Validators.required],
      productComment: ['', Validators.required],
      productDate: ['', Validators.required]      
    })
  }
  addProduct() {
    //console.log(this.productForm.value);
    if (this.productForm.valid) {
      this.api.postProduct(this.productForm.value).subscribe({
        next: (res) => {
          alert('successfully!');
          this.productForm.reset();
          this.dialogRef.close('save');
        },
        error: (res) => {
          alert('problem!');
          this.dialogRef.close('error in saveing');
        },        
      });
    }

  }

}
