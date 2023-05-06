import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparaDoctoriComponent } from './compara-doctori.component';

describe('ComparaDoctoriComponent', () => {
  let component: ComparaDoctoriComponent;
  let fixture: ComponentFixture<ComparaDoctoriComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComparaDoctoriComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComparaDoctoriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
