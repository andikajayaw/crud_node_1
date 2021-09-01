var Userdb = require('../model/model');

//c create and save new user
exports.create = (req, res) => {
    // validate request
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty" })
        return;
    }

    console.log(req);

    // new user
    const user = new Userdb({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status
    });

    // save user in the database
    user.save(user).then(data => {
        res.send(data)
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occured while creating a operation"
        })
    })
}

// retrieve and return all users/retrive and return a single user
exports.find = (req, res) => {
    Userdb.find().then(user => {
        res.send(user);
    }).catch(err => {
        res.status(500).send({ message: err.message || "Error" });
    })
}

// Update a new identified by user id 
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({ message: "Data update cannot be empty" });
    }
    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                req.status(404).send({ message: 'User not found' })
            } else {
                res.send(data);
            }
        }).catch(err => {
            res.status(500).send({ message: err.message || "Error" })
        })
}
// Delete a user
exports.delete = (req, res) => {
    const id = req.params.id;

    Userdb.findByIdAndDelete(id).then(data => {
        if (!data) {
            res.status(404).send({ message: 'User not found' })
        } else {
            res.send({
                message: "User was deleted"
            })
        }
    }).catch(err => {
        res.status(500).send({
            message: "Error"
        })
    })
}