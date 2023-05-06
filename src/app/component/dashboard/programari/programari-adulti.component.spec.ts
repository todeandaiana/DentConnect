import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramariAdultiComponent } from './programari-adulti.component';

describe('ProgramariAdultiComponent', () => {
  let component: ProgramariAdultiComponent;
  let fixture: ComponentFixture<ProgramariAdultiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramariAdultiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgramariAdultiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
