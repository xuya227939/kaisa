import {observable, action, makeAutoObservable} from 'mobx';
class Demo {
  constructor() {
    makeAutoObservable(this);
  }

  @observable count = 0;

  @action reduce = () => {
    this.count--;
  };

  @action add = () => {
    this.count++;
  };
}
export default new Demo();
