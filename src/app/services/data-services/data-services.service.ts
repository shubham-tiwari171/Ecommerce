import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, ObservableLike } from 'rxjs';
import {
  Category,
  Login,
  NavigationItem,
  Offer,
  Product,
  User,
} from 'src/app/models/models';

@Injectable({
  providedIn: 'root',
})
export class DataServicesService {
  baseUrl = 'https://localhost:7083/api/Shopping';

  constructor(private _http: HttpClient) {}

  getCategoryLists(): Observable<NavigationItem[]> {
    let url = this.baseUrl + '/GetCategoriesList';
    return this._http.get<any[]>(url).pipe(
      map((response) => {
        let categoriesList: NavigationItem[] = [];
        response.forEach((element) => {
          let mappedCategory: NavigationItem = {
            category: '',
            subcategories: [],
          };
          mappedCategory.category = element.category;
          mappedCategory.subcategories = element.subcategories;
          categoriesList.push(mappedCategory);
        });
        return categoriesList;
      })
    );
  }

  getProductByCategorySubCategory(
    category: string,
    subcategory: string,
    count: number
  ): Observable<Product[]> {
    let url = this.baseUrl + '/GetProductsByCategory';
    let queryParams = {
      category: category,
      subcategory: subcategory,
      count: count,
    };
    return this._http.get<any[]>(url, { params: queryParams }).pipe(
      map((response) => {
        let productCategorySubCategoryList: Product[] = [];
        response.forEach((element) => {
          let mappedCategory: Category = {
            id: 0,
            category: '',
            subCategory: '',
          };
          let mappedOffer: Offer = {
            id: 0,
            title: '',
            discount: 0,
          };
          let mappedProduct: Product = {
            id: 0,
            title: '',
            description: '',
            productCategory: mappedCategory,
            offer: mappedOffer,
            price: 0,
            quantity: 0,
            imageName: '',
          };
          mappedProduct.id = element.productId;
          mappedProduct.title = element.title;
          mappedProduct.description = element.description;
          mappedProduct.productCategory.id = element.category.categoryId;
          mappedProduct.productCategory.category = element.category.category;
          mappedProduct.productCategory.subCategory =
            element.category.subCategory;
          mappedProduct.offer.id = element.offer.offerId;
          mappedProduct.offer.title = element.offer.title;
          mappedProduct.offer.discount = element.offer.discount;
          mappedProduct.price = element.price;
          mappedProduct.quantity = element.quantity;
          mappedProduct.imageName = element.imageName;
          productCategorySubCategoryList.push(mappedProduct);
        });
        return productCategorySubCategoryList;
      })
    );
  }

  getProductById(id: number): Observable<Product> {
    let url = this.baseUrl + '/GetProductById/' + id;
    return this._http.get<any>(url).pipe(
      map((response) => {
        let mappedCategory: Category = {
          id: 0,
          category: '',
          subCategory: '',
        };
        let mappedOffer: Offer = {
          id: 0,
          title: '',
          discount: 0,
        };
        let mappedProductById: Product = {
          id: 0,
          title: '',
          description: '',
          productCategory: mappedCategory,
          offer: mappedOffer,
          price: 0,
          quantity: 0,
          imageName: '',
        };
        mappedProductById.id = response.productId;
        mappedProductById.title = response.title;
        mappedProductById.description = response.description;
        mappedProductById.productCategory.id = response.category.categoryId;
        mappedProductById.productCategory.category = response.category.category;
        mappedProductById.productCategory.subCategory =
          response.category.subCategory;
        mappedProductById.offer.id = response.offer.offerId;
        mappedProductById.offer.title = response.offer.title;
        mappedProductById.offer.discount = response.offer.discount;
        mappedProductById.price = response.price;
        mappedProductById.quantity = response.quantity;
        mappedProductById.imageName = response.imageName;
        return mappedProductById;
      })
    );
  }

  createUser(resgister: User) {
    let url = this.baseUrl + '/CreateUser';
    return this._http.post(url, resgister, { responseType: 'text' }); //{ responseType: 'text' } it convert the string in json format
  }
  loginUser(login: Login) {
    let url = this.baseUrl + '/CreateUser';
    return this._http.post(url, login, { responseType: 'text' }); //{ responseType: 'text' } it convert the string in json format
  }
}
