import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDoctoriComponent } from './add-doctori.component';

describe('AddDoctoriComponent', () => {
  let component: AddDoctoriComponent;
  let fixture: ComponentFixture<AddDoctoriComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDoctoriComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDoctoriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
