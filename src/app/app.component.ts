import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Product } from './model/products';
import { ProductsService } from './Service/products.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'httprequestwithfirebase';
  allProducts:Product[] = []
  isFetching:boolean = false
  editMode:boolean = false
  currentProductId :string;
  errorMessage:string = null
  errorSub : Subscription
  @ViewChild('productsForm') form :NgForm

  constructor( private service:ProductsService){}
  ngOnDestroy(): void {
    this.errorSub.unsubscribe()
  }

  ngOnInit(){
    this.fetchProducts()
    this.errorSub = this.service.error.subscribe((errorMessage) =>{
      this.errorMessage = errorMessage
    })
  }

  onProductCreate(products : {pname:string, desc : string, price: string}){
    if(this.editMode){
      this.service.createProduct(products)
    }
    else
      this.service.updateProduct(products, this.currentProductId)
  }

  private fetchProducts(){
    this.isFetching = true
    this.service.fetchProduct()
    .subscribe((products)=>{
      console.log(products)
      this.allProducts = products
      this.isFetching = false
    }, (err)=>{
      this.errorMessage = err.message 
    })
  }

  onProductsFetch(){
    this.fetchProducts()
  }

  onDeleteProd(id:string){
    this.service.deleteProduct(id);
  }

  onDeleteAllProd(){
    this.service.deleteAllProduct()

}
  onEditProd(id){
    this.currentProductId = id
    let currentProduct = this.allProducts.find((p)=> {
      return p.id == id
      })
      
      this.form.form.patchValue({
        pname: currentProduct.pname,
        desc: currentProduct.desc,
        price: currentProduct.price
      })

      this.editMode = true
    }

  }

