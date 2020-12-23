# Cornershop Frontend Test

#### ⚠️ Before you begin

> Create a new git repository on the root of this folder, upload it to Github, and invite [@mcarafie](https://github.com/mcarafie) and [@cornershop-hr](https://github.com/cornershop-hr) as collaborators.

##Decision making summary

- I decided to use Redux combined with hooks to handle the data flow for the app.
- Also decided to use react router to navigate between welcome and mainScreen, because I wanted that if the userhit refresh it still remains in the current page.
- Then I coded welcome screen with a link button to navigate to mainScreen.
- In main screen i divided the work in main components -> SearchBar, CountersList, Footers and Modals.
- I started by adding the SearchBar component which handle the text change to filter the counter list. The main challenge in this component was managing the states of the UI to fulfill the requirements.
- Then I workerd in the countersList component. This one get the necesary values from the store and render the particular UI component for the actual state. For this I've created 4 UI components, one for each posible state -> Loading, ErrorScreen, EmptyList and FullList.
    - For Loading I wanted to give a little fade in out animation for giving visual feedback to the user.
    - The errorScreen and the emptyList components are mostly UI.
    - The fullList component was the most challenging. I divided this UI in two. The summary and the actual list
        - The summary show totals for quantity of counters and counts and shows the refreshing state and button.
        - The itemsList consist in a list of Item component and each one of them handles the increment, decrement and selection of a particular counter.
        - For this component I added a eventListener for click in the window, with the goal of detecting when the user click outside of the list to clear the selection, for this i've used a helping class 'clickable' in all the components that could be clicked without clearing the selectio, such is the case for some modals and buttons in the footer.
        - Also had to create an disableOverlay that prevented clicks whe the list is disabled by the search filter with an empty text. In this case clicking in one of the list items would cancel the search and then enable clicks on the list.
- Next I added the footer component, this one renders the share and delete buttons if a particular counter is selected, and always render the add button.
    - For this had to add the share tooltip component, wich shows over the share button. Here had to put a hidden textArea to be able to copy text to the clipboard.
    - Also added a disableOverlay to prevent clicks when footer is disabled.
- Then I worked on the modals, starting with the add new counter. For this and the examples names modal i've used a library called react-modal-sheet, that allows to create bottom sheet animated modals fully customizable. 
    - For Addind a new counter I decided to store the new counter name in the store, to be able to modify this from the examples modal. And also disable the save button if empty.
    - The examples modal just is a display for fixed categories and suggestions of names, and when the user clicks on one of them the modal closes and set the new counter name to the store.
    - For the delete confirmation modal and the error modals I decided not to use any library and made them from scratch. 
    - The error modals was the last functionality implementation. For this I wanted to make a dynamic component that get the tipe of error from the store and changes the messages and the action buttons in return.
- In each of these steps I added the corresponding actions and reducers to handle the data store.
- Once I finished developing the app functionality I did a little refactoring, mooving some action dispatch to make more purely presentation components.
- Al last I added unit behaviour testing for each of the presentation components and connected components as well.

- Overall the main challenges I've faced were using redux with hooks, this was new to me but i wanted to apply this for making more concise components, and also testing this hooked components was a little tricky. 
    
        

## Overview

You have been commissioned to implement a counter application following the design specs provided [here](https://www.figma.com/file/6CnuM0Gj9oiwi2AV9vXLRH/Counters-for-the-web?node-id=0%3A1).

The application consists of several screens where each screen has one or multiple states that you will have to implement following the design specs the best you can.

We have provided starter boilerplate so you can write your application without any hassle and also a NodeJS dummy backend with all the neccessary endpoints to persist your data.

For bootstrapping the frontend application we're using `react-scripts`, so as you might have guessed you **must** use React (it's our primary view layer for frontend applications here at Cornershop).

> Note: This is NOT a backend test. Don't make it require any databases. Don't touch the server folder. Just leave it as it is.

## Requirements

Your submission will be evaluated considering the following criterias:

- Good implementation of UI elements, both visually and at code level.
  - Extra points for writing custom styling code for UI elements.
  - Use whatever CSS flavor you want: plane old CSS, SASS, LESS, CSS-in-JS, CSS modules, everything is allowed.
- Good architecture and software design.
  - _Hint:_ Usage of design patterns, good code organization, separation of concerns, etc. 
- Use of best practices when writing code.
  - _Hint:_ Idiomatic & readable code, good use of composition, DRY, etc.
- The application must persist data back to the server.
- Feature completion (all features must be implemented for a perfect score).
- Good management of state using built-in React features or third party dependencies (context, `redux`, `mobx`, `xstate` or whatever you might like).
- You must include tests.
  - Behavior tests are perfect.
- Your project must be self-contained (make sure you're not using global dependencies).
- We would love to understand your thought process, so writing a little summary of your choices, what you did and how you solved the test is required (write it here on this README file).

Please consider that we expect your solution to be production-ready. In other words, that millions of users would be thrilled to use your product.

> Note: You can use whatever dependencies/libraries you want, the only requirement dependency-wise is to use React.

## Getting started

First and foremost, make sure you have `node` and `npm` (or `yarn`) installed on your machine, then run:

```bash
$ npm install
$ npm start
```

For `yarn` users:

```bash
$ yarn
$ yarn start
```

## API endpoints / examples

Since the backend API runs locally on a different port (`3001`) than the `react-scripts` dev server (`3000`), we have setup a proxy so you don't have to do anything special to consume the API (fetching data from `/api/v1/counter` will do).

> The following endpoints are expecting a `Content-Type: application/json` header.

#### **GET** `/api/v1/counter`.

_Fetch a list of counters._
```javascript
/* Response */
[]
```

#### **POST** `/api/v1/counter`.

_Adds a counter._

```javascript
/* Body */
{ title: "bob" }

/* Response */
{ id: "asdf", title: "bob", count: 0 }
```

#### **POST** `/api/v1/counter/inc`
_Increments the value of a counter._
```javascript
/* Body */
{ id: "asdf" }

/* Response */
{ id: "asdf", title: "bob", count: 1 }
```

#### **POST** `/api/v1/counter/dec`
_Decrements the value of a counter._

```javascript
/* Body */
{ id: "asdf" }

/* Response */
{ id: "asdf", title: "bob", count: 0 }
```

#### **DELETE** `/api/v1/counter`
_Deletes a counter._

```javascript
/* Body */
{ id: "qwer" }

/* Response */
"qwer" // The id of the deleted counter
```
---

Good luck! 🎉

We hope your submission is… to die for.

![Coffin dance](coffin.gif)
