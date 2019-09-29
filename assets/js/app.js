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


// Create custum event
const valueChangeEvent = new CustomEvent("valueChange");

const floatElement = document.getElementById(domIDs.float);
const floatSubtractElement = document.getElementById(domIDs.floatSubtract);
const floatHandler = (event) => {
  state.float = parseFloat(floatElement.value);
  floatSubtractElement.innerText = state.float;
  cohElement.dispatchEvent(valueChangeEvent);
};
floatElement.addEventListener('keyup', floatHandler);
floatElement.addEventListener('click', floatHandler);

const cohElement = document.getElementById(domIDs.cashOnHand);
const cohHandler = () => {
  state.cashOnHand = parseFloat(cohElement.value);
  setTimeout(() => { cashTotalElement.dispatchEvent(valueChangeEvent) });
  setTimeout(() => { cashSalesElement.dispatchEvent(valueChangeEvent) });
};
cohElement.addEventListener('keyup', cohHandler);
cohElement.addEventListener('click', cohHandler);
cohElement.addEventListener('valueChange', cohHandler);

const cashTotalElement = document.getElementById(domIDs.cashTotal);
cashTotalElement.addEventListener('valueChange', (event) => {
  cashTotalElement.innerText = state.cashOnHandTotal.toFixed(2);
});

const cashSalesElement = document.getElementById(domIDs.cashSales);
const cashSalesHandler = () => { 
  state.cashSales = parseFloat(cashSalesElement.value);
  setTimeout(() => { cashTipsElement.dispatchEvent(valueChangeEvent) });
  setTimeout(() => { owedElement.dispatchEvent(valueChangeEvent) });
  setTimeout(() => { tipsElement.dispatchEvent(valueChangeEvent) });
};
cashSalesElement.addEventListener('keyup', cashSalesHandler);
cashSalesElement.addEventListener('click', cashSalesHandler);
cashSalesElement.addEventListener('valueChange', cashSalesHandler);

const cashTipsElement = document.getElementById(domIDs.cashTips);
cashTipsElement.addEventListener('valueChange', (event) => {
  cashTipsElement.innerText = state.cashTips.toFixed(2);
});

const dcTipsElement = document.getElementById(domIDs.dcTips);
const dcTipsHandler = () => {
  state.dcTips = parseFloat(dcTipsElement.value);
  console.log('dc tips' + state.dcTips);
  setTimeout(() => { tipsElement.dispatchEvent(valueChangeEvent) });
  setTimeout(() => { owedElement.dispatchEvent(valueChangeEvent) });
};
dcTipsElement.addEventListener('keyup', dcTipsHandler);
dcTipsElement.addEventListener('click', dcTipsHandler);

const tipoutElement = document.getElementById(domIDs.tipout);
const tipoutHandler = () => {
  state.tipout = parseFloat(tipoutElement.value);
  console.log('tipout' + state.tipout);
  setTimeout(() => { tipsElement.dispatchEvent(valueChangeEvent) });
  setTimeout(() => { owedElement.dispatchEvent(valueChangeEvent) });
};
tipoutElement.addEventListener('keyup', tipoutHandler);
tipoutElement.addEventListener('click', tipoutHandler);

const owedElement = document.getElementById(domIDs.owed);
owedElement.addEventListener('valueChange', (event) => {
  owedElement.innerText = state.owed.toFixed(2);
});

const tipsElement = document.getElementById(domIDs.tips);
tipsElement.addEventListener('valueChange', (event) => {
  console.log('net tips' + state.netTips)
  tipsElement.innerText = state.netTips.toFixed(2);
});
