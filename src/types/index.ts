export interface DataType {
  id: number;
  first: string;
  last: string;
  gender: GenderTypes;
  email: string;
  picture: string;
  country: string;
  description: string;
  dob: string;
}

export interface DataTypeWithAge extends DataType {
  age: number;
}

export enum GenderTypes {
  male = 'male',
  female = 'female',
  transgender ='transgender',
  rather_not_say = 'rather_not_say',
  other ='other',
}
