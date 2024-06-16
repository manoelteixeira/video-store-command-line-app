# Video Strore Command Line App
A simple command line application for a video store.

## Index
- [Setup](#setup)
- [Usage](#usage)
- [Commands Description](#commands-description)
- [Attributions](#attributions)

---

## Setup
1. **Fork** and **clone** this repository.
2. `cd` into the cloned folder.
3. run `npm install`

## Usage
- `npm run create-user` to add a new user
- `npm run show-user` to show user information
- `npm run show-all-users` to show all users information
- `npm run update-user` to update user information
- `npm run delete-user` to delete user
- `npm run create-movie` to add a new movie
- `npm run show-movie` to show movie information
- `npm run show-all-movies` to show all movies information
- `npm run update-movie` to update movie information
- `npm run delete-movie` to delete move 
- `npm run start` to run a command line interactive prompt `[In progess]`

## Commands Description

### `create-user`:
- Required parameters: `name`, `address`, `phone`, `username`, `password`, `isEmploy`
- Usage:`npm run create-user name=<name> address=<address> phone=<phone> username=<username> password=<password> isEmploy=<true or false>`

### `show-user`:
- Required parameters: `id`
- Usage: `npm run show-user id=<id>`

### `show-all-users`:
- Usage: `npm run show-all-users`

### `update-user`:
- Required parameters: `id`
- Optional parameters: `name` `address` `phone` `username` `password` 
- Usage: `npm run update-user id=<id> address=<address> phone=<phone> ...`

### `delete-user`:
- Required parameters: `id`
- Usage: `npm run delete-user id=<id>`

### `create-movie`:
- Required parameters: `title`, `director`, `genre`, `year`, `quantity`, `price`
- Usage: `npm run create-movie title=<title> director=<director> genre=<genre> year=<year> quantity=<quantity> price=<price>`

### `show-movie`:
- Required parameters: `id`
- Usage: `npm run show-movie id=<id>`

### `show-all-movies`:
- Usage: `npm run show-all-movies`

### `update-movie`:
- Required parameters: `id`
- Optional parameters: `title`, `director`, `genre`, `year`, `quantity`, `price`
- Usage: `npm run update-movie id=<id> director=<director> genre=<genre> ...`

### `delete-movie`:
- Required parameters: `id`
- Usage: `npm run delete-movie id=<id>`

## Attributions
- [cli-table](https://github.com/Automattic/cli-table)
- [colors](https://github.com/Marak/colors.js)
- [figlet](https://github.com/patorjk/figlet.js)
- [inquirer](https://github.com/SBoudrias/Inquirer.js)
- [lolcatjs](https://github.com/finngreiter/lolcats)
- [nanoid](https://github.com/ai/nanoid)


