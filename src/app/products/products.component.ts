import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/models';
import { DataServicesService } from '../services/data-services/data-services.service';
import { UtilityService } from '../services/data-services/utility.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  view: 'grid' | 'list' = 'list';
  sortby: 'default' | 'htl' | 'lth' = 'default';
  products: Product[] = [];
  constructor(
    private _dataServicesService: DataServicesService,
    private _route: ActivatedRoute,
    public utilityService: UtilityService
  ) {}

  ngOnInit(): void {
    this.getProductsBySubCategory();
  }

  getProductsBySubCategory(): void {
    let subCategoryNavigation = {
      category: '',
      subCategory: '',
    };
    this._route.queryParams.subscribe((res) => {
      subCategoryNavigation.category = res['category'];
      subCategoryNavigation.subCategory = res['subcategory'];
    });
    if (subCategoryNavigation.category && subCategoryNavigation.subCategory) {
      this._dataServicesService
        .getProductByCategorySubCategory(
          subCategoryNavigation.category,
          subCategoryNavigation.subCategory,
          10
        )
        .subscribe((response: Product[]) => {
          this.products = response;
        });
    }
  }
  sortByPrice(sortKey: string) {
    this.products.sort((a, b) => {
      if (sortKey === 'default') {
        return a.id > b.id ? 1 : -1;
      }
      return (
        (sortKey === 'htl' ? 1 : -1) *
        (this.utilityService.applyDiscount(a.price, a.offer.discount) >
        this.utilityService.applyDiscount(b.price, b.offer.discount)
          ? -1
          : 1)
      );
    });
  }
}
