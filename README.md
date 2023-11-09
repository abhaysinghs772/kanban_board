# Project Name

Kanban Board Assignment (Backend Only).

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js: [Installation Guide](https://nodejs.org/)
- Git: [Installation Guide](https://git-scm.com/)

## Getting Started

To set up this project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/abhaysinghs772/kanban_board.git

2. go to the cloned project. 
    ```bash
    cd kanban_board

3. Install dependencies:
    ```bash
    npm install

4. navigate to app.ts and change the value of uri to your mongodb atlas credentials at line num 25.

5. run the project 
    ```bash
    npm run start:dev

6. In order to test/check api's first signup and then do login by their respective apis and then use the token as : 
    ```bash
    authorication: Bearear <your_token>

7. find the api colections in the root directory of this project and then import it in your postman

8. this project is Deployed on AWS EC2 Ubuntu instance. 

9. All the apis are very simple and can be extended as well 

10. this project is using interfaces apart from this we cn also use dto-validator/class-vallidators to valid incoming data in much better way.