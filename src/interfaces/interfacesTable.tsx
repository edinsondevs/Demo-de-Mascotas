export interface  InterfaceColumnData {
  dataKey: keyof InterfaceData;
  label: string;
  align?: boolean;
  width: number;
}
export interface  InterfaceData {
  name: string;
  age: number;
  sex: string;
  breed: string;
  adopted: boolean;
  size: string;
  photo: string;
  typebreed: string;
}
export interface  InterfaceColumnDataUsers {
  dataKey: string;
  label: string;
  align?: boolean;
  width: number;
}

export interface InterfaceDataUsers {
    name: string;
    age: number;
    sex: string;
    breed: string;
    adopted: boolean;
    size: string;
    photo: string;
    typebreed: string;
}