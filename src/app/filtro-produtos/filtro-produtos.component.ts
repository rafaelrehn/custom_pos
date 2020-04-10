import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filtro-produtos',
  templateUrl: './filtro-produtos.component.html',
  styleUrls: ['./filtro-produtos.component.scss']
})
export class FiltroProdutosComponent implements OnInit {

  drinkType = [
    { label: 'Hot', value: 'hot' },
    { label: 'Cold', value: 'cold' },
    { label: 'Juice', value: 'juice' },
    { label: 'Drink', value: 'drink' },
    { label: 'Beer', value: 'beer' },
    { label: 'Vine', value: 'vine' },
  ]

  foodType = [
    { label: 'Sandwich', value: 'andwich' },
    { label: 'Hamburguer', value: 'hamburguer' },
    { label: 'Pizza', value: 'pizza' },
    { label: 'French Fries', value: 'fries' },
    { label: 'Dessert', value: 'dessert' },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
