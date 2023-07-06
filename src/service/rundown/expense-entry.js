export default class ExpenseEntry {
  constructor(id, matches, amount = 0) {
    this._id = id;
    this._matches = matches;
    this._amount = amount;
  }

  get id() {
    return this._id;
  }

  get matches() {
    return this._matches;
  }

  add(amount) {
    this._amount += amount;
  }

  value() {
    return {
      id: this._id,
      amount: this._amount
    }
  }
  
  cleanup() {
    this._id = null;
    this._matches = null;
    this._amount = null;
  }
}
