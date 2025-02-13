# Nicholas

## Project URL

**Task:** Provide the link to your deployed application. Please make sure the link works. 

https://nicholas-wrqh.onrender.com

## Project Video URL 

**Task:** Provide the link to your youtube video. Please make sure the link works. 

https://youtu.be/UAk3R0kSlQg

## Project Description

**Task:** Provide a detailed description of your app

The app is a shoe reselling website where buyers and sellers of hyped up shoes can come together and buy/sell brand new shoes. Sellers are able to create accounts and list their shoes onto the marketplace for anyone to buy, and buyers are able to make accounts to buy shoes. Users are able to view their own profile, which consists of all their past purchases of shoes, their past sales of shoes, and what they have currently listed on the webpage.

## Development

**Task:** Leaving deployment aside, explain how the app is built. Please describe the overall code design and be specific about the programming languages, framework, libraries and third-party api that you have used. 

The app is a full stack MERN application, meaning it was coded using MongoDB, ExpressJS, React.js and Node.js. The programming languages used in this app were Javascript, HTMl and CSS. The framework used in this project is the ExpressJS framework, a Node.js framework used to build the backend of this app. The library used in this project is the React library, used to code the frontend client of the webpage.
As for the overall code design, the application followed a Client-Server model, where the React frontend acted as the client that sends requests to the Express server, which then interacted with the MongoDB database. The Express backend acted as a RESTful API to serve data to the frontend. Also, the React frontend took advantage of components to produce reusable structures that led to an efficient webpage. Also, JWT was used in order to ensure secure user authentication and authorization checks.

## Deployment

**Task:** Explain how you have deployed your application. 

I seperated the backend and the frontend of the application into two different repositories, and deployed the backend on Render as a web service and the frontend on Render as a static webpage. I changed the backend URL from localhost to the deployed backend on Render so the frontend application was able to access and communicate with the backend. Also, I added the environmental variables for the backend and frontend such as the database URI and such into the backend and frontend themselves through Render, as the .env is not published on the repository. I attempted the deploy the application using Google Cloud, but it was not working after many attempts and I was not able to figure out why. A disadvantage of deploying using Render is that after a period of inactivity, the backend starts to slow down and takes a longer time for it to load, and so getting the website to work might take a while. You might have to create an account and wait a few moments before the backend starts getting responsive again.

## Challenges

**Task:** What is the top 3 most challenging things that you have learned/developed for you app? Please restrict your answer to only three items. 

1. Learning and knowing when to use React hooks such as useEffect and useState were challenging at first, but turned out to be really simple and very important in coding an efficient React webpage. At some parts, I was misusing the useEffect hook, which led to very many unnecessary re-renders, which really slowed down the webpage and the database.
2. Implementing a secure and reliable user authentication system was a challenging part of the app. Understanding and implementing JWTs were difficult, and managing the tokens were also a challenge.
3. Building a responsive and intuitive frontend was challenging, and mastering CSS and using it effectively was also very challenging. There were difficulties in making the website responsive at one point as it had to retrieve a large amount of data from the MongoDB database, and that took time to retrieve and store in states, which took time to render in.

## Contributions

**Task:** Describe the contribution of each team member to the project. Please provide the full name of each team member (but no student number). 

Lim Lei - All work and code were done by me.
