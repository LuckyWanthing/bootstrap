/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.0.1): util/backdrop.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */
import SelectorEngine from '../dom/selector-engine'
import { sanitizeHtml } from '../util/sanitizer'
import { typeCheckConfig } from '../util'

const NAME = 'formField'
const CLASS_ERROR = 'invalid-feedback'
const CLASS_INFO = 'info-feedback'
const CLASS_SUCCESS = 'valid-feedback'
const Default = {
  name: null,
  parentForm: null,
  template: '<div class="field-feedback"></div>'
}

const DefaultType = {
  name: 'string',
  template: 'string',
  parentForm: 'element'
}

class FormField {
  constructor(config) {
    this._config = this._getConfig(config)
    if (!this.getField()) {
      throw new TypeError(`field with id:${this._config.name} not found`)
    }

    this._errorMessages = new Set()
    this._helpMessages = new Set()
    this._successMessages = new Set()
    this._appended = null
  }

  getField() {
    return SelectorEngine.findOne(`#${this._config.name}`, this._config.parentForm)
  }

  clearAppended() {
    if (!this._appended) {
      return
    }

    if (this._appended.parentNode) {
      this._appended.parentNode.removeChild(this._appended)
      this._appended = null
    }

    const field = this.getField()
    if (field) {
      field.removeAttribute('aria-descriebedby')
    }
  }

  dispose() {
    Object.getOwnPropertyNames(this).forEach(propertyName => {
      this[propertyName] = null
    })
  }

  addError(error) {
    this._errorMessages.add(error)
  }

  addHelp(error) {
    this._helpMessages.add(error)
  }

  addSuccess(error) {
    this._successMessages.add(error)
  }

  getErrorMessages() {
    return [...this._errorMessages]
  }

  getHelpMessages() {
    return [...this._helpMessages]
  }

  getSuccessMessages() {
    return [...this._successMessages]
  }

  getFirstErrorMsg() {
    return this.getErrorMessages()[0] || null
  }

  getFirstHelpMsg() {
    return this.getHelpMessages()[0] || null
  }

  getFirstSuccessMsg() {
    return this.getSuccessMessages()[0] || null
  }

  appendFirstErrorMsg() {
    return this._appended(this.getFirstErrorMsg(), CLASS_ERROR)
  }

  appendFirstHelpMsg() {
    return this._appended(this.getFirstHelpMsg(), CLASS_INFO)
  }

  appendFirstSuccessMsg() {
    return this._appended(this.getFirstSuccessMsg(), CLASS_SUCCESS)
  }

  _getConfig(config) {
    config = {
      ...Default,
      ...(typeof config === 'object' ? config : {})
    }

    config.rootElement = config.rootElement || document.body
    typeCheckConfig(NAME, config, DefaultType)
    return config
  }

  _append(text, classAttr = '') {
    this.clearAppended()
    const field = this.getField()
    if (!field) {
      return
    }

    const feedbackElement = this._makeFeedbackElement(text, classAttr)

    this._appended = feedbackElement

    field.parentNode.insertBefore(feedbackElement, field.nextSibling)

    field.setAttribute('aria-descriebedby', feedbackElement.id)
  }

  _makeFeedbackElement(text, classAttr) {
    const element = document.createElement('div')
    element.innerHTML = this._config.template
    const feedback = element.children[0]
    feedback.classList.add(classAttr)
    feedback.id = this._getId()
    feedback.innerHTML = sanitizeHtml(text)

    return feedback
  }

  _getId() {
    return `${this._config.name}-formTip`
  }
}

export default FormField
