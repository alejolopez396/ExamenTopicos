import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChatindividualPage } from './chatindividual.page';

describe('ChatindividualPage', () => {
  let component: ChatindividualPage;
  let fixture: ComponentFixture<ChatindividualPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatindividualPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChatindividualPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
