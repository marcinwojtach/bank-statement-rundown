export default class Dialog {
  constructor(id) {
    this._$dialog = document.getElementById(id);
    if (!this._$dialog || this._$dialog.nodeName !== 'DIALOG') {
      throw new Error('Invalid id passed to Dialog instance');
    }

    this._$dialog.querySelector('[data-close]').addEventListener('click', this.close.bind(this));
  }

  show() {
    this._$dialog.showModal();
  }

  close() {
    this._$dialog.close();
  }
}
