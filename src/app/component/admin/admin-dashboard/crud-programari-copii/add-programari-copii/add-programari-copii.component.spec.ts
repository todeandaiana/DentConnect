import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProgramariCopiiComponent } from './add-programari-copii.component';

describe('AddProgramariCopiiComponent', () => {
  let component: AddProgramariCopiiComponent;
  let fixture: ComponentFixture<AddProgramariCopiiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProgramariCopiiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddProgramariCopiiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
