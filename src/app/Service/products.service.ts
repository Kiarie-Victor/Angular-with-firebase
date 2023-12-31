import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map } from "rxjs/operators";
import { Product } from "../model/products";
import { Subject, throwError } from "rxjs";

@Injectable({
    providedIn:'root'
})
export class ProductsService{
    error = new Subject<string>()
    constructor (private http:HttpClient){}

    createProduct(products : {pname:string, desc : string, price: string}){
        console.log(products)
        const headers = new HttpHeaders({'name':'victor'})
        this.http.post('https://angular-proj-19fb8-default-rtdb.firebaseio.com/products.json',products,{headers:headers})
        .subscribe((res)=>{
        console.log(res)
        }, (err)=>{
            this.error.next(err.message)
        })

    }

    fetchProduct(){
        const header = new HttpHeaders()
        .set('content-type','application/json')
        .set('Access-Control-Allow-Origin', '*')
        const params = new HttpParams()
        .set('print','pretty')
        .set('pageNum', '1')
       return this.http.get<{[key:string]: Product}>('https://angular-proj-19fb8-default-rtdb.firebaseio.com/products.json', {headers:header, params:params})
        .pipe(map((res) => {
        const products = []
        for(const key in res){
            if(res.hasOwnProperty(key)){
            products.push({...res[key],id:key})
            }
        }
        return products}),catchError((error)=>{
            return throwError(error)
        }))

    }

    deleteProduct(id:string){
        let header = new HttpHeaders();
        header = header.append('myHeaders1', 'Value1')
        header = header.append('myHeaders2', 'Value2')
        this.http.delete('https://angular-proj-19fb8-default-rtdb.firebaseio.com/products/'+id+'.json', {headers:header})
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