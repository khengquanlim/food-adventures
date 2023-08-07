import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantOwnerProfileComponent } from './restaurant-owner-profile.component';

describe('RestaurantOwnerProfileComponent', () => {
  let component: RestaurantOwnerProfileComponent;
  let fixture: ComponentFixture<RestaurantOwnerProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestaurantOwnerProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestaurantOwnerProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
