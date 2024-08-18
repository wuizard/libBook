module.exports = function (app: any) {
    let token = require('../../helper/middleware/token');
    let bookController = require('../../controllers/api/bookControllers')

    app.route('/books').get(bookController.getBooks);
    app.route('/books/:id').get(bookController.getBookDetail);
    app.route('/books').post(bookController.createBooks);
    app.route('/books/:id').put(bookController.updateBooks);
    app.route('/books/:id').delete(bookController.deleteBooks);
}