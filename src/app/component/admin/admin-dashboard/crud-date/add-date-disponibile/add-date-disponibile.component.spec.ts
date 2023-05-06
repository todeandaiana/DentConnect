import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDateDisponibileComponent } from './add-date-disponibile.component';

describe('AddDateDisponibileComponent', () => {
  let component: AddDateDisponibileComponent;
  let fixture: ComponentFixture<AddDateDisponibileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDateDisponibileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDateDisponibileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
