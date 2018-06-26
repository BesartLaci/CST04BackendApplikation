import { Chocolate } from "src/app/models/chocolate";

export class OrderContent {
  OrderContentId: AAGUID;
  Chocolate: Chocolate;
  Amount: number;
}
