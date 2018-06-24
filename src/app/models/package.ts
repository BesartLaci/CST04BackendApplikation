import { Chocolate } from "src/app/models/chocolate";
import { Wrapping } from "src/app/models/wrapping";
import { Customer } from "src/app/models/customer";


export class Package {

  PackageId: AAGUID;
  Name: string;
  Description: string;
  Wrapping: Wrapping;
  Available: boolean;
  CreatedBy: Customer;
  Image: string;
  Chocolates: Chocolate[];
  //Rating: Rating[];
  //Modified: Date;
  Price: Number;

}

        //public Guid PackageId { get; set; }
        //public string Name { get; set; }
        //public string Description { get; set; }
        //public Wrapping Wrapping { get; set; }
        //public bool Available { get; set; }
        //public Customer Customer { get; set; }
        //public Uri Image { get; set; }
        //public List < Chocolate > Chocolates { get; set; }
        //public List < Rating > Ratings { get; set; }
        //public DateTime ? Modified { get; set; }
