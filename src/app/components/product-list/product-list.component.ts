import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  searchMode: boolean = false;

  // new pagination properties
  thePageNumber: number = 1;
  thePageSize: number = 10;
  theTotalElements: number = 0;

  constructor(private productService: ProductService,
              private route: ActivatedRoute){}

  ngOnInit(): void{
    this.route.paramMap.subscribe(() =>{
      this.listProducts();
    })
  }
  
  listProducts() {
	this.searchMode = this.route.snapshot.paramMap.has("keyword");

	if(this.searchMode) {
    	this.handleSearchProducts();
	} else {
		this.handleListProducts();
	}
  }

  handleSearchProducts() {
    const theKeyword = this.route.snapshot.paramMap.get("keyword")!;

	this.productService.searchProducts(theKeyword).subscribe(
		data => {
			this.products = data;
		}
	);
  }

  handleListProducts() {
	const hasCategoryId: boolean = this.route.snapshot.paramMap.has("id");

	if (hasCategoryId){
		this.currentCategoryId =+ this.route.snapshot.paramMap.get("id")!;
	} else{
		this.currentCategoryId = 1;
	}

  // check if we have a different category than previous
  // Note: Angular will reuse a component if it is currently being viewed
  // if we have a different category id than previous
  // then set thePageNumber back to 1
  if(this.previousCategoryId != this.currentCategoryId) {
    this.thePageNumber = 1;
  }
    
  
    this.productService.getProductList(this.currentCategoryId).subscribe(
      data => {
        this.products = data;
      }
    )
  }

}
