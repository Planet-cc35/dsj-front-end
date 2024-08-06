import AddCardType from "./AddCardType";

export default interface TableCardType extends AddCardType {
  id: number;
  created_at: string;
  updated_at: string;
}
