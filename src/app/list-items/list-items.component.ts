import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { OrderListService } from '../order-list.service';
import { ArrayListItems } from '../list-item';
import { trigger, transition, style, animate, stagger, query, animation } from '@angular/animations';
import { box, popUpBox } from '../animations';



@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.scss'],
  animations: [
    box,
    popUpBox,
     trigger('listAnimation', [
       transition('*=>*', [
         query(':enter',[
           style({ opacity: 0}),
           stagger(100, [ 
            animate('150ms ease-in', style({opacity: 0.8}))
           ])
         ])
       ])
     ])
  ]
  // animations: [
  //   trigger('numberKeyboard', [
  //     transition(':enter', [
  //       style({ opacity: 0 }),
  //       animate('100ms', style({ opacity: 1 })),
  //     ]),
  //     transition(':leave', [
  //       animate('100ms', style({ opacity: 0 }))
  //     ])
  //   ]),
  // ]
})
export class ListItemsComponent implements OnInit {

  @ViewChild('qtdInput') qtdInput: ElementRef

  setQtd = false

  totalItems = 60;

  listItems = []

  selectedElement: any;

  inputValue = 0

  constructor(
    private _orderListService: OrderListService
  ) {
    this.listItems = ArrayListItems
   }

  ngOnInit(): void {
  }


  pushOrderList(item: any, qtd?: number){
    this._orderListService.addCart(item, qtd)    
    this.setQtd = false
    this.inputValue = 0
  }

  click(i){
    this.selectedElement = this.listItems[i]
    this.setQtd = true
    setTimeout(()=>{
      this.qtdInput.nativeElement.focus()
    }, 50)
  }

  addBtnAction(action: 'confirm' | 'cancel'){
    switch (action) {
      case 'cancel':
        this.setQtd = false
        this.inputValue = 0
        break;

      case 'confirm':
        if(this.inputValue > 0){
          this.qtdInput.nativeElement.value = 0
          this.pushOrderList(this.selectedElement, this.inputValue)
          this.inputValue = 0
        }
        this.setQtd = false
        break;
    
      default:
        break;
    }
  }

  keyAddInput($event: KeyboardEvent){
    if($event.key == 'Enter'){
      this.addBtnAction('confirm')
    }else if($event.key == 'Escape'){
      this.addBtnAction('cancel')
    }
  }

  appKeyboardEvent(evt){
    console.log('evt?', evt)
    if(evt== 'clear'){
      this.inputValue = 0
    }else{
      let currentValue = (this.qtdInput.nativeElement.value || '').toString()
      currentValue = currentValue + evt.toString()
      this.inputValue = parseFloat(currentValue)

    }
    
  }

  focusInput(){
    this.qtdInput.nativeElement.select()
  }

}
