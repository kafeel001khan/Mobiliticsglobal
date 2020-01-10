const express = require('express')
const mongoose = require('mongoose')
require('./db/mongoose')
const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

const User = mongoose.model('User',{battery_id: {
    type: Number,
    trim: true,
	default: 1
},
timestamp: {
    type: Number,
    trim: true,
	default: 1
},
voltage: {
    type: Number,
    trim: true,
	default: 1
},
temperature: {
    type: Number,
    trim: true,
	default: 1
},
current: {
    type: Number,
    trim: true,
	default: 1
},
SOH: {
    type: Number,
    trim: true,
	default: 1
},
SOC: {
    type: Number,
    trim: true,
	default: 1
},
stat_level: {
    type: String,
    trim: true,
	default: 1
}
})

app.get('/users', (req, res) => {
    console.log(req.query);
    const user = new User(req.query)

    User.find({}).then((users) => {
        if(users[0])
        {
            User.findByIdAndUpdate(users[0]._id, req.query, {new: true}, function(err, model){
                res.status(201).send(model)
            })
        }
        else
        {
            user.save().then(() => {
                res.status(201).send(user)
            }).catch((e) => {
                res.status(400).send(e)
            })
        }
    }).catch((e) => {
        res.status(500).send()
    })

})


app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
