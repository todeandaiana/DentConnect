import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDateDisponibileComponent } from './show-date-disponibile.component';

describe('ShowDateDisponibileComponent', () => {
  let component: ShowDateDisponibileComponent;
  let fixture: ComponentFixture<ShowDateDisponibileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowDateDisponibileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowDateDisponibileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
