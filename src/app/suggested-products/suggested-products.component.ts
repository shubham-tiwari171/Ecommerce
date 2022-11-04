import { Component, Input, OnInit } from '@angular/core';
import { Category, Product } from '../models/models';
import { DataServicesService } from '../services/data-services/data-services.service';

@Component({
  selector: 'app-suggested-products',
  templateUrl: './suggested-products.component.html',
  styleUrls: ['./suggested-products.component.css'],
})
export class SuggestedProductsComponent implements OnInit {
  @Input() category: Category = {
    id: 0,
    category: '',
    subCategory: '',
  };
  @Input() count: number = 3;
  @Input() products: Product[] = [];
  constructor(private _dataServicesService: DataServicesService) {}

  ngOnInit(): void {
    this.getProducts();
  }
  getProducts() {
    this._dataServicesService
      .getProductByCategorySubCategory(
        this.category.category,
        this.category.subCategory,
        this.count
      )
      .subscribe((res: Product[]) => {
        res.forEach((element) => {
          this.products.push(element);
        });
      });
  }
}
