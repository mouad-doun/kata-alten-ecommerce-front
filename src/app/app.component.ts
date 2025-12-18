import {
  Component,
  inject,
} from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { SplitterModule } from 'primeng/splitter';
import { ToolbarModule } from 'primeng/toolbar';
import { PanelMenuComponent } from "./shared/ui/panel-menu/panel-menu.component";
import { CartService } from "./products/data-access/cart.service";
import { BadgeModule } from 'primeng/badge';
import { CommonModule } from "@angular/common";
import { LoaderService } from "./shared/helpers/loader.service";
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  standalone: true,
  imports: [RouterModule, SplitterModule, ToolbarModule, PanelMenuComponent, BadgeModule, CommonModule, ProgressSpinnerModule],
})
export class AppComponent {
  private readonly router = inject(Router);
  readonly cartService = inject(CartService);
  loaderService = inject(LoaderService);

  title = "ALTEN SHOP";

  goToCart() {
    this.router.navigate(['products/cart']);
  }
}
