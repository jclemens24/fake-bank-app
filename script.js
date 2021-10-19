'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2021-10-11T23:36:17.929Z',
    '2021-10-17T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account3 = {
  owner: 'Jordan Clemens',
  movements: [2000, 455.23, -306.5, 2500, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.8, // %
  pin: 2410,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2021-10-11T23:36:17.929Z',
    '2021-10-17T10:51:36.790Z',
  ],
  currency: 'USD',
  locale: 'en-US', // de-DE
};

const account4 = {
  owner: 'Nahib SriLanka',
  movements: [
    200000, 407.18, -112.5, 21000, -6422.29, -1343.9, 79.54, 1300.16, -401.48,
  ],
  interestRate: 1.4, // %
  pin: 4444,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2021-10-11T23:36:17.929Z',
    '2021-10-16T10:51:36.790Z',
    '2021-10-17T10:51:36.790Z',
  ],
  currency: 'SYP',
  locale: 'ar-SA', // de-DE
};
const accounts = [account1, account2, account3, account4];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
// Functions

const formatMovementsDate = function (date, locale) {
  const daysPassed = (date1, date2) =>
    Math.round(Math.abs((date2 - date1) / (1000 * 60 * 60 * 24)));

  const passedDays = Math.round(daysPassed(new Date(), date));
  if (passedDays === 0) return 'Today';
  if (passedDays === 1) return 'Yesterday';
  if (passedDays <= 7) return `${passedDays}D ago`;
  else {
    return new Intl.DateTimeFormat(locale).format(date);
  }
};

const formatCurrency = function (value, locale, curr) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: curr,
  }).format(value);
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementsDate(date, acc.locale);
    const curr = formatCurrency(mov, acc.locale, acc.currency);
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${curr}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  const formatCurr = formatCurrency(acc.balance, acc.locale, acc.currency);
  labelBalance.textContent = `${formatCurr}`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  const formatIncome = formatCurrency(incomes, acc.locale, acc.currency);
  labelSumIn.textContent = `${formatIncome}`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  const formatOut = formatCurrency(Math.abs(out), acc.locale, acc.currency);
  labelSumOut.textContent = `${formatOut}`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  const formatInterest = formatCurrency(interest, acc.locale, acc.currency);
  labelSumInterest.textContent = formatInterest;
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

///////////////////////////////////////
// Event handlers

//Start the timer
const startLogOutTimer = function () {
  const ticker = function () {
    //Call the timer every second
    const mins = String(Math.trunc(time / 60)).padStart(2, 0);
    const secs = String(time % 60).padStart(2, 0);
    //Each callback call, print remaining time to user interface
    labelTimer.textContent = `${mins}:${secs}`;

    if (time === 0) {
      clearInterval(timer);
      containerApp.style.opacity = '0';
      labelWelcome.textContent = 'Log in to get started';
    }
    time--;
  };
  //Reset The Timer If User is Active
  containerApp.addEventListener('mousemove', function (e) {
    e.preventDefault();
    time = 600;
    ticker();
  });
  let time = 600;

  ticker();
  const timer = setInterval(ticker, 1000);

  return timer;
};

let currentAccount, timer;

// Login Button Event Listener starts timer, updates UI
btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    //Format and convert to local currency

    //Create Current Date
    const now = new Date();
    labelDate.textContent = new Intl.DateTimeFormat(currentAccount.locale, {
      month: 'numeric',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    }).format(now);
    // Clear input fields

    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
    // Update UI
    if (timer) clearInterval(timer);
    timer = startLogOutTimer();
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(
    acc => acc?.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    //Push the transfer date to both accounts
    const transferTime = new Date();
    currentAccount.movementsDates.push(transferTime.toISOString());
    receiverAcc.movementsDates.push(transferTime.toISOString());

    // Update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    setTimeout(function () {
      currentAccount.movements.push(amount);

      //Push requested loan time to account owners
      const loanTime = new Date();
      currentAccount.movementsDates.push(loanTime.toISOString());

      // Update UI
      updateUI(currentAccount);
    }, 5000);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

//User-Made State Variable 'sorted'
let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
console.log(parseInt('23', 10));
console.log(+'23');
console.log(parseFloat('2.5'));
console.log(Number.parseFloat('2.5rem'));
console.log(Number.isNaN(23 / 12));
console.log(Number.isFinite(20));
console.log(Number.isFinite('20'));
console.log(Number.isFinite(23 / 0));

