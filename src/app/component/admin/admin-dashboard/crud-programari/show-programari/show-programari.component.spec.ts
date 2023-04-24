import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowProgramariComponent } from './show-programari.component';

describe('ShowProgramariComponent', () => {
  let component: ShowProgramariComponent;
  let fixture: ComponentFixture<ShowProgramariComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowProgramariComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowProgramariComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
