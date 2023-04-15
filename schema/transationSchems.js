const mongoose = require('mongoose');

const transationSchema = mongoose.Schema(
    {
        invoiceOf: {
            type: mongoose.Schema.Types.ObjectId,
            require: true,
            ref: "Teacher"
        },
        amount: {
            type: Number,
            require: true
        },
        invoiceId: {
            type: String,
            require: true
        },
        courseId: {
            type: String,
            require: true
        },
        remark: {
            type: String,
            require: true
        },

    })

module.exports = mongoose.model("Transation", transationSchema)