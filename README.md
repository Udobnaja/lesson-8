tsc index ts


ЧТО Я ХОЧУ 

INTERFACE ACTION
interface Action<T>{
  type: string;
  payload: T;
  error?: boolean;
  meta?: any;
}