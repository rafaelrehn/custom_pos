import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderListService {

  checkoutList = []

  orderList = []

  taxes = 0.07

  constructor() { }

  addCart(item: any, qtd?: number){
    const _quantity = qtd || 1
    const _total = this.returnParsed(_quantity*item.price)
    const _taxes = this.returnParsed(_total*this.taxes)
    this.orderList.unshift(
      Object.assign({},item, 
        {
          qtd: _quantity, 
          total: _total, 
          taxes: _taxes, 
          uuid: this.uuid()
        }
      )
    )
  }

  removeCart(index: any){
    //this.orderList.splice(index, 1)
    const i = this.orderList.map(item=>item.uuid).indexOf(index.uuid)
    if(i>-1){this.orderList.splice(i, 1)}
  }

  cancelOrder(){
    this.orderList = []
  }

  uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  confirmCheckout(subtotal:number, taxes:number, total:number){
    this.checkoutList.push(Object.assign({},this.orderList,{
      subtotal: subtotal,
      taxes: taxes,
      total: total,
    }))
    console.log('checkoutList', this.checkoutList)
    this.cancelOrder()
  }

  returnParsed(number: number){
    return parseFloat((number).toFixed(2))
  }
}
