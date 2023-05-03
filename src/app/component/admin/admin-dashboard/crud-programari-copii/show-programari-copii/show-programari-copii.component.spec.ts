import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowProgramariCopiiComponent } from './show-programari-copii.component';

describe('ShowProgramariCopiiComponent', () => {
  let component: ShowProgramariCopiiComponent;
  let fixture: ComponentFixture<ShowProgramariCopiiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowProgramariCopiiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowProgramariCopiiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
