interface IObservable<T> {
  subscriptions: ((g: T & any) => any)[];
  subscribe: (handler: (g: T & any) => any) => IObservable<T>;
  update: () => void;
  log: () => void;
}

export default class Observable<T> implements IObservable<T> {
  
  public subscriptions: ((g: T & any) => any)[] = [];
  
  public subscribe = (handler: (g: T & any) => any) => {
    this.subscriptions.push(handler);
    return this;
  };

  public update = () => {
    this.subscriptions.forEach((hanlder) => hanlder(this));
  };

  public log = () => {
    console.log(this);
  };

}