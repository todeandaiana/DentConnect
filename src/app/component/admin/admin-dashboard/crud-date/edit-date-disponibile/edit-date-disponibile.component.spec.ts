import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDateDisponibileComponent } from './edit-date-disponibile.component';

describe('EditDateDisponibileComponent', () => {
  let component: EditDateDisponibileComponent;
  let fixture: ComponentFixture<EditDateDisponibileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDateDisponibileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditDateDisponibileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
