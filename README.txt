1: boot up your local docker and run postgres for this system.
    a: if you have question please follow my CMD_LOG.txt it is a record of most if not all of the cmds i used in terminal.
2: cd into frontend/app and run npm start to start react.
3 cd into backend and run npx nodemon.
    a: if data fails to load ctrl+c to kill nodemon, then run npx knex migrate:latest and subsquently npx knex seed:run 
    b: the prior two commands should properly seed the data base with docker postgres being the mediator.

4. please follow the advice on the landing page accessed by the HOME button.
5. for any further questions you can reach me personally at git KERBALlang with a brief message of your troubles or if you know me just contact me inperson.