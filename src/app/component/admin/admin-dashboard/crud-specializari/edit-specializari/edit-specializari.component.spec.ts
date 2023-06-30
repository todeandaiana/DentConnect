import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSpecializariComponent } from './edit-specializari.component';

describe('EditSpecializariComponent', () => {
  let component: EditSpecializariComponent;
  let fixture: ComponentFixture<EditSpecializariComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSpecializariComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditSpecializariComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
