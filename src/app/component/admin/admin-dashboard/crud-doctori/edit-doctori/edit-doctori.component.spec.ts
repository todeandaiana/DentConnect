import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDoctoriComponent } from './edit-doctori.component';

describe('EditDoctoriComponent', () => {
  let component: EditDoctoriComponent;
  let fixture: ComponentFixture<EditDoctoriComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDoctoriComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditDoctoriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
