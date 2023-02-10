# Net Guru frontend test

## Stack

This application was built with:

    - React
    - Redux
    - Tailwind CSS
    - Cypress

## Initial setup and run the application

1.  Install node modules:

    - npm install --legacy-peer-deps

2.  Build the application:

    This is a test project, not a production.  
    Run this command.

        npm run build

3.  Run the application:

        npm run dev

4.  Check the application:

        http://localhost:5000

## Test the application

I used Cypress for end to end test.  
I just tested only one function that add hero.  
Run this command.

    npm run test

## The issues

1. When implementing infinite scrolling, I think it's more efficent to fetch a certain amount of chunk data from the backend each time.
   Here are apis from backend.

   | Method | Endpoint     |
   | ------ | ------------ |
   | GET    | /heroes      |
   | POST   | /heroes      |
   | PUT    | /heroes/{id} |
   | DELETE | /heroes/{id} |
   | GET    | /heroes/{id} |

   I couldn't find api in the backend api.
   So I decided to fetch all data at once, keep in the store, and show certain amount as scroll down.

2. Another issus was that the url of the avatars fetched from the backed is incorrect.  
   For example, it was as follows:  
   /static/png/abc.png  
   It is not reasonable way, so I had to do hard-coding.

## Author

Deris

## Thanks

This coding challenge was a bit difficult and tricy.  
It was very impressive.  
Looking forward to hearing from you soon, I hope you will have success with all your endeavors.
