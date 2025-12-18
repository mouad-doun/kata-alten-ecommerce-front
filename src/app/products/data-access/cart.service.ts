import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { CartItem } from './cart-item.model';
import { Product } from './product.model';

@Injectable({ providedIn: 'root' })
export class CartService {

  private readonly KEY = 'CART';

  private readonly cartSubject = new BehaviorSubject<CartItem[]>(this.load());
  readonly cart$ = this.cartSubject.asObservable();

  private load(): CartItem[] {
    try {
      return JSON.parse(localStorage.getItem(this.KEY) || '[]');
    } catch {
      return [];
    }
  }

  private save(cart: CartItem[]): void {
    localStorage.setItem(this.KEY, JSON.stringify(cart));
    this.cartSubject.next(cart);
  }

  add(product: Product): void {
    const cart = [...this.cartSubject.value];
    const existing = cart.find(i => i.product.id === product.id);

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({
        product,
        quantity: 1
      });
    }

    this.save(cart);
  }

  remove(productId: number): void {
    const cart = this.cartSubject.value.filter(
      item => item.product.id !== productId
    );
    this.save(cart);
  }

  updateQuantity(productId: number, quantity: number): void {
    const cart = [...this.cartSubject.value];

    const item = cart.find(i => i.product.id === productId);
    if (!item) return;

    if (quantity <= 0) {
      this.remove(productId);
    } else {
      item.quantity = quantity;
      this.save(cart);
    }
  } 
  
  totalQuantity$: Observable<number> = this.cart$.pipe(
    map(cart => cart.reduce((total, item) => total + item.quantity, 0))
  );


  clear(): void {
    this.save([]);
  }
}