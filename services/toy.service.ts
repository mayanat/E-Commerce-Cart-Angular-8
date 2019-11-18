import { Injectable } from '@angular/core';
import { ToyC } from '../enteties/ToyC';
import { AngularFirestore } from '@angular/fire/firestore';
import { Item } from '../enteties/Item';




@Injectable({
  providedIn: 'root'
})
export class ToyService {
  selectedToy: ToyC;
  toys: ToyC[] = [];
  toysJson: any = {};
  allToysForSearch: ToyC[] = [];
  toysC: any = {};
  cartlength: number = 0;
  items: Item[] = [];



  addSelectedToyForDetail(toy: ToyC): void {
    this.selectedToy = toy;
  }
  item: Item= new Item();
  

  
  addToy(toy: ToyC) {
    this.toys.push(toy);
    
    if (this.items.length > 0) 
    {
      for (let index = 0; index < this.items.length; index++) {
        if ( toy == this.items[index].toy) 
        {
          this.items[index].quantity += 1;
          index=this.items.length;
          return console.log(this.items); 
        }    
      }
      this.items.push({toy:toy, quantity:1});
      this.cartlength+=1;
      return console.log(this.items);
    }
    else 
    {
      this.items.push({toy:toy, quantity:1});
      this.cartlength+=1;
      console.log(this.items);
      return
    }
    

  }

  findAll(): ToyC[] {
    return this.toys;
  }
  findAllForSeach(): ToyC[] {
    return this.allToysForSearch;
  }


  getalltoysByID(id: string) {
    return this.toysC.filter(x => x.categoryNum === id);

  };



  sumPrice: number = 0;
  numOfItems:number=0;
  sumofItems():number
  {this.numOfItems=0;
    this.items.forEach(element => {
      this.numOfItems += element.quantity
    });
  return this.numOfItems;
  }
  sumPriceCart(): number {
    this.sumPrice = 0;
    this.items.forEach(element => {

      if (element.toy.tSalePrice != -1) {

        this.sumPrice += (element.toy.tSalePrice * element.quantity);

      } else {
        this.sumPrice += (element.toy.tPrice * element.quantity);

      }


    });
    return this.sumPrice;
  }
  getToys() {
    return this.firestore.collection('toys').snapshotChanges();
  }


  constructor( private firestore: AngularFirestore) {

    this.getToys().subscribe(data => {
      this.toysC = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as ToyC;
      })
    });
   




  }
}
