# CampusAPI, Node.js, Firestore, JWT

CampusAPI is a Node.js API with a firestore database and secured with a JWT

## Setup in local

**1. Clone the application**

```bash
git clone https://github.com/RJdaini22/CampusAPI.git
```

**2. Create a firestore database**

2 collections :

```bash
campus
users
```

you have to create a document in the users collection with theses informations (email and password are examples) :

```bash
email : "admin@gmail.com" (string 40)
password : "password" (string 40)
```

then, create a document in the campus collection with these informations :

```bash
city : "Brest" (string 16)
name : "TEST" (string 16)
zip_code : 29200 (int 16)
```

**3. Connect to firestore**

change the db_keys/serviceAccountKey.json by the json file given in your firestore database


**4. Run the app using node**

```bash
node index.js
```

## Request this API on Heroku

CampusAPI is available on Heroku with this url :

```bash
https://campusapinode.herokuapp.com
```

You can pass the "Setup in local" section and use CampusAPI with this url. The login credentials are :

```bash
email: "admin@gmail.com"
password: "password"

OR

email: "user@gmail.com"
password: "password"
```

## Explore CampusAPI (CRUD)

### Auth

| Method | Url | Decription | JSON Request Body | 
| ------ | --- | ---------- | ------------ |
| POST   | /login | Login | [JSON](#login) |

This url will return a token if you post the good credentials (based on the ones you added in your users collection).
The token will be needed to use the other CRUD functionalities.
To use the token, you have to put it in the Auth part of your rest client (Bearer Token section).

### Users

| Method | Url | Description | JSON Request Body | Need Bearer Token |
| ------ | --- | ----------- | ------------------------- | ----------------- |
| GET    | /api/users | Get all users | | Yes |

### Campus

| Method | Url | Description | JSON Request Body | Need Bearer Token |
| ------ | --- | ----------- | ------------------------- | ----------------- |
| GET    | /api/read | Get all campus | | Yes |
| GET    | /api/read/{id} | Get campus by id | | Yes |
| GET    | /api/read/{id}/name | Get campus name by id | | Yes |
| POST    | /api/create | Create campus | [JSON](#addcampus) | Yes |
| PUT    | /api/update/{id} | Update campus by id | [JSON](#updatecampus) | Yes |
| DELETE    | /api/delete/{id} | Delete campus by id | | Yes |

Use these with thunderclient or any other rest client.

## JSON Request Bodys

##### <a id="login">Login -> /login</a>
```json
{
    "email": "admin@gmail.com",
    "password": "password"
}
```

##### <a id="addcampus">Create campus -> /api/create</a>
```json
{
    "name":"TEST",
    "city":"Brest",
    "zip_code":29200
}
```

##### <a id="updatecampus">Update campus by id -> /api/update/{id}</a>
```json
{
  "zip_code": 29200,
  "name": "MODIF",
  "city": "Brest"
}
```

