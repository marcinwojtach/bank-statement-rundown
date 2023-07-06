import DOM from '../util/dom';

class DataItem {
  constructor(item, value) {
    this._$item = DOM.createElement(item, null, {}, value);
  }

  render() {
    return this._$item;
  }
}

class Body {
  constructor(values) {
    this._$fragment = DOM.documentFragment();
    this._$tBody = DOM.createElement('tbody');
    if (values.length) {
      this._renderRows(values).forEach($tr => {
        this._$tBody.appendChild($tr.render());
      });
    }

    this._$fragment.appendChild(this._$tBody);
  }

  render() {
    return this._$fragment;
  }

  _renderRows(values) {
    return values.map(rowValues => new Row(rowValues));
  }
}


class Header {
  constructor(values) {
    this._$fragment = DOM.documentFragment();
    this._$tHead = DOM.createElement('thead');
    this._$tr = DOM.createElement('tr');
    if (values.length) {
      this._renderThs(values).forEach($th => {
        this._$tr.appendChild($th.render());
      });
    }

    this._$fragment.appendChild(this._$tr);
    this._$tHead.appendChild(this._$tr);
  }

  render() {
    return this._$tHead;
  }

  _renderThs(values) {
    return values.map(value => new DataItem('th', value));
  }
}

class Row {
  constructor(values) {
    this._$fragment = DOM.documentFragment();
    this._$tr = DOM.createElement('tr');
    if (values.length) {
      this._renderTds(values).forEach($td => {
        this._$tr.appendChild($td.render());
      });
    }

    this._$fragment.appendChild(this._$tr);
  }

  render() {
    return this._$fragment;
  }

  _renderTds(values) {
    return values.map(value => new DataItem('td', value));
  }
}

/**
 * data {
 *  headers: string[];
 *  body: (string[])[];
 * }
 */
export default class DynamicTable {
  constructor() {
    this._$table = DOM.createElement('table', 'table');
  }

  createTable(data) {
    this._data = data;
    this._header = new Header(this._data.headers);
    this._body = new Body(this._data.body);
    this._renderTable();
    return this;
  }

  render() {
    return this._$table;
  }

  // _createDataProxy() {
  //   return {
  //     set: (target, property, value) => {
  //       target[property] = value;
  //       this._renderTable();
  //       return true;
  //     }
  //   }
  // }

  _renderTable() {
    this._$table.innerHTML = '';
    this._$table.appendChild(this._header.render());
    this._$table.appendChild(this._body.render());
  }
}
