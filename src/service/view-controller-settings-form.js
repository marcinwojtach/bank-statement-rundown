import Form from '../lib/form';
import DOM from '../util/dom';

export default class ViewControllerSettingsForm {
  _form = new Form('settings-form', {
    firstTransactionRow: 22,
    amountSeparator: ',',
    contractorColumn: 3,
    amountColumn: 9,
    'entry.food.label': null,
    'entry.food.value': null,
  });
  _$settingsFormEntries = DOM.find('.js--settings-form-entries');

  getForm() {
    return this._form;
  }

  createNewEntry(id) {
    const labelEntry = this._createId(id, 'label')
    const valueEntry = this._createId(id, 'value');
    const clone = this._createCloneNode(labelEntry, valueEntry);
    clone.node.setAttribute('data-entry', this._createId(id));
    clone.label.value = id;
    this._form.addControl(labelEntry, clone.label);
    this._form.addControl(valueEntry, clone.value);
    this._$settingsFormEntries.appendChild(clone.node);
    DOM.toggleClass(clone.node, 'd-none', false);
  }

  removeEntry(id) {
    try {
      this._$settingsFormEntries.querySelector(`[${this._createId(id)}]`).remove();
    } catch (e) {
      console.warn('Failed to remove node with id: ' + id);
    }

    try {
      this._form.removeControl(this._createId(id, 'label'));
      this._form.removeControl(this._createId(id, 'label'));
    } catch (e) {
      console.warn('Failed to remove control with id: ' + id);
    }
  }

  getEntriesRawValue() {
    const entriesMap = {};
    this._form.forEach((key, control) => {
      if (!key.includes('entry')) return;

      const parts = key.split('.');
      const controlType = parts[2];
      const entryName = parts[1];

      switch (controlType) {
        case 'label':
          if (!entriesMap.hasOwnProperty(entryName)) {
            entriesMap[entryName] = '';
          } 
          break;
        case 'value':
          if (entriesMap.hasOwnProperty(entryName)) {
            entriesMap[entryName] = control.value;
          } 
          break;
      }
    });

    return Object.entries(entriesMap).reduce(
      (array, [key, value]) => {
        array.push([key, value]);
        return array;
      }, []);
  }

  isSettingFormValid() {
    const value = this._form.value;
    return !!value.firstTransactionRow && 
      !!value.amountSeparator &&
      !!value.contractorColumn &&
      !!value.amountColumn;
  }

  _createCloneNode(labelId, valueId) {
    const clone = this._cloneEntry();
    clone.label.setAttribute('id', labelId);
    clone.value.setAttribute('id', valueId);
    return clone;
  }

  _cloneEntry() {
    let $clone;

    try {
      $clone = DOM.find('.js--entry-clone').cloneNode(true)
    } catch (e) {
      throw new Error('Failed to clone entry node');
    }

    const inputs = Array.from($clone.querySelectorAll('input'));
    $clone.classList.remove('js--entry-clone');

    return {
      node: $clone,
      label: inputs[0],
      value: inputs[1],
    }
  }

  _createId(id, suffix = '') {
    return `entry.${id}` + (suffix ? `.${suffix}` : '');
  }
}