export interface ErrorsObject {
  name?: string[];
  age?: string[];
  email?: string[];
  password?: string[];
  rpassword?: string[];
  gender?: string[];
  'image.name'?: string[];
  'image.size'?: string[];
  image?: string[];
  country?: string[];
  tc?: string[];
}

export interface DataObject {
  name?: string;
  age?: string;
  email?: string;
  password?: string;
  rpassword?: string;
  gender?: string;
  country?: string;
  tc?: boolean;
  image?:
    | {
        name?: string;
        size?: number;
      }
    | string;
  form: string;
}
