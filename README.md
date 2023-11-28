# ![](/front/public/favicon-32x32.png)iCode
This is a miniature [LeetCode](https://leetcode.com/)-esque application built with a MERN stack.

## Features
1. User registration
   1. // TODO: Role-based user authorization
2. React.js/Vite-based interface
3. Node.js-based REST API serving public and user-specific data
4. // TODO: Database to store users, user submissions, and coding problems
5. Dynamic list of LeetCode-style coding problems
   1. // TODO: Ability to create questions for admins
6. Ability for users to submit solutions for coding problems (feedback on code "correctness" is random)
   1. // TODO: Containerized execution of user-submitted code

## Using the App
1. Set up Node.js and npm
   * Ensure you have Node.js and npm (Node Package Manager) installed on your computer. You can download and install them from [Node.js official website](https://nodejs.org/) (or ask ChatGPT, given your current OS).

2. Clone this repository
   * `$ git clone git@github.com:kraell/iCode.git`
   * `$ cd iCode`
   * While front-end code and back-end code could be combined into one directory, I've decided to keep them divided as to stay consistent in the separation of concerns, despite the small size of the codebase.

3. Launch application(s)
   - Front-end (in terminal window #1)
     1. `$ cd front`
     2. Install dependencies
        * `$ npm install`
     3. Launch application
        <!-- * `$ npm run build` -->
        * `$ npm run preview`
   - Back-end (in terminal window #2)
     1. `$ cd back`
     2. Install dependencies
        * `$ npm install`
     3. Launch application
        * `$ npm start`

4. Navigate to [http://localhost:10019/](http://localhost:10019/)

5. Shut down the application(s)
   * `Ctrl+C` in each terminal window that launched the front- and/or back-end.
