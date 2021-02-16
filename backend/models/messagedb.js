const mongoose = require('mongoose')
const slugify = require('slugify')

const messageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    sendedAt: {
        type: Date,
        default: Date.now
    },
    slug: {
        type: String,
        required: true,
        unique: true
    }
})

messageSchema.pre('validate', function (next) {
    if (this.name) {
        this.slug = slugify(this.message.slice(0,20), { lower: true, strict: true })
    }
    next()
})

module.exports = mongoose.model('Message', messageSchema)