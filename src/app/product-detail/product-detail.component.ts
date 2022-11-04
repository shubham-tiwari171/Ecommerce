import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/models';
import { DataServicesService } from '../services/data-services/data-services.service';
import { UtilityService } from '../services/data-services/utility.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  imageIndex: number = 1;
  product: Product = {} as Product;
  reviewControl = new FormControl('');
  showError!: boolean;
  reviewSavedSuccessfully!: boolean;
  constructor(
    private _dataServicesService: DataServicesService,
    private _route: ActivatedRoute,
    public utilityService: UtilityService
  ) {}

  ngOnInit(): void {
    this.getProductById();
  }
  getProductById() {
    this._route.queryParams.subscribe((params: any) => {
      let id = params.id;
      this._dataServicesService.getProductById(id).subscribe((res: Product) => {
        this.product = res;
      });
    });
  }
  saveReview() {
    let review = this.reviewControl.value;
    if (review === null || review === '') {
      this.showError = true;
      return;
    }
  }
}
