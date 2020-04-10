import { Component, OnInit } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { OrderListService } from '../order-list.service';

var formato = { minimumFractionDigits: 2 , style: 'currency', currency: 'BRL' }

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {

  alertRemove = false;

  actualIndexRemove = null

  alertCancelOrder = false
  checkoutAlert = false

  constructor(
    public _service: OrderListService
  ) { }

  ngOnInit(): void {

  }

  remove(item){
    this.alertRemove = true
    this.actualIndexRemove = item;
    // this._service.removeCart(index)
  }

  subtotal(){
    return this._service.orderList.map(item=>item.total).reduce((a,b)=>{return a+b},0 ).toLocaleString('pt-BR', formato)
  }

  taxes(){
    return this._service.orderList.map(item=>item.taxes).reduce((a,b)=>{return a+b},0 ).toLocaleString('pt-BR', formato)
  }

  total(){
    const x = this._service.orderList.map(item=>item.total).reduce((a,b)=>{return a+b},0 )
    const y = this._service.orderList.map(item=>item.taxes).reduce((a,b)=>{return a+b},0 )
    return (x+y).toLocaleString('pt-BR', formato)
  }

  actionBtn(event: 'cancel' | 'new' | 'checkout'){
    switch (event) {
      case 'cancel':
          this.cancelEvent()
        break;
      case 'new':
        // this.cancelEvent()
        this.alertCancelOrder = true
        break;
      case 'checkout':
        this.checkoutAlert = true
        break;
    
      default:
        break;
    }
  }

  cancelEvent(){
    this._service.cancelOrder()
  }

  alertBtn(evt: 'cancel'|'confirm'){
    switch (evt) {
      case 'confirm':
        if(this.actualIndexRemove){
          console.log('actualIndexRemove', this.actualIndexRemove)
          this._service.removeCart(this.actualIndexRemove)
        }
        this.actualIndexRemove = null
        this.alertRemove = false
        break;
      case 'cancel':
        this.actualIndexRemove = null
        this.alertRemove = false
      break;
    
      default:
        break;
    }
  }

  cancelOrder(evt: 'cancel'|'confirm'){
    switch (evt) {
      case 'confirm':
        this.cancelEvent()
        this.alertCancelOrder = false
        break;
      case 'cancel':
        this.alertCancelOrder = false
        break;
    
      default:
        break;
    }
  }

  checkoutEvt(evt: 'cancel'|'confirm'){
    switch (evt) {
      case 'confirm':
        this.goCheckout()
        this.checkoutAlert = false
        break;
      case 'cancel':
        this.checkoutAlert = false
        break;
    
      default:
        break;
    }
  }

  goCheckout(){
    const subtotal = this._service.orderList.map(item=>item.total).reduce((a,b)=>{return a+b},0 )
    const taxes = this._service.orderList.map(item=>item.taxes).reduce((a,b)=>{return a+b},0 )
    const total = subtotal+taxes

    this._service.confirmCheckout(subtotal, taxes, total)
  }

}
