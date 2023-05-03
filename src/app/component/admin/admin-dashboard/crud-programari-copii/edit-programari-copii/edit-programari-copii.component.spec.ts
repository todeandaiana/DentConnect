import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProgramariCopiiComponent } from './edit-programari-copii.component';

describe('EditProgramariCopiiComponent', () => {
  let component: EditProgramariCopiiComponent;
  let fixture: ComponentFixture<EditProgramariCopiiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditProgramariCopiiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditProgramariCopiiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
