import './scss/index.scss'
import 'core-js/stable'
import 'regenerator-runtime/runtime'

// Calculator variables
const input = document.querySelector('#input')
const keys = document.querySelectorAll('.key')
const panel = document.querySelector('#panel')
let expression = []


// Calculate function

function calculate() {

   // Display symbols
   function displayInput() {
      return input.textContent = expression.join('')
   }

   // Reset button function (Clear all)
   function clearInput() {
      expression = []
      input.textContent = '0'
   }

   // Equal button function (Result)

   function showResult() {
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
   }

   function keyboardInput(event, eventKey) {
      let keys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '/', '*', 'Enter', 'Backspace']
      let symbols = ['+', '-', '/', '*']

      // Checking if key is allowable
      if (!keys.includes(eventKey)) {
         return
      }

      // Checking if key is symbol and adding spaces before and after it
      if (symbols.includes(eventKey)) {
         expression.push(' ' + eventKey + ' ')
         displayInput()
         return
      }

      // Enter and backspace key realization
      if (eventKey === 'Enter') {
         showResult()
         return
      } else if (eventKey === 'Backspace') {
         deleteLastSymbol()
         return
      } 

      expression.push(eventKey)
      displayInput()
   }

   // Del button function (Deleting last symbol)

   function deleteLastSymbol() {
      expression.pop()
      displayInput()
      if (expression.length === 0) {
         input.textContent = '0'
      }
   }

   // Input default value
   input.textContent = '0'

   
   panel.addEventListener('click', event => {
      const el = event.target
      const elType = el.dataset.type
      const elValue = el.dataset.value

      // Calculator keys
      switch (elValue) {
         case 'del':
            deleteLastSymbol()
            break
         case 'reset': 
            clearInput()
            break
         case '=':
            showResult()
            break
      }

      // Add symbols to input
      if (el.dataset.inputable && expression.length < 18) {
         // Spaces before and after math sign
         if (elType === 'sign') {
            expression.push(' ' + elValue + ' ')
         } else {
            expression.push(elValue)
         }

         displayInput()
      }
   })

   document.addEventListener('keydown', event => {
      keyboardInput(event, event.key)
   })
}

calculate()


