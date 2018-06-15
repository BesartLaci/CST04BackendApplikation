import { Shape } from "./shape";
import { Ingredient } from "./ingridient";



export class Chocolate {

  ChocoalteId: AAGUID;
  Name: string;
  Description: string;
  Available: boolean;
  Shape: Shape;
  Ingredients: Ingredient[]
  //CustumStyle: CustumStyle
  //Image: string;
  //Wrapping: Wrapping;  
  //Ratings: Rating[];
  //Modified: Date;

}


    //public Guid ChocolateId{ get; set; }
    //    public string Name { get; set; }
    //    public string Description { get; set; }
    //    public bool Available { get; set; }
    //    public Shape Shape { get; set; }
    //    public CustomStyle CustomStyle { get; set; }
    //    public Uri Image { get; set; }
    //    public Wrapping Wrapping { get; set; }
    //    public List < Ingredient > Ingredients { get; set; }
    //    public List < Rating > Ratings { get; set; }
    //    public DateTime ? Modified { get; set; }
