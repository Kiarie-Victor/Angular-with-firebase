import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from './model/products';
import { ProductsService } from './Service/products.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'httprequestwithfirebase';
  allProducts:Product[] = []
  isFetching:boolean = false
  editMode:boolean = false
  currentProductId :string;
  @ViewChild('productsForm') form :NgForm

  constructor( private service:ProductsService){}

  ngOnInit(){
    this.fetchProducts()
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

