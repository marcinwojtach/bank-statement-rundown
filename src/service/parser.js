export default class Parser {
  constructor(fileParserAdapter) {
    this._fileParserAdapter = fileParserAdapter;
  }

  parse(file) {
    this._fileParserAdapter.parse(file, {
      onComplete: this.onParseComplete,
      onStep: this.onParseStep,
      onLastStep: this.onLastStep
    });
  }

  onParseComplete(data) {
    // method not implemented
  }

  onParseStep(index) {
    // method not implemented
  }
  
  onLastStep() {
    // method not implemented
  }
}