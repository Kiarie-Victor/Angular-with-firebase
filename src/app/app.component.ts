import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Product } from './model/products';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'httprequestwithfirebase';
  allProducts:Product[] = []
  isFetching:boolean = false

  constructor(private http:HttpClient){}

  ngOnInit(){
    this.fetchProducts()
  }

  onProductCreate(products : {pname:string, desc : string, price: string}){
    console.log(products)
    const headers = new HttpHeaders({'name':'victor'})
    this.http.post('https://angular-proj-19fb8-default-rtdb.firebaseio.com/products.json',products,{headers:headers})
    .subscribe((res)=>{
      console.log(res)
    })
  }

  private fetchProducts(){
    this.isFetching = true
    this.http.get<{[key:string]: Product}>('https://angular-proj-19fb8-default-rtdb.firebaseio.com/products.json')
    .pipe(map((res) => {
      const products = []
      for(const key in res){
        if(res.hasOwnProperty(key)){
          products.push({...res[key],id:key})
        }
      }
      return products}))
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
    this.http.delete('https://angular-proj-19fb8-default-rtdb.firebaseio.com/products/'+id+'.json')
    .subscribe((res)=>{
      console.log(res)
    })
  }

  onDeleteAllProd(){
    this.http.delete('https://angular-proj-19fb8-default-rtdb.firebaseio.com/products.json')
    .subscribe((res)=>{
      console.log(res)
    })

}
}
