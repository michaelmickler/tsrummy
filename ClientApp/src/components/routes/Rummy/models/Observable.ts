export default class Observable<T> {
  
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