import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOreDisponibileComponent } from './add-ore-disponibile.component';

describe('AddOreDisponibileComponent', () => {
  let component: AddOreDisponibileComponent;
  let fixture: ComponentFixture<AddOreDisponibileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOreDisponibileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddOreDisponibileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
