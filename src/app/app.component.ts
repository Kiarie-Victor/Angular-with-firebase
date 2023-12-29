import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'httprequestwithfirebase';

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
    this.http.get('https://angular-proj-19fb8-default-rtdb.firebaseio.com/products.json')
    .subscribe((res)=>{
      console.log(res)
      console.log(Object.values(res))
    })
  }
  //pipe(map(res) => {
  //   const products = []
  //   for(const key in res){
  //     if(res.hasOwnProperty(key)){
  //       products.push({...res[key],id:key})
  //     }
  //   }
  //   return products}0

  

}
