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

}

// Update a new identified by user id 
exports.update = (req, res) => {

}
// Delete a user
exports.delete = (req, red) => {

}