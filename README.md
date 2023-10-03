# Getting started
To get the Node server running locally:

- Clone this repo.
- `npm install` to install all required dependencies.
- Setup environment file (.env). At least you should have DATABASE_URL for the MongoDB url.
- `npm run dev` to start the local server.

# Code Overview

## Dependencies
Please check the package.json file.

## Application Structure
- `index.js` - Our app's entry point.
- `controllers/` - Our app's controllers. For now, it only has the image controller.
- `middleware/` - Our app's middlewares. For now, it only has the multer middleware, for handling file upload.
- `models/` - Our app's models. It includes a base database model with a mongoDB database model. For the app's model, there's the image model handling the image.
- `public/` - Our app's front-end. Including a simple index.html and script.js file.
- `routes/` - Our app's route, for API.

# Comment

## Things I have done (somewhat acceptable).
- Trying to structure it into an MVC project. It doesn't have the Views yet.
- Trying to follow the 12-factor.
- Functionable.

## Things I haven't done in time.
- Complete the database. For now, the app can store the image to a MongoDB database and can retrieve it back. But for some reason, the file is unreadable, so it can't be process. For now, the app only stores the image, convert it into greyscale and stores the new image, and shows the new image.
- Basecode is not finished. It's still unstructured in some part, and still lack comment for future review and upgrading.
- The way I use MongoDB is not really following the 'backing service' of the 12-factor app.

## To-do list (if I have the chance).
- Trying to fix the database problem.
- Organize base code.
- Find a new database, maybe something that can handle image file.