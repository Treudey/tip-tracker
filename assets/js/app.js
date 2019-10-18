// a single state object to keep track of all the values
const state = {
  float: 0,
  cashOnHand: 0,
  get cashOnHandTotal() { return this.cashOnHand - this.float },
  cashSales: 0,
  get cashTips() { return this.cashOnHandTotal - this.cashSales },
  dcTips: 0,
  tipout: 0,
  get owed() { return this.cashSales + this.tipout - this.dcTips },
  get netTips() { return this.cashTips + this.dcTips - this.tipout }
}

// Store all the DOM IDs in a single object
const domIDs = {
  float: 'float',
  floatSubtract: 'floatSubtract',
  cashOnHand: 'cashOnHand',
  cashTotal: 'cashTotal',
  cashSales: 'cashSales',
  cashTips: 'cashTips',
  dcTips: 'dcTips',
  tipout: 'tipout',
  owed: 'owed',
  tips: 'tips',
};

// Created custum event
const valueChangeEvent = new CustomEvent("valueChange");

// A class to define each html elelment that's going to be manipulated
class Field {
  constructor(domStr, stateKey, type, elementsToTrigger, eventsListeningFor) {
    this.type = type;
    this.domStr = domStr;
    this.stateKey = stateKey;
    this.element = document.getElementById(domStr);
    this.elementsToTrigger = [];
    if (this.type === 'input') {
      this.elementsToTrigger = elementsToTrigger;
      this.eventsListeningFor = eventsListeningFor;
    } else if (this.type === 'text') {
      this.elementsToTrigger = [];
      this.eventsListeningFor = ['valueChange'];
    }
  }
  
  eventHandler = () => {
    if (this.type === 'input') {
      state[this.stateKey] = this.element.value !== '' ? parseFloat(this.element.value) : 0;
      this.elementsToTrigger.forEach(el => {
        setTimeout(() => { document.getElementById(el).dispatchEvent(valueChangeEvent) });
      });
    } else if (this.type === 'text') {
      this.element.innerText = state[this.stateKey].toFixed(2);
    }
  }

  setupEventListeners() {
    this.eventsListeningFor.forEach(event => {
      this.element.addEventListener(event, this.eventHandler);
    });
  }
}

const fieldArray = [
  new Field(
    domIDs.float, 
    domIDs.float, 
    'input', 
    [domIDs.cashOnHand, domIDs.floatSubtract], 
    ['keyup', 'click']
  ),
  new Field(
    domIDs.floatSubtract, 
    domIDs.float, 
    'text', 
    [], 
    ['valueChange']
  ),
  new Field(
    domIDs.cashOnHand,
    domIDs.cashOnHand,
    'input',
    [domIDs.cashTotal, domIDs.cashSales],
    ['keyup', 'click', 'valueChange']
  ),
  new Field(
    domIDs.cashTotal,
    'cashOnHandTotal',
    'text',
    [],
    ['valueChange']
  ),
  new Field(
    domIDs.cashSales,
    domIDs.cashSales,
    'input',
    [domIDs.cashTips, domIDs.owed, domIDs.tips],
    ['keyup', 'click', 'valueChange']
  ),
  new Field(
    domIDs.cashTips,
    domIDs.cashTips,
    'text',
    [],
    ['valueChange']
  ),
  new Field(
    domIDs.dcTips,
    domIDs.dcTips,
    'input',
    [domIDs.tips, domIDs.owed],
    ['keyup', 'click']
  ),
  new Field(
    domIDs.tipout,
    domIDs.tipout,
    'input',
    [domIDs.tips, domIDs.owed],
    ['keyup', 'click']
  ),
  new Field(
    domIDs.owed,
    domIDs.owed,
    'text',
    [],
    ['valueChange']
  ),
  new Field(
    domIDs.tips,
    'netTips',
    'text',
    [],
    ['valueChange']
  )
];

fieldArray.forEach(field => field.setupEventListeners());
