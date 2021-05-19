/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.0.1): util/backdrop.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */
import BaseComponent from '../base-component'
import EventHandler from '../dom/event-handler'
import { getElementFromSelector } from '../util'
import Data from '../dom/data'

const NAME = 'formValidation'
const DATA_KEY = 'bs.formValidation'
const EVENT_KEY = `.${DATA_KEY}`
const DATA_API_KEY = '.data-api'

const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="form"]'

class FormValidation extends BaseComponent {
  constructor(element, config) {
    super(element)
    if (this._element.tagName !=='FORM') {
      throw new TypeError(`Νeed to be initialized in form elements. "${}"`)
    }

    this._formFields = {}
  }

  static get NAME() {
    return NAME
  }

  set(errors) {
    this._errors = errors
    return this
  }

  get() {
    return this._errors
  }

  appendErrors() {
    this.clear()
    $.each(this.get(), function (field, txt) {
      let $input = this._$form.find('[name="' + field + '"]')
      let $parent = $input.parents('.' + classes.group)
      $parent.addClass(classes.groupError).append(this.getHelpText(txt))
      $input.addClass(classes.inputError)
    })
    return this
  }

  clear() {
    $form.find('.' + classes.group).each(function (i, el) {
      $(this).removeClass(classes.groupError).find('.' + classes.invalidHelpBlock[0]).remove()
      $(this).find('.' + classes.inputError).removeClass(classes.inputError)
      // $(this).removeClass(classes.groupError).find("." + classes.helpBlock).remove();
    })
    return this
  }
  autoValidate(event){
    if (!event.target.checkValidity()) {
      event.preventDefault()
      event.stopPropagation()
    }

    target.classList.add('was-validated')

  }
}

EventHandler.on(document, `submit${EVENT_KEY}${DATA_API_KEY}`, SELECTOR_DATA_TOGGLE, event => {
  const target = getElementFromSelector(event.target)


  const data = Data.get(target, DATA_KEY) || new FormValidation(target)

  data.autoValidate(event)
})

export default FormValidation

