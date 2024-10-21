# CATBANK
A simple-minimalistic bank created during Full-Stack studies.

# Installation
1. Download the files. 
2. install all the required libraries/packages using npm for Front-End and Back-End.
Front-end:
> axiom
> axios
> vite
> react-dom
> react-router-dom

Back-End:
> bcrypt
> cors
> dotenv
> express-session
> express
> jsonwebtoken
> mongoose
> multer
> nodemon
> validation

If there are missing ones, check the terminal.
3. Download Postman, you will need to use to create an user through localhost.

# Usage Example
To use it, you will need to open two programs. VSCode and Postman.
1. Launch Back-End and Front-End through terminals on VCCode.
    You should see in the terminal "Serveris veikia ant: 5000 port", meaning the backend is running on 5000th port.
2. Open Postman and create new POST. In the URL bar, write "http://localhost:5000/api/user/register"
3. In Postman, choose body, raw and in the field write needed credentials:
    {
        "username": "adminas",
        "password": "adminas"
    }
4. On right side of Postman, press Send and at the bottom, you should see information of data, id, userName and a message of your success.