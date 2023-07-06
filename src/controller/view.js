import Dialog from '../service/dialog';
import DynamicTable from '../service/dynamic-table';
import Parser from '../service/parser';
import Rundown from '../service/rundown/rundown';
import DOM from '../util/dom';
import CsvToRundownAdapter from '../adapter/csv-to-rundown.adapter';
import RundownToDynamicTableAdapter from '../adapter/rundown-to-dynamic-table.adapter';
import ViewControllerSettingsForm from '../service/view-controller-settings-form';
import Form from '../lib/form';
import Storage from '../service/storage';

const toggleVisibility = (element, isVisible) => {
  DOM.toggleClass(element, 'd-none', !isVisible);
}

export default class ViewController {
  _nodes = new Map();
  _settingsDialog = new Dialog('dialog-rundown-setting');
  _newEntryDialog = new Dialog('dialog-new-setting-entry');
  _rundown = new Rundown();
  _dynamicTable = new DynamicTable();
  _parserAdapter = new CsvToRundownAdapter();
  _parser = new Parser(this._parserAdapter);
  _rundownToDynamicTableAdapter = new RundownToDynamicTableAdapter();
  _viewControllerForm = new ViewControllerSettingsForm();
  _settingsForm = this._viewControllerForm.getForm();
  _newEntryForm = new Form('new-entry-form', {
    entryId: null
  });
  _storage = new Storage('bank-statement-rundown');

  constructor() {}

  init() {
    this._nodes.set('btnSettings', DOM.find('.js--btn-settings'));
    this._nodes.set('fileInput', DOM.find('#file-input'));
    this._nodes.set('tableWrapper', DOM.find('.js--dynamic-table-wrapper'));
    this._nodes.set('spinner', DOM.find('.js--data-container-spinner'));
    this._nodes.set('configForm', DOM.find('.js--config-settings-form'));
    this._nodes.set('addNewEntryBtn', DOM.find('.js--add-new-entry'));
    this._nodes.set('openStoredCollection', DOM.find('.js--open-stored-data-list'));
    this._nodes.set('showStoredCollectionsText', DOM.find('.js--choose-upload'));

    this._checkConfig();
    this._parser.onParseComplete = this.parseData.bind(this);
    this._addEventListeners();
  }

  parseData(data) {
    this._rundown.runRundown(data, this._viewControllerForm.getEntriesRawValue());
  }

  _addEventListeners() {
    this._settingsForm.onSubmit = this._onSettingsFormSubmit.bind(this);
    this._settingsForm.onChange = this._onSettingsFormChange.bind(this);
    this._newEntryForm.onSubmit = this._onNewEntryFormSubmit.bind(this);
    this._rundown.onRundown = this._renderTable.bind(this);

    this._nodes.get('btnSettings').addEventListener('click', () => {
      this._settingsDialog.show();
    });
    this._nodes.get('fileInput').addEventListener('change', (event) => {
      if (event.target.files.length) {
        toggleVisibility(this._nodes.get('tableWrapper'), false);
        toggleVisibility(this._nodes.get('spinner'), true);
        this._parser.parse(event.target.files[0]);
        this._nodes.get('fileInput').value = null;
      } 
    }, false);
    this._nodes.get('addNewEntryBtn').addEventListener('click', () => {
      this._newEntryDialog.show();
    });
  }

  _renderTable() {
    this._dynamicTable.createTable(this._rundownToDynamicTableAdapter.adapt(this._rundown.getRundown()));
    
    setTimeout(() => {
      toggleVisibility(this._nodes.get('tableWrapper'), true);
      this._nodes.get('tableWrapper').appendChild(this._dynamicTable.render());
      toggleVisibility(this._nodes.get('spinner'), false);
    }, 500)
  }

  _checkConfig() {
    if (!this._parserAdapter.isConfigSet) {
      this._settingsDialog.show();
    }
  }

  _onSettingsFormSubmit(value) {
    this._parserAdapter.setConfig({
      firstTransactionRow: value.firstTransactionRow,
      amountSeparator: value.amountSeparator,
      contractorColumn: value.contractorColumn,
      amountColumn: value.amountColumn,
    });
    this._settingsDialog.close();
    this._viewControllerForm.getEntriesRawValue();
  }

  _onSettingsFormChange() {
    this._viewControllerForm.isSettingFormValid();
  }

  _onNewEntryFormSubmit({ entryId }) {
    this._viewControllerForm.createNewEntry(entryId);
    this._newEntryDialog.close();
    this._newEntryForm.clear();
  }
}