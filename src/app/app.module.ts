import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListItemsComponent } from './list-items/list-items.component';
import { PaymentsComponent } from './payments/payments.component';
import { HeaderComponent } from './header/header.component';
import { CreditCardComponent } from './credit-card/credit-card.component';
import { FiltroProdutosComponent } from './filtro-produtos/filtro-produtos.component';
import { KeyboardComponent } from './keyboard/keyboard.component';
import { FormsModule }   from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ListItemsComponent,
    PaymentsComponent,
    HeaderComponent,
    CreditCardComponent,
    FiltroProdutosComponent,
    KeyboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
