# fake-bank-app
An app that simulates banking financial transactions


Hello and welcome to my fake-bank-app repository. I am currently learning JavaScript, HTML, CSS and other JS libraries and so loading the source code not only teaches me how to use Git but the importance of version control. I am also learning proper README.md format as well as content so if you stumble upon this repository, please provide me feedback. I aspire to be one of the best Front-End-Devs within the industry with the goal of learning Full-Stack in the future so all critique is welcome and will greatly benefit me more than I can express in words.

<-----What is the fake-bank-app?----->

The fake-bank-app mimics a real-world banking web application. The app is built using vanilla JS. Each user is stored stored inside an object with all relevant properties such as their name, pin, their transactions, transaction dates, etc. and then each account is stored into an array of objects. The login button simply utilizes an event listener and quickly finds the account username and verifies it matches the account pin number.

The fake-bank-app can simulate transfers, request loan amounts, and each user can "close" their account provided they input the correct account information. Additionally, upon each successful login, a countdown timer is initiated that will automatically log the user out after 10 minutes of inactivity. The timer resets automatically back to the defualt 10 minutes with each move of the mouse.

<-----Known issues within fake-bank-app----->

The app currently has a "sort" feature that sorts withdrawals and deposits into an ascending order from bottom to top. However, due to my logic, dates will match up with a new "transaction type" instead of its corresponding original transaction. This is a feature I plan on changing in the future.

<-----How to use the fake-bank-app----->

You can clone the source files and then utilize 'live-server' via the terminal since this is only front-end code. The project is not currently hosted anywhere as their is no back-end code to support that. However, I am sure there are many other options you can utilize (and again, as a learning dev, please feel free to tell me about these resources. I aspire to learn everything.)

<-----Credits----->

Credit is given to Jonas Schmedtmann. I am currently taking his course "The Complete JavaScript Course 2021: From Zero to Expert" hosted on Udemy. If you are also looking to learn JavaScript, I suggest this course along with a few complimentary resources such as www.javascript.info and https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference

<-----License----->

There is no licensing and you are free to use this source code as you see fit. 
