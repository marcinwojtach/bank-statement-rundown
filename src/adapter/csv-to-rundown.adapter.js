export default class CsvParserAdapter {
  _config = {};

  isConfigSet = false;

  parse(file, { onComplete, onStep, onLastStep }) {
    if (!this.isConfigSet) {
      throw new Error('Parser config not set, can not parse data!');
    }

    Papa.parse(file, {
      header: false,
      beforeFirstChunk: () => {
        this._data = [];
        this._index = 0;
      },
      complete: () => {
        onComplete(this._data);
      },
      step: this._onStep.bind(this, { onStep, onLastStep })
    });
  }

  setConfig(config) {
    this._config.contractorColumn = config.contractorColumn;
    this._config.amountColumn = config.amountColumn;
    this._config.firstTransactionRow = config.firstTransactionRow;
    this._config.amountSeparator = config.amountSeparator;

    this.isConfigSet = true;
  }

  _onStep({ onStep, onLastStep }, result, parser) {
    if (this._index >= this._config.firstTransactionRow - 1) {
      if (result.data.length > this._config.amountColumn) {
        onStep?.(this._index);
        this._data.push({
          name: result.data[this._config.contractorColumn - 1].trim(),
          amount: +result.data[this._config.amountColumn - 1].replace(this._config.amountSeparator, '.')
        });
      } else {
        onLastStep?.(parser.pause, parser.resume);
      }
    }
    this._index++;
  }
}