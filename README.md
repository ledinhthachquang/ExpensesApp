# ExpensesApp
<<<<<<< Updated upstream
- `npm install` or `yarn` to install all the dependencies, React and React Native among others.
## Scenario

In Vietnam today, there is a lot of demand for personal financial management. Therefore, the team decided to create an application that can support the needs of tracking personal finances. This app aims to help users track their expenses, store and categorize data by date into charts for financial analysis, and manage their personal finances efficiently.

## Detail
- Main functions: Add, delete, edit transactions, Import, Export data to csv,xml,qif files. Manage data by date in the form of charts. Send notifications and schedule transactions automatically.Finally, search and filter fucntion help users can search and filter transactions by headings, dates and categories 
- Total time to complete: ~50h
- Member: Group of 3 people
- Framework: React-native
- Database: Firebase storage

## Feature
### ScreenShots
<img width="333" alt="image" src="https://user-images.githubusercontent.com/111257273/222358448-3b7a0352-943e-4aca-ac9c-4943e6ff19de.png"> <img width="333" alt="image" src="https://user-images.githubusercontent.com/111257273/222358539-e72f5861-55e7-4815-8456-e72a2e82ac5f.png">  

- Home Screen

<img width="333" alt="image" src="https://user-images.githubusercontent.com/111257273/222358091-038bb19e-b230-433e-9588-7ebbb3e30e60.png"> <img width="331" alt="image" src="https://user-images.githubusercontent.com/111257273/222359112-f81bbfc5-3c5a-40ca-a5af-f07bdb9191d5.png">

- Financial analysis: Users can view their expenses and income in the form of charts, which helps them analyze their financial performance.
<img width="332" alt="image" src="https://user-images.githubusercontent.com/111257273/222359674-e8ae56ff-f378-40b5-974a-98aac90ed0ed.png">

- Import and Export data: Users can import and export their data to and from csv,xml,qif files.

<img width="333" alt="image" src="https://user-images.githubusercontent.com/111257273/222360132-e005ff7d-97c9-4446-ae9a-8985c5efdd4c.png"> <img width="332" alt="image" src="https://user-images.githubusercontent.com/111257273/222360554-0baddfe8-dad7-4ba0-8b85-af0b9f2a233c.png">

- Search and Filter: Users can search and filter transactions by headings, dates and categories

<img width="332" alt="image" src="https://user-images.githubusercontent.com/111257273/222361493-92dd1785-8d26-404a-b9e0-02ab9261602d.png"> <img width="300" alt="image" src="https://user-images.githubusercontent.com/111257273/222362454-df3123ec-efcb-4d57-adfb-05205d89f5ef.png">


- Notifications: Users can set up notifications for upcoming transactions and receive reminders before the transaction date.
- Schedule transactions: Users can schedule transactions to occur automatically on specific dates.

This project aims to provide users with a user-friendly, efficient, and secure personal finance management application. The team has used React-native framework and Firebase storage for the project, and it took approximately 50 hours to complete.

## Attempt
During the development of the application, it was difficult to transfer and process data using traditional databases. Therefore, we decided to use Firebase instead of conventional database design. By using the provided API, it is easy to transfer and manipulate data.

Regarding improvement, we want to add diversity to various financial products and make it easy for accountants to use.

## Build Notes
```
#### With some versions of npm (>=v3.3.10)

Some builds from npm included bugs while `npm install`. So if you are using a npm version within the range form 3.3.10 to 3.6.0 included, you must run `npm install` twice. Those versions including npm v3.3.12 are the ones bundled by default with node from version v5.1.0 to v5.5.0.

- `npm install npm`
- `npm install npm` run it twice, because of the packages won't be installed after the first run [#10985](https://github.com/npm/npm/issues/10985)

```

=======
Project Overview:

Scenario:
In Vietnam today, there is a lot of demand for personal financial management. Therefore, the team decided to create an application that can support the needs of tracking personal finances. This app aims to help users track their expenses, store and categorize data by date into charts for financial analysis, and manage their personal finances efficiently.

Detail:

Main functions: Add, delete, edit transactions, Import, Export data to svg files. Manage data by date in the form of charts. Send notifications and schedule transactions automatically.
Total time to complete: ~50h
Member: Group of 3 people
Framework: React-native
Database: Firebase storage
Feature:

Add transaction: Users can add a new transaction by specifying the date, category, amount, and description of the transaction.
Edit transaction: Users can edit an existing transaction by modifying its date, category, amount, or description.
Delete transaction: Users can delete an existing transaction by clicking on the delete button.
Import and Export data: Users can import and export their data to and from svg files.
Financial analysis: Users can view their expenses and income in the form of charts, which helps them analyze their financial performance.
Notifications: Users can set up notifications for upcoming transactions and receive reminders before the transaction date.
Schedule transactions: Users can schedule transactions to occur automatically on specific dates.
>>>>>>> Stashed changes
