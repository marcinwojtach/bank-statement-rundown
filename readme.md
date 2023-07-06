## Bank Statement Rundown

The purpose of this application is to parse a bank statement exported as CSV file and create a rundown of all the provided categories of expenses.

### How to run the application

1. create a .env file and copy contents from .env.local to it
2. from the root of the project run `npm install`
3. to start development server `npm start`
4. to build the app `npm run build`

### How to use this application

- fill in a parser config settings before parsing the CSV file - automatically launched after application starts
- create categories entries of entries called `Entries`
- i.e. `food`, `car`, `sports`, `going-out` (you can give it a name as you please)
- create a comma separated list of all tags that will be extracted from the contractor column in the file, i.e. if the expense contractor name is `Superfoods LTD`, then a tag could be `superfoods`
- save the config and choose a file to parse
- parser will automatically render a table with all the categories for you

### What is planned in the future

- code optimization and refactor
- storing configs and parsed data to allow to create multiple scenarios
- add option to re-run calculations
- create a summaries of expenses and it's share in overal budget
- create a non specified expenses column
- move to TypeScript
- ...

##### Special note

This project was created and enhanced for one of the university subjects.
PoC of this project was created some time ago to get rid of excel.
