import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroProdutosComponent } from './filtro-produtos.component';

describe('FiltroProdutosComponent', () => {
  let component: FiltroProdutosComponent;
  let fixture: ComponentFixture<FiltroProdutosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltroProdutosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroProdutosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
