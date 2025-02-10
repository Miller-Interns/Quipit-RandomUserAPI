export type Name = {
  title: string;
  first: string;
  last: string;
};

export type Street = {
  number: number;
  name: string;
};

export type Location = {
  street: Street;
  city: string;
  state: string;
  country: string;
  postcode: number;
};

export type Login = {
  username: string;
  password: string;
};

export type DoB = {
  date: string;
  age: number;
};

export type Picture = {
  large: string;
  medium: string;
  thumbnail: string;
};

// actual user
export type User = {
  name: Name;
  gender: string;
  email: string;
  login: Login;
  dob: DoB;
  nat: string;
  phone: string;
  picture: Picture;
  location: Location;
  username: Login;
  password: Login;
};

export type Pages = {
  [page: number]: User[];
};
