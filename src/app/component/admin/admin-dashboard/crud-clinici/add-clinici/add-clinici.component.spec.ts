import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCliniciComponent } from './add-clinici.component';

describe('AddCliniciComponent', () => {
  let component: AddCliniciComponent;
  let fixture: ComponentFixture<AddCliniciComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCliniciComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCliniciComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
