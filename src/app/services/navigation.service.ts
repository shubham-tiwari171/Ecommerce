import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavigationItem } from '../models/models';
import { DataServicesService } from './data-services/data-services.service';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  constructor(private _dataServicesService: DataServicesService) {}
  getNavigationItems() {
    let navigationList: NavigationItem[] = [];
    this._dataServicesService.getCategoryLists().subscribe((response) => {
      response.forEach((element) => {
        let navigationList: NavigationItem = {
          category: '',
          subcategories: [],
        };
      });
    });
  }
}
