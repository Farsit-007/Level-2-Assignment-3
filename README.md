## Assignment - 3

## Student Id - WEB9-1722

## Project Name - Blog Project

## [Live Link](https://assignment-3-level-2.vercel.app/)

## Admin login credentials :

```js
Email : admin@gmail.com
Password : 12345
```

## 🚀 Project Features :

## Features and Requirements

### 1\. User Roles

#### Admin:

-   Will be created manually in the database with predefined credentials.
-   Can delete any blog.
-   Can block any user by updating a property `isBlocked`.
-   **Cannot update any blog.**

#### User:

-   Can register and log in.
-   Can create blogs (only when logged in).
-   Can update and delete their own blogs.
-   **Cannot perform admin actions.**

### 2\. Authentication & Authorization

#### Authentication:

-   Users must log in to perform write, update, and delete operations.

#### Authorization:

-   Admin and User roles must be differentiated and secured.

### 3\. Blog API

-   A public API for reading blogs:
    -   Includes blog title, content, author details & other necessary information.
    -   Supports **search**, **sorting**, and **filtering** functionalities.

---

## 🛠️ Technology Stack

• TypeScript</br>
• Node.js</br>
• Express.js</br>
• MongoDB with Mongoose</br>

### 🧰 Setup Instructions

```js
git clone <repository-url>
cd level-2-Assignment-3
```

### .env file

```js
NODE_ENV = development
PORT = ...
DATABASE_URI = ...
BCRTPT_SALT = ...
JWT_ACCESS_SECRET = ....
```

### Install NPM

```shell
npm i
```

### Run the Project

```shell
npm run start:dev
```
