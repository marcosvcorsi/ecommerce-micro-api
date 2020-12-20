type Address = {
  name?: string;
  zipCode: string;
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
  country: string;
  additionalDetails?: string;
};

export class CreateCustomerDto {
  name: string;
  email: string;
  password: string;
  addresses: Address[];
}
