import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOreDisponibileComponent } from './edit-ore-disponibile.component';

describe('EditOreDisponibileComponent', () => {
  let component: EditOreDisponibileComponent;
  let fixture: ComponentFixture<EditOreDisponibileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditOreDisponibileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditOreDisponibileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
