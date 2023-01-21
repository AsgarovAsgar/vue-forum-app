import { Form, Field, ErrorMessage, defineRule, configure } from 'vee-validate'
import { required, email, min } from '@vee-validate/rules'
import { localize } from '@vee-validate/i18n'
import firebase from "firebase/compat/app";

export default (app) => {
  // CUSTOM RULES
  // defineRule('required', (value) => {
  //   if(value && value.trim()) return true
  //   return 'This is required'
  // })

  defineRule('required', required)
  defineRule('email', email)
  defineRule('min', min)
  defineRule('unique', async (value, args) => {
    let collection, field
    if(Array.isArray(args)) {
      [ collection, field ] = args
    } else {
      ({ collection, field } = args)
    }
    const querySnapshot = await firebase.firestore().collection(collection).where(field, '==', value).get()
    console.log('eooloo');
    return querySnapshot.empty
  })

  configure({
    generateMessage: localize('en', {
      messages: {
        required: '{field} is required',
        email: '{field} must be a valid email',
        min: '{field} must be minimum 0:{min} characters', //take label of the input instead of the name of the field.
        unique: '{field} is already taken'
      }
    })
  })

  app.component('VeeForm', Form)
  app.component('VeeField', Field)
  app.component('VeeErrorMessage', ErrorMessage)
}