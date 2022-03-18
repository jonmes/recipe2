import {
    Form as VeeForm,
    Field as VeeField,
    defineRule,
    ErrorMessage,
    configure,
} from 'vee-validate'
import { required, min, max, integer, email } from '@vee-validate/rules'

export default {
    install(app) {
        app.component('VeeForm', VeeForm)
        app.component('VeeField', VeeField)
        app.component('ErrorMessage', ErrorMessage)

        defineRule('required', required)
        defineRule('min', min)
        defineRule('max', max)
        defineRule('integer', integer)
        defineRule('email', email)

        configure({
            generateMessage: (ctx) => {
                const messages = {
                    required: `${ctx.field} is required.`,
                    min: `${ctx.field} is too short.`,
                    max: `${ctx.field} is too long.`,
                    integer: `${ctx.field} must be number.`,
                    email: `${ctx.field} must be email address.`
                }
                const message = messages[ctx.rule.name]
                    ? messages[ctx.rule.name]
                    : `The field ${context.field} is invalid.`
                    return message;
            },
            validateOnBlur: false,
            validateOnChange: false,
            validateOnInput: false,
            validateOnModelUpdate: true,
        })
    },
}