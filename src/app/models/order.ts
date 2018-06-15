import { Customer } from "src/app/models/customer";
import { Orderstatus } from "src/app/models/orderstatus";

export class Order {
  OrderId: AAGUID;
  DateOfOrder: Date;
  DateOfDelivery: Date;
  Status: Orderstatus;
  Customer: Customer;
  Note: string
}
