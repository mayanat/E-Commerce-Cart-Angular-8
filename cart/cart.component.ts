import { Component, OnInit } from '@angular/core';
import { ToyService } from '../services/toy.service';
import { Item } from '../enteties/Item';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  sumOfCart: number = 0;
  ii:number = 0;
  items:Item[]=[];
  itemPrice:number;
 
  
  itemprice(item:Item)
  {
    if (item.toy.tOnSale) {
      (this.itemPrice = (item.toy.tSalePrice * item.quantity))
      this.sumOfCart=this.toyService.sumPriceCart();
      this.ii=this.toyService.sumofItems();

     } else {
       this.itemPrice = (item.toy.tPrice * item.quantity);
       this.sumOfCart=this.toyService.sumPriceCart();
       this.ii=this.toyService.sumofItems();

     }
     
     return this.itemPrice; 
  }
  
  
  onItemDeleted( item:Item, index){ 
    this.items.splice(index, 1);
    this.toyService.cartlength -= 1; 
     if (item.toy.tOnSale) {
     (this.sumOfCart -= (item.toy.tSalePrice * item.quantity))
    } else {
      this.sumOfCart -= (item.toy.tPrice * item.quantity)
    } 
}



  constructor(private toyService: ToyService) {
   }

  ngOnInit() {
    this.sumOfCart = this.toyService.sumPriceCart();
    this.ii=this.toyService.sumofItems();
    this.items=this.toyService.items;
    
   
  }

}
