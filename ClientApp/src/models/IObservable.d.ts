declare interface IObservable<T> {
  subscriptions: ((g: T & any) => any)[];
  subscribe: (handler: (g: T & any) => any) => IObservable<T>;
  update: () => void;
  log: () => void;
}