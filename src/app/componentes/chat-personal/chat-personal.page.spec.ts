import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChatPersonalPage } from './chat-personal.page';

describe('ChatPersonalPage', () => {
  let component: ChatPersonalPage;
  let fixture: ComponentFixture<ChatPersonalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatPersonalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChatPersonalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
