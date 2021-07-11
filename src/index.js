import './scss/index.scss'
import 'core-js/stable'
import 'regenerator-runtime/runtime'

// Calculator variables
const input = document.querySelector('#input')
const keys = document.querySelectorAll('.key')
const panel = document.querySelector('.panel')
let expression = []


// Calculate function

function calculate() {

   // Display symbols
   function displayInput() {
      return input.textContent = expression.join('')
   }

   // Clear input content
   function clearInput() {
      expression = []
      input.textContent = '0'
   }

   // Input default value
   input.textContent = '0'

   
   panel.addEventListener('click', event => {
      const el = event.target
      const elInputAbility = el.dataset.inputable
      const elType = el.dataset.type
      const elValue = el.dataset.value

      // Calculator keys
      switch (elValue) {
         case 'del':
            expression.pop()
            displayInput()
            if (expression.length === 0) {
               input.textContent = '0'
            }
            break
         case 'reset': 
            clearInput()
            break
         case '=':
            // Thow error for dividing on 0
            if (eval(expression.join('')) === Infinity) {
               input.textContent = 'Incorrect expression'
               expression = []
            } else {
               // Try to calculate expression
               try {
                  input.textContent = eval(expression.join(''))
                  expression = [eval(expression.join(''))]
               } catch(e) {
                  input.textContent = 'Incorrect expression'
                  expression = []
               }
            }
            break
      }

      // Add symbols to input
      if (elInputAbility && expression.length < 18) {
         // Spaces before and after math sign
         if (elType === 'sign') {
            expression.push(' ' + elValue + ' ')
         } else {
            expression.push(elValue)
         }
         displayInput()
      }
   })
}

calculate()


