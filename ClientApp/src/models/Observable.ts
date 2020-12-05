export default class Observable<T> implements IObservable<T> {
  
  subscriptions: ((g: T & any) => any)[] = [];
  
  subscribe = (handler: (g: T & any) => any) => {
    this.subscriptions.push(handler);
    return this;
  };

  update = () => {
    this.subscriptions.forEach((hanlder) => hanlder(this));
  };

  log = () => {
    console.log(this);
  };

}