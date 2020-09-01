import { Component, OnInit } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { OrderListService } from '../order-list.service';
import { trigger, transition, query, style, stagger, animate, animation } from '@angular/animations';
import { popUpBox, box } from '../animations';

var formato = { minimumFractionDigits: 2 , style: 'currency', currency: 'BRL' }

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss'],
  animations: [
    trigger('listAnimation', [
      transition('*=>*', [
        query(':enter', [
          style({ background: 'transparent', opacity: 0.7}),
          stagger(35, [ 
           animate('130ms ease-in', style({background: '#fc9117', opacity: 1})),
           animate('130ms ease-in', style({background: 'transparent', opacity: 1})),
           animate('130ms ease-in', style({background: '#fc9117', opacity: 1})),
           animate('130ms ease-in', style({background: 'transparent', opacity: 0.7})),
          ])
        ], { optional: true }),
        query(':leave', [
          style({opacity: 0.7, transform: 'translateY(0px)'}),
          stagger(-100, [
            animate('150ms ease-out', style({opacity: 0, transform: 'translateY(20px)'}))
          ])
        ], {optional: true})
      ])
    ]),
    popUpBox,
    box
  ]
})
export class PaymentsComponent implements OnInit {

  alertRemove = false;

  actualIndexRemove = null

  alertCancelOrder = false
  checkoutAlert = false
  checkingOutAlert = false

  confirming = false;

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
    this.confirming = true;
    this._service.cancelOrder()
    setTimeout(()=>{
      this.confirming = false;
      this.alertCancelOrder = false
    }, 1000)
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
    this.checkingOutAlert = true
    console.log('checkingOutAlert', this.checkingOutAlert)
    const subtotal = this._service.orderList.map(item=>item.total).reduce((a,b)=>{return a+b},0 )
    const taxes = this._service.orderList.map(item=>item.taxes).reduce((a,b)=>{return a+b},0 )
    const total = subtotal+taxes

    this._service.confirmCheckout(subtotal, taxes, total)

    setTimeout(()=>{
      this.checkingOutAlert = false
    }, 3000)
  }

}
