import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from 'app/products/data-access/cart.service';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DividerModule } from 'primeng/divider';
import { Product } from 'app/products/data-access/product.model';
import { CartItem } from 'app/products/data-access/cart-item.model';

@Component({
  selector: 'app-cart-list',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    InputNumberModule,
    DividerModule],
  templateUrl: './cart-list.component.html',
  styleUrl: './cart-list.component.scss'
})
export class CartListComponent {

  private readonly cartService = inject(CartService);

  cart$ = this.cartService.cart$;

  add(product: Product) {
    this.cartService.add(product);
  }

  remove(productId: number) {
    this.cartService.remove(productId);
  }

  increase(item: CartItem) {
    this.cartService.updateQuantity(item.product.id, item.quantity + 1);
  }

  decrease(item: CartItem) {
    if (item.quantity > 1) {
      this.cartService.updateQuantity(item.product.id, item.quantity - 1);
    } else {
      this.remove(item.product.id);
    }
  }
}
