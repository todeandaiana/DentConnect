import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSpecializariComponent } from './add-specializari.component';

describe('AddSpecializariComponent', () => {
  let component: AddSpecializariComponent;
  let fixture: ComponentFixture<AddSpecializariComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSpecializariComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSpecializariComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
