import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { Product } from "../model/products";

@Injectable({
    providedIn:'root'
})
export class ProductsService{
    constructor (private http:HttpClient){}

    createProduct(products : {pname:string, desc : string, price: string}){
        console.log(products)
        const headers = new HttpHeaders({'name':'victor'})
        this.http.post('https://angular-proj-19fb8-default-rtdb.firebaseio.com/products.json',products,{headers:headers})
        .subscribe((res)=>{
        console.log(res)
        })

    }

    fetchProduct(){

       return this.http.get<{[key:string]: Product}>('https://angular-proj-19fb8-default-rtdb.firebaseio.com/products.json')
        .pipe(map((res) => {
        const products = []
        for(const key in res){
            if(res.hasOwnProperty(key)){
            products.push({...res[key],id:key})
            }
        }
        return products}))

    }

    deleteProduct(id:string){
        this.http.delete('https://angular-proj-19fb8-default-rtdb.firebaseio.com/products/'+id+'.json')
        .subscribe((res)=>{
        console.log(res)
        })
    }

    deleteAllProduct(){
        this.http.delete('https://angular-proj-19fb8-default-rtdb.firebaseio.com/products.json')
        .subscribe((res)=>{
        console.log(res)
        })

    }

     updateProduct(products : Product, id:string){
        this.http.put('https://angular-proj-19fb8-default-rtdb.firebaseio.com/products/'+id+'json', products)
        .subscribe();
     }
}