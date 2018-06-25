import { Customer } from "src/app/models/customer";
import { Orderstatus } from "src/app/models/orderstatus";

export class Order {
  OrderId: AAGUID;
  DateOfOrder: string;
  DateOfDelivery: string;
  Status: Orderstatus;
  Customer: Customer;
  Note: string;
}
