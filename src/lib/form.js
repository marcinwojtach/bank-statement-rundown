export default class Form {
  controls = {};
  value = {};

  constructor(id, config) {
    this._$form = document.getElementById(id);

    if (this._$form.nodeName !== 'FORM') {
      throw new Error('Form instance must be attached to a form element!');
    }

    this._setup(config);

    this._$form.addEventListener('submit', this._onNativeSubmit);
    this._$form.addEventListener('keyup', this._onChange);
  }

  onChange = null;

  onSubmit = null

  addControl(controlName, $node) {
    this.controls[controlName] = $node;
  }

  removeControl(controlName) {
    delete this.controls[controlName];
  }

  getControl(controlName) {
    return this.controls[controlName]; 
  }

  clear() {
    this.forEach((key, control) => {
      control.node.value = null;
      this._updateValue(key, null);
    })
  }

  forEach(callbackFn) {
    Object.keys(this.controls).forEach(key => {
      callbackFn(key, this.controls[key]);
    })
  }

  _setup(config) {
    Object.keys(config).forEach(key => {
      const $control = this._$form.elements[key]

      if (!$control) {
        console.warn('Could not find control with id ' + key);
        return;
      }

      this.controls[key] = {
        node: $control,
      };

      const controlValue = config[key] || $control.value;

      if (controlValue) {
        this._updateValue(key, controlValue);
        $control.value = controlValue;
      }
    });
  }

  _onNativeSubmit = (event) => {
    event.preventDefault();
    this._extractControlsValues();
    if (this.onSubmit) {
      this.onSubmit(this.value);
    }
  }

  _onChange = (event) => {
    if (event.target.id && this.controls.hasOwnProperty(event.target.id)) {
      this._updateValue(event.target.id, event.target.value);
      if (this.onChange) {
        this.onChange(event.target.id, event.target.value);
      }
    }
  }

  _updateValue(key, value) {
    this.controls[key].value = value;
    this.value[key] = value;
  }

  _extractControlsValues() {
    this.forEach((key, control) => this._updateValue(key, control.value));
  }
}