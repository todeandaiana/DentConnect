import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VizualizareServiciiComponent } from './vizualizare-servicii.component';

describe('VizualizareServiciiComponent', () => {
  let component: VizualizareServiciiComponent;
  let fixture: ComponentFixture<VizualizareServiciiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VizualizareServiciiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VizualizareServiciiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
