import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiPeliculaComponent } from './mi-pelicula.component';

describe('MiPeliculaComponent', () => {
  let component: MiPeliculaComponent;
  let fixture: ComponentFixture<MiPeliculaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiPeliculaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiPeliculaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
