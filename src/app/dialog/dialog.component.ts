import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { MatDialogRef ,MatDialogClose,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})

export class DialogComponent implements OnInit {
  freshnessList = ['new', 'second Hand', 'Refurbished'];
  productForm!: FormGroup;
  actionButton: string = 'save';
  
  constructor(private formBuilder: FormBuilder,
    private api: ApiService,
    private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData:any,
  ) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productName: ['', Validators.required],
      productCategory: ['', Validators.required],
      productPrice: ['', Validators.required],
      productFreshness: ['', Validators.required],
      productComment: ['', Validators.required],
      productDate: ['', Validators.required]      
    })
    if (this.editData) {
      this.productForm.controls['productName'].setValue(this.editData.productName);
      this.productForm.controls['productCategory'].setValue(this.editData.productCategory);
      this.productForm.controls['productPrice'].setValue(this.editData.productPrice);
      this.productForm.controls['productDate'].setValue(this.editData.productDate);
      this.productForm.controls['productComment'].setValue(this.editData.productComment);
      this.productForm.controls['productFreshness'].setValue(this.editData.productFreshness);
      this.actionButton = 'update';
    }
    
  }
  addProduct() {
    //console.log(this.productForm.value);
    if (!this.editData) {
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
    else {this.updateProduct();}

  }
  
  updateProduct() {
    this.api.putProduct(this.productForm.value, this.editData.id)
      .subscribe({
        next: (res) => {
          alert(' update successfully!');
          this.productForm.reset();
          this.dialogRef.close('update');
        },
        error: (res) => {
          alert('update problem!');
          this.dialogRef.close('error in update');
        },
      });
    }
    
  }



