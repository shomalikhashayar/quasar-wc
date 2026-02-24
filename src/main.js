import App from './App.ce.vue'
import MyButton from './components/MyButton.vue'
import EssentialLink from './components/EssentialLink.vue'

import { defineCustomElement } from './define-custom-element'

const registerCustomElements = () => {
  customElements.define('quasar-entry-point', defineCustomElement(App))
  customElements.define('my-button', defineCustomElement(MyButton))
  customElements.define('essential-link', defineCustomElement(EssentialLink))
}

registerCustomElements()