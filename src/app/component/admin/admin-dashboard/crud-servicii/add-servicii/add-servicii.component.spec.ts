import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddServiciiComponent } from './add-servicii.component';

describe('AddServiciiComponent', () => {
  let component: AddServiciiComponent;
  let fixture: ComponentFixture<AddServiciiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddServiciiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddServiciiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