//Math and Rounding
console.log(Math.sqrt(49));
console.log(Math.cbrt(8));

console.log(Math.max(5, 18, 23, 9, 4, 6));
let maxArray = [19, 18, 49, 40, 58, 49, 29, 38];
console.log(Math.max(...maxArray));
console.log(Math.min(...maxArray));
console.log(Math.PI * Number.parseFloat('10px') ** 2);

console.log(Math.trunc(Math.random() * 6) + 1);

const randomInt = (min, max) =>
  Math.trunc(Math.random() * (max - min) + 1) + min;

console.log(randomInt(10, 20));

//Rounding Ints
console.log(Math.round(23.3));
console.log(Math.round(23.9));

console.log(Math.ceil(25.4));
console.log(Math.ceil(26.7));
console.log(Math.floor(30.8));

console.log(Math.fround(0.1 + 0.2));

//Rounding Decimals
console.log((2.7).toFixed(3));
console.log(+(0.1 + 0.2).toFixed(2));

//Remainder Operator
console.log(5 % 2);
console.log(8 % 3);

//check even number
const checkEvenNum = number => (number % 2 === 0 ? true : false);

console.log(checkEvenNum(101));
console.log(checkEvenNum(102));
console.log(checkEvenNum(10));

// labelBalance.addEventListener('click', function () {
//   [...document.querySelectorAll('.movements__row')].forEach(function (row, i) {
//     i % 2 === 0
//       ? (row.style.backgroundColor = 'orangered')
//       : (row.style.backgroundColor = 'white');
//   });
// });

//Working with BigInt
console.log(Number.MAX_SAFE_INTEGER);
console.log(2 ** 53 - 1);

console.log(449494902029492049559302n);
console.log(BigInt(1034029203940293092039302));

//Operations
console.log(10000n + 10000n);
const huge = 20203904920394920n;
const num = 24;
console.log(huge * BigInt(num));

console.log(20n == 20);
console.log(typeof 20n);

//Divisions
console.log(10n / 3n);

//Creating Dates and Times
// const now = new Date();
// console.log(now);

// console.log(new Date('Aug 02 2020 18:05:41'));
// console.log(new Date('November 26, 2012'));
// console.log(account1);
// console.log(new Date(account1.movementsDates[0]));
// console.log(new Date(2037, 10, 19, 15, 23, 4));

// console.log(new Date(0));
// console.log(new Date(3 * 24 * 60 * 60 * 1000));

//Working with dates
// const future = new Date(2037, 10, 19, 15, 23, 4);
// console.log(future);
// console.log(future.getFullYear());
// console.log(future.getMilliseconds());
// console.log(future.getMinutes());
// console.log(future.toISOString());
// console.log(Date.now());
// // const options = {
// //   weekday: 'long',
// //   year: 'numeric',
// //   month: 'long',
// //   day: 'numeric',
// // };
// console.log(future.toLocaleDateString('de-DE'));
// // console.log(future.toLocaleDateString('en-GB', options));
// // console.log(future.setMonth(1));
// console.log(future);

const future = new Date(2037, 10, 19, 15, 23);
console.log(+future);

// const daysPassed = (date1, date2) =>
//   Math.abs((date2 - date1) / (1000 * 60 * 60 * 24));

// console.log(daysPassed(new Date(2037, 3, 14), new Date(2037, 3, 4)));
console.log(new Date(2037, 3, 14));

const numbOptions = {
  style: 'currency',
  currency: 'USD',
};
const numb = 484848480.282;
console.log(new Intl.NumberFormat('en-US', numbOptions).format(numb));
console.log(new Intl.NumberFormat('de-DE').format(numb));
console.log(new Intl.NumberFormat('ar-SY').format(numb));
console.log(new Intl.PluralRules());

//SetTimeout and SetInterval

//Executes after 3 seconds === 3000 milliseconds
const ingredients = ['olives', 'spinach'];

const pizzaTimer = setTimeout(
  (ing1, ing2) => console.log(`Here is your pizza with ${ing1} and ${ing2}`),
  3000,
  ...ingredients
);

if (ingredients.includes('spinach')) clearTimeout(pizzaTimer);

// setInterval(function () {
//   const now = new Date();
//   const hours = now.getHours();
//   const minutes = now.getMinutes();
//   const seconds = now.getSeconds();
//   console.log(`${hours}:${minutes}:${seconds}`);
// }, 1000);

//Implementing a Countdown Timer
