import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../models/models';
import { UtilityService } from '../services/data-services/utility.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  @Input() view: 'list' | 'grid' | 'currCartItem' | 'prevCartItem' = 'grid';

  // @Input() product = 3;
  @Input() product: Product = {
    id: 0,
    title: '',
    description: '',
    price: 0,
    quantity: 0,
    productCategory: {
      id: 0,
      category: '',
      subCategory: '',
    },
    offer: {
      id: 0,
      title: '',
      discount: 0,
    },
    imageName: '',
  };
  constructor(public utilityService: UtilityService) {}

  ngOnInit(): void {}
}
