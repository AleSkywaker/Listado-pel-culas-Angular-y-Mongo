import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MispeliculasComponent } from './mispeliculas.component';

describe('MispeliculasComponent', () => {
  let component: MispeliculasComponent;
  let fixture: ComponentFixture<MispeliculasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MispeliculasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MispeliculasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
