import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramariCopiiComponent } from './programari-copii.component';

describe('ProgramariCopiiComponent', () => {
  let component: ProgramariCopiiComponent;
  let fixture: ComponentFixture<ProgramariCopiiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramariCopiiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgramariCopiiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
