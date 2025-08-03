<p align="center">
  <a href="drgn-production.up.railway.app/" target="blank"><img src="https://drgn-production.up.railway.app/assets/logo@full.png" width="220" alt="DRGN" /></a>
</p>


## Description
A real-time chat app built with Angular (frontend) and NestJS (backend). Features include WebSocket messaging, emoji support, file sharing, and JWT authentication.
## Project setup

### Client configuration
First you need to build the frontend project then you can simply run the application

```bash
$ cd client
$ npm ci

#development
$ npm run start

# watch mode
$ npm run watch

# production mode
$ npm run build

```


### Api Configuration
Next you will return back to the backend folder to finish the project setup

First you need to setup the environment file
```bash
$ cp .env.example .env
```
Then run the follows

```bash
$ cd api
$ npm ci
$ npm run migration:run 

# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod

```

## Deployment
For deployment you need first to build the front end project then run the following:
```bash
$ cd client
$ npm ci
$ npm run build

$ cd api
$ npm ci
$ npm run migration:run
$ npm run build
$ npm run start:prod
```

## Credits

- [Hasan Deeb](https://github.com/aldeebhasan)
- [All Contributors](../../contributors)

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
