import {
  Component,
  ElementRef,
  OnInit,
  Type,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { NavigationItem } from '../models/models';
import { RegisterComponent } from '../register/register.component';
import { DataServicesService } from '../services/data-services/data-services.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @ViewChild('modalTitle') modalTitle!: ElementRef;
  @ViewChild('container', { read: ViewContainerRef, static: true })
  container!: ViewContainerRef;
  cartItems: number = 0;
  navigationList: NavigationItem[] = [];

  constructor(private _dataServicesService: DataServicesService) {}
  ngOnInit(): void {
    this.navigationItem();
  }
  openModal(name: string) {
    this.container.clear();

    let componentType!: Type<any>;
    if (name === 'login') {
      componentType = LoginComponent;
      this.modalTitle.nativeElement.textContent = 'Login Information';
      this.modalTitle.nativeElement.style.color = 'white';
    }
    if (name === 'register') {
      componentType = RegisterComponent;
      this.modalTitle.nativeElement.textContent = 'Register Information';
      this.modalTitle.nativeElement.style.color = 'white';
    }
    this.container.createComponent(componentType);
  }
  navigationItem() {
    this._dataServicesService
      .getCategoryLists()
      .subscribe((response: NavigationItem[]) => {
        this.navigationList = response;
      });
  }
}
