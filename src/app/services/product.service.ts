import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Product } from '../common/product';
import { ProductCategory } from '../common/product-category';

@Injectable({
	providedIn: 'root'
})
export class ProductService {
	private baseUrl = 'http://localhost:8080/api/products';
	private categoryUrl = 'http://localhost:8080/api/product-category';

	constructor(private httpClient: HttpClient) { }

	getProduct(theProductId: number): Observable<Product> {
		const productUrl = `${this.baseUrl}/search/findById?id=${theProductId}`;

		return this.httpClient.get<GetResponseProduct>(this.categoryUrl).pipe(
			map(response => response._embedded.product)
		);
	}

	getProductList(theCategoryId: number): Observable<Product[]> {

		const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;

		return this.getProducts(searchUrl);
	}

	searchProducts(theKeyword: string): Observable<Product[]> {
		const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;

		return this.getProducts(searchUrl);
	}

	private getProducts(searchUrl: string): Observable<Product[]> {
		return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
			map(response => response._embedded.products)
		);
	}

	getProductCategories(): Observable<ProductCategory[]> {
		return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
			map(response => response._embedded.productCategory)
		);
	}
}

interface GetResponseProduct {
	_embedded: {
		product: Product;
	}
}

interface GetResponseProducts {
	_embedded: {
		products: Product[];
	}
}

interface GetResponseProductCategory {
	_embedded: {
		productCategory: ProductCategory[];
	}
}
