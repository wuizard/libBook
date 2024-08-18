import { check } from 'express-validator';

module.exports = function (app: any) {
    let bookController = require('../../controllers/api/bookControllers')

    app.route('/books').get(bookController.getBooks);
    app.route('/books/:id').get(bookController.getBookDetail);
    app.route('/books').post(
        [
            check('title').isLength({ min: 1 }).trim().escape(),
            check('author').isString().isLength({ min: 1 }),
            check('publishedYear').isNumeric().trim().escape(),
            check('genres').isArray().trim().escape(),
            check('stock').isNumeric().trim().escape(),
        ],
        bookController.createBooks);
    app.route('/books/:id').put(
        [
            check('title').isLength({ min: 1 }).trim().escape(),
            check('author').isString().isLength({ min: 1 }),
            check('publishedYear').isNumeric().trim().escape(),
            check('genres').isArray().trim().escape(),
            check('stock').isNumeric().trim().escape(),
        ],
        bookController.updateBooks);
    app.route('/books/:id').delete(bookController.deleteBooks);
}