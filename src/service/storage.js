export default class Storage {
  constructor(storageName) {
    this._storageName = storageName;
  }

  set(key, value) {
    let data = this._extractCollection();

    if (data?.hasOwnProperty(key)) {
      if (confirm(key + ' already exists, do you want to update it?')) {
        data[key] = JSON.stringify(value);
      }
    }

    if (!data) {
      data = {};
    }

    data[key] = value;
    this._setData(data);
  }

  get(key) {
    let data = this._extractCollection();

    if (data) {
      data = JSON.parse(data);
    }

    return data[key];
  }

  hasCollection() {
    return !!this._extractCollection();
  }

  _extractCollection() {
    let data = localStorage.getItem(this._storageName);

    if (data?.length) {
      data = JSON.parse(data);
    }

    return data || null;
  }

  _setData(data) {
    localStorage.setItem(this._storageName, JSON.stringify(data));
  }
}