import ExpenseEntry from "./expense-entry";

/**
 * Entry {
 *  name: string;
 *  amount: number;
 * }
 * 
 * data = Entry[]
 * 
 * entriesMatches = [string, string][]
 */
export default class Rundown {
  
  onRundown = null
  
  runRundown(data, entriesMatches) {
    this._data = data;
    this._entriesMatches = entriesMatches;
    this._expensesMap = {};
    this._setupExpensesMap();
    this._calculateExpenses();

    if (this.onRundown) {
      this.onRundown();
    }
  }

  getRundown() {
    const rundown = []
    for (const key in this._expensesMap) {
      rundown.push(this._expensesMap[key].value());
    }
    return rundown;
  }

  _setupExpensesMap() {
    for (const [key, matches] of this._entriesMatches) {
      this._expensesMap[key] = new ExpenseEntry(key, matches);
    }
  }

  _calculateExpenses() {
    const dataLength = this._data.length

    for (let i = 0; i < dataLength; i++) {
      const { name, amount } = this._data[i];
      for (const key in this._expensesMap) {
        const entry = this._expensesMap[key];
        for (const match of entry.matches.split(',')) {
          if (name.toLowerCase().trim().indexOf(match.toLowerCase().trim()) > -1 && amount < 0) {
            entry.add(amount);
            break;
          }
        }
      }
    }
  }
}