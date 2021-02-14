import {css, customElement, html, LitElement, property } from 'lit-element';

@customElement('calculator-cmp')
export default class Calculator extends LitElement {
  // Style
  static styles = [
    css`
      :host {
        --btn-size: 6rem;
      }
    `,
    css` 
      .calculator {
        resize: both;
        background-color: #eee;
        border-radius: 20px;
        box-shadow: -8px -8px 16px -10px #fff, 8px 8px 16px -10px hsla(0, 0%, 0%, .15);
        
        padding: 20px;

        /* Grid start */
        display: grid;
        grid-template: repeat(6, var(--btn-size)) / repeat(4, var(--btn-size));
        grid-template-areas: 
          'result result result result'
          'ac divide percent back'
          'num-7 num-8 num-9 multiply'
          'num-4 num-5 num-6 subtract'
          'num-1 num-2 num-3 add'
          'num-0 num-0 dot equal'
        ;
        /* Grid end */
      }
    `,
    css`
      .result {
        grid-area: result;
        padding: 10px;
        font-size: 30px;
        display: flex;
        align-items: center;
        flex-flow: row-reverse
      }
    `,
    // Buttons style
    css`
      button {
        background-image: linear-gradient(135deg, rgba(230, 230, 230, 1) 0%, rgba(246, 246, 246, 1) 100%);
        border-radius: calc(var(--btn-size) / 2);
        border: none;
        box-shadow: -4px -4px 10px -8px #fff, 4px 4px 10px -8px hsla(0, 0%, 0%, .15);
        outline: none;

        cursor: pointer;
        color: #276678;
        font-size: 20px;

        margin: 8px;
        transition: .1s ease-in-out
      }
      button:active {
        transform: scale(.98)
      }
    `
  ]

  isOperator(character: string) {
    return ['+', '-', 'x', '/', '->', '='].indexOf(character) > -1
  }

  clear() {
    this.isDecimalAdded = false
    this.isOperatorAdded = false
    this.isStarted = false
    this.equation = '0'
  }

  calculation() {
    console.log(eval(this.equation))
    this.equation = (eval(this.equation) as number).toString()
  }

  backWord() {
    this.equation = this.equation.slice(0, this.equation.length - 1)
  }

  append(val: string) {
    if (val == 'AC') {
      this.clear()
      return
    }

    if (this.equation === '0' && !this.isOperator(val)) {
      if (val === '.') {
        this.equation += '.'
        this.isDecimalAdded = true
      } else {
        this.equation = val
      }

      this.isStarted = true
      return
    }

    // If it's a number or other character
    if (!this.isOperator(val)) {
      if (val === '.' && this.isDecimalAdded) {
        return
      }

      if (val === '.') {
        this.isDecimalAdded = true
      }
      if (this.isOperatorAdded) {
        this.isOperatorAdded = false
      }
      this.equation += val
    } else {
      if (val === '->') {
        this.backWord()
        return
      }
      if (val === '=') {
        this.calculation()
        return
      }
      if (this.isOperatorAdded) {
        return
      }
      this.equation += val
      this.isDecimalAdded=  false
      this.isOperatorAdded = true
    }
  }

  @property()
  equation = '0'

  @property()
  isDecimalAdded = false

  @property()
  isOperatorAdded = false

  @property()
  isStarted = false

  @property()
  buttons = [
    {
      content: 'AC',
      className: 'ac',
    },
    {
      content: '/',
      className: 'divide',
    },
    {
      content: '%',
      className: 'percent',
    },
    {
      content: '->',
      className: 'back',
    },
    {
      content: '0',
      className: 'num-0',
    },
    {
      content: '1',
      className: 'num-1',
    },
    {
      content: '2',
      className: 'num-2',
    },
    {
      content: '3',
      className: 'num-3',
    },
    {
      content: '4',
      className: 'num-4',
    },
    {
      content: '5',
      className: 'num-5',
    },
    {
      content: '6',
      className: 'num-6',
    },
    {
      content: '7',
      className: 'num-7',
    },
    {
      content: '8',
      className: 'num-8',
    },
    {
      content: '9',
      className: 'num-9',
    },
    {
      content: '*',
      className: 'multiply'
    },
    {
      content: '-',
      className: 'subtract',
    },
    {
      content: '=',
      className: 'equal',
    },
    {
      content: '+',
      className: 'add',
    },
    {
      content: '.',
      className: 'dot',
    }
  ]

  //
  render() {
    return html`
      <div class="calculator">
        <div class="result">${this.equation}</div>

        ${this.buttons.map((v) => {
          return html`
            <button @click=${() => this.append(v.content)} class=${v.className} style=" grid-area: ${v.className} ">${v.content}

            </button>
          `
        })}
      </div>
    `
  }
}
