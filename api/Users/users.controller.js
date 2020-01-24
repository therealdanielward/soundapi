var Users = require('./users.dao');

exports.createUser = function (req, res, next) {
    var User = {
        title: req.body.title,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        login: req.body.login,
        password: req.body.password,
        birthday: req.body.birthday,
        location: req.body.location,
        createdDate: req.body.createdDate,
    };

    Users.create(User, function(err, User) {
        if(err) {
            res.json({
                error : err
            })
        }
        res.json({
            message : "User created successfully"
        })
    })
}

exports.getUsers = function(req, res, next) {
    Users.get({}, function(err, Users) {
        if(err) {
            res.json({
                error: err
            })
        }
        res.json({
            Users: Users
        })
    })
}

exports.getUser = function(req, res, next) {
    Users.get({name: req.params.name}, function(err, Users) {
        if(err) {
            res.json({
                error: err
            })
        }
        res.json({
            Users: Users
        })
    })
}

exports.updateUser = function(req, res, next) {
    var User = {
        title: req.body.title,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        login: req.body.login,
        password: req.body.password,
        birthday: req.body.birthday,
        location: req.body.location,
        createdDate: req.body.createdDate,
    };
    Users.update({_id: req.params.id}, User, function(err, User) {
        if(err) {
            res.json({
                error : err
            })
        }
        res.json({
            message : "User updated successfully"
        })
    })
}

exports.removeUser = function(req, res, next) {
    Users.delete({_id: req.params.id}, function(err, User) {
        if(err) {
            res.json({
                error : err
            })
        }
        res.json({
            message : "User deleted successfully"
        })
    })
}