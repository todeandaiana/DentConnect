import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCliniciComponent } from './edit-clinici.component';

describe('EditCliniciComponent', () => {
  let component: EditCliniciComponent;
  let fixture: ComponentFixture<EditCliniciComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCliniciComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCliniciComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
