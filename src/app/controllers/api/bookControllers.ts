import { Request, Response } from 'express';
import response from '../../helper/output/output';
import { Books } from '../../../model/index';
import { validationResult  } from 'express-validator';


module.exports = {
    getBooks: async (req: Request, res: Response) => {
        try {
            let { query } = req
            let { keywords, limit, page } = query
            limit = limit || '20'
            page = page || '1'
            let skip = Number(limit) * (Number(page) - 1)
            
            let params = {}

            if (keywords) {
                let regExp = new RegExp('\^' + keywords, "i");
                params = {
                    $or: [
                        { title: {$regex: keywords, $options: 'i'} },
                        { author: {$regex: keywords, $options: 'i'} },
                        { genres: {$in: [ regExp ] }},
                    ]
                }
            }

            if (keywords) {
                let books = await Books.find(params)
                    .limit(Number(limit))
                    .skip(skip)
                    .lean()
                let total = await Books.find(params).countDocuments()
                response.responseData(res, {
                    page: Number(page),
                    totalPages: Math.ceil(total / Number(limit)),
                    totalBooks: total,
                    books
                })
            } else {
                let books = await Books.find(params).lean()
                response.responseData(res, books)
            }
        } catch (error) {
            response.responseError(res, {
                message: error
            })
        }
    },
    getBookDetail: async (req: Request, res: Response) => {
        try {
            let { params } = req
            let { id } = params
            let book = await Books.findOne({
                _id: id
            }).lean()
            console.log(book)
            response.responseData(res, book)
        } catch (error) {
            response.responseError(res, {
                message: error
            })
        }
    },
    createBooks: async (req: Request, res: Response) => {
        try {
            let { body } = req
            let err = validationResult(req)
            if (!err.isEmpty()) {
                console.log(err.mapped())
                // you stop here 
                throw 'Wrong input format'
            }
            // validate if already saved

            let books = await Books.create({
                ...body
            })
            console.log(books)

            let book = await Books.findOne({
                _id: books._id
            }).select('-createdDate -updatedDate').lean()

            response.responseData(res, book)
        } catch (error) {
            response.responseError(res, {
                message: error
            })
        }
    },
    updateBooks: async (req: Request, res: Response) => {
        try {
            let { body, params } = req
            let { id } = params
            let err = validationResult(req)
            if (!err.isEmpty()) {
                console.log(err.mapped())
                // you stop here 
                throw 'Wrong input format'
            }
            
            // validate if already saved
            let bookExist = await Books.findOne({_id: id}).lean()
            if (!bookExist) { throw "Books not exist" }

            let books = await Books.findOneAndUpdate({
                _id: id
            }, {
                ...body
            }, {
                new: true
            })

            response.responseData(res, books)
        } catch (error) {
            response.responseError(res, {
                message: error
            })
        }
    },
    deleteBooks: async (req: Request, res: Response) => {
        try {
            let { params } = req
            let { id } = params
            
            // validate if already saved
            let bookExist = await Books.findOne({_id: id}).lean()
            if (!bookExist) { throw "Books not exist" }

            await Books.findOneAndDelete({
                _id: id
            })

            response.responseData(res, {
                message: "Book deleted successfully"
            })
        } catch (error) {
            response.responseError(res, {
                message: error
            })
        }
    },
}