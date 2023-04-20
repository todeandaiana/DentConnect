import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparaServiciiComponent } from './compara-servicii.component';

describe('ComparaServiciiComponent', () => {
  let component: ComparaServiciiComponent;
  let fixture: ComponentFixture<ComparaServiciiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComparaServiciiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComparaServiciiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
