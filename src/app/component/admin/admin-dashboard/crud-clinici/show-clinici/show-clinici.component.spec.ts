import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCliniciComponent } from './show-clinici.component';

describe('ShowCliniciComponent', () => {
  let component: ShowCliniciComponent;
  let fixture: ComponentFixture<ShowCliniciComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowCliniciComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowCliniciComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
