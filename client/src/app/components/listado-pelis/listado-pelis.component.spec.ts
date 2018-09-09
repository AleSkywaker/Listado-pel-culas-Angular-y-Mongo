import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoPelisComponent } from './listado-pelis.component';

describe('ListadoPelisComponent', () => {
  let component: ListadoPelisComponent;
  let fixture: ComponentFixture<ListadoPelisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadoPelisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoPelisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
