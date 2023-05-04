import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSpecializariComponent } from './show-specializari.component';

describe('ShowSpecializariComponent', () => {
  let component: ShowSpecializariComponent;
  let fixture: ComponentFixture<ShowSpecializariComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowSpecializariComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowSpecializariComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
