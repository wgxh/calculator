import{LitElement,html,css,property,customElement}from"lit-element";var __defProp=Object.defineProperty,__getOwnPropDesc=Object.getOwnPropertyDescriptor,__decorate=(t,e,a,s)=>{for(var r,o=s>1?void 0:s?__getOwnPropDesc(e,a):e,i=t.length-1;i>=0;i--)(r=t[i])&&(o=(s?r(e,a,o):r(o))||o);return s&&o&&__defProp(e,a,o),o};let Calculator=class extends LitElement{constructor(){super(...arguments),this.equation="0",this.isDecimalAdded=!1,this.isOperatorAdded=!1,this.isStarted=!1,this.buttons=[{content:"AC",className:"ac"},{content:"/",className:"divide"},{content:"%",className:"percent"},{content:"->",className:"back"},{content:"0",className:"num-0"},{content:"1",className:"num-1"},{content:"2",className:"num-2"},{content:"3",className:"num-3"},{content:"4",className:"num-4"},{content:"5",className:"num-5"},{content:"6",className:"num-6"},{content:"7",className:"num-7"},{content:"8",className:"num-8"},{content:"9",className:"num-9"},{content:"*",className:"multiply"},{content:"-",className:"subtract"},{content:"=",className:"equal"},{content:"+",className:"add"},{content:".",className:"dot"}]}isOperator(t){return["+","-","x","/","->","="].indexOf(t)>-1}clear(){this.isDecimalAdded=!1,this.isOperatorAdded=!1,this.isStarted=!1,this.equation="0"}calculation(){console.log(eval(this.equation)),this.equation=eval(this.equation).toString()}backWord(){this.equation=this.equation.slice(0,this.equation.length-1)}append(t){if("AC"!=t){if("0"===this.equation&&!this.isOperator(t))return"."===t?(this.equation+=".",this.isDecimalAdded=!0):this.equation=t,void(this.isStarted=!0);if(this.isOperator(t)){if("->"===t)return void this.backWord();if("="===t)return void this.calculation();if(this.isOperatorAdded)return;this.equation+=t,this.isDecimalAdded=!1,this.isOperatorAdded=!0}else{if("."===t&&this.isDecimalAdded)return;"."===t&&(this.isDecimalAdded=!0),this.isOperatorAdded&&(this.isOperatorAdded=!1),this.equation+=t}}else this.clear()}render(){return html`
      <div class="calculator">
        <div class="result">${this.equation}</div>

        ${this.buttons.map((t=>html`
            <button @click=${()=>this.append(t.content)} class=${t.className} style=" grid-area: ${t.className} ">${t.content}

            </button>
          `))}
      </div>
    `}};Calculator.styles=[css`
      :host {
        --btn-size: 6rem;
      }
    `,css` 
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
    `,css`
      .result {
        grid-area: result;
        padding: 10px;
        font-size: 30px;
        display: flex;
        align-items: center;
        flex-flow: row-reverse
      }
    `,css`
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
    `],__decorate([property()],Calculator.prototype,"equation",2),__decorate([property()],Calculator.prototype,"isDecimalAdded",2),__decorate([property()],Calculator.prototype,"isOperatorAdded",2),__decorate([property()],Calculator.prototype,"isStarted",2),__decorate([property()],Calculator.prototype,"buttons",2),Calculator=__decorate([customElement("calculator-cmp")],Calculator);var Calculator$1=Calculator;export default Calculator$1;
