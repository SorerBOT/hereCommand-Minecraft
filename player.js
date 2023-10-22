export default class Player {
  constructor(name, archer, tank, healer, mage, bers) {
    this.name = name;
    this.archer = archer;
    this.tank = tank;
    this.healer = healer;
    this.mage = mage;
    this.bers = bers;
  }

  getName() { return this.name; }
  getClass(className) { return this[className]; }
}
