import { Shape } from "./shape";
import { Ingredient } from "./ingridient";
import { CustomStyle } from "src/app/models/customStyle";
import { Customer } from "src/app/models/customer";
import { Wrapping } from "src/app/models/wrapping";



export class Chocolate {

  ChocoalteId: AAGUID;
  Name: string;
  Description: string;
  Available: boolean;
  Shape: Shape;
  Ingredients: Ingredient[]
  Image: string;
  CustomStyle: CustomStyle;
  CreatedBy: Customer;
  ModifyDate: Date;
  Wrapping: Wrapping;
  Price: Number;

  public calculatePrice(): void {

    this.Price = 5;
  };

  //Shape_ID = c.Shape.ShapeId,
  //CustomStyle_ID = c.CustomStyle.CustomStyleId,
  //Image = c.Image,
  //Creator_Customer_ID = c.CreatedBy.CustomerId,  
  //WrappingID = c.Wrapping.WrappingId

}


//public Guid ChocolateId { get; set; }
//        public string Name { get; set; }
//        public string Description { get; set; }
//        public bool Available { get; set; }
//        public Shape Shape { get; set; }
//        public CustomStyle CustomStyle { get; set; }
//        public string Image { get; set; }
//        public Wrapping Wrapping { get; set; }
//        public List < Ingredient > Ingredients { get; set; }
//        public List < Rating > Ratings { get; set; }
//        public DateTime ? Modified { get; set; }
//        public Customer CreatedBy { get; set; }

//        public int AmountInPackage { get; set; }
//        public double AverageRating
//{
//  get
//  {
//    if (Ratings != null && Ratings.Count > 0)
//      return Ratings.Select(r => r.Value).Sum() / Ratings.Count;

//    else return -1;
//  }
//}
//        public double Price
//{
//  get
//  {
//    double tempPrice = 0;
//    foreach(var item in Ingredients)
//    {
//      tempPrice += item.Price;
//    }
//    return tempPrice + Wrapping.Price + 3;
//  }
//}
