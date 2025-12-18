import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, Routes } from "@angular/router";
import { ProductListComponent } from "./features/products/product-list/product-list.component";
import { CartListComponent } from "./features/products/cart-list/cart-list.component";
import { ContactComponent } from "./features/contact/contact.component";
import { AuthGuard } from "app/shared/helpers/auth.guard";

export const PRODUCTS_ROUTES: Routes = [
	{
		path: "list",
		component: ProductListComponent,
		canActivate: [AuthGuard]
	},
	{
		path: "cart",
		component: CartListComponent,
		canActivate: [AuthGuard]
	},
	{ path: "**", redirectTo: "list" },
];
