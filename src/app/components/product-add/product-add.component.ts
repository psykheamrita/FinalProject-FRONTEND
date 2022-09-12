import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/services/product.service';
@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  productAddFormGroup : FormGroup;

  constructor(
    private formBuilder : FormBuilder,
    private productService : ProductService,
    private toastrService : ToastrService,
  ) { }

  ngOnInit(): void {
    this.createProductAddForm();
  }

  createProductAddForm(){
    this.productAddFormGroup = this.formBuilder.group({
      productName : ["",Validators.required],
      unitPrice : ["",Validators.required],
      quantityPerUnit : ["",Validators.required],
      unitsInStock : ["",Validators.required],
      categoryId : ["",Validators.required],
    })

  }
  addProduct(){
    if(this.productAddFormGroup.valid){
      let productModel = Object.assign({}, this.productAddFormGroup.value);
      this.productService.addProduct(productModel).subscribe((response)=>{
        this.toastrService.success(response.message, "Transaction Completed")
      },(responseError)=>{
        if(responseError.error.Errors.length>0){
          console.log(responseError.error.Errors)
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage, "Warning")
          }
        }
      })
    }else{
      this.toastrService.error("Fill out the form completely.", "Warning")
    }
  }
}
