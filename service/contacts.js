exports.getallcontacts = function() {
    return function(req, res) {
        var result = {};
        console.log(req.query);
        if (req.query.token != req.session.token.token) {
            result.error = false;
            result.data = " No vallide token provided";
            res.send(JSON.stringify(result));
        } else {
            db.collection('contact').find().toArray(function(err, row) {
                if (err) throw err;
                result.error = false;
                result.data = row;
                res.send(JSON.stringify(result));
            })
        }
    }
}

exports.addnewcontact = function(crypto) {
    return function(req, res) {
        console.log(req.body);
        console.log(req.body.token);
        console.log(req.session);
        var result = {};
        if (req.session.token.token == "" || req.session.token.token == undefined) {
            result.error = false;
            result.data = " No vallide user";
            res.send(JSON.stringify(result));
        } else if (req.body.token != req.session.token.token) {
            result.error = false;
            result.data = " No vallide token provided";
            res.send(JSON.stringify(result));
        } else if (req.body.first_name == null) {
            result.error = true;
            result.data = " First Name not provided";
            res.send(JSON.stringify(result));
        } else if (req.body.last_name == null) {
            result.error = true;
            result.data = " Last Name not provided";
            res.send(JSON.stringify(result));
        } else if (req.body.email == null) {
            result.error = true;
            result.data = " Email not provided";
            res.send(JSON.stringify(result));
        } else if (req.body.mobile_number == null) {
            result.error = true;
            result.data = " Mobile Number not provided";
            res.send(JSON.stringify(result));
        } else if (req.body.status == null) {
            result.error = true;
            result.data = " Status not provided";
            res.send(JSON.stringify(result));
        } else {
            db.collection('contact').find({ email: req.body.email }).toArray(function(err, row) {
                if (err) {
                    result.error = true;
                    result.data = "somthing going wrong";
                    res.send(JSON.stringify(result));
                    return;
                } else {
                    if (row.length > 0) {
                        result.error = true;
                        result.data = "email already exist";
                        res.send(JSON.stringify(result));
                        return;
                    } else {
                        var record = {
                            first_name: req.body.first_name,
                            last_name: req.body.last_name,
                            email: req.body.email,
                            mobile: req.body.mobile_number,
                            image_path: req.body.image_path,
                            status: req.body.status
                        }
                        db.collection('contact').insert(record, function(err, row) {
                            if (err) {
                                result.error = true;
                                result.data = "error in insert";
                                res.send(JSON.stringify(result));
                                return;
                            } else {
                                result.error = false;
                                result.data = "success";
                                res.send(JSON.stringify(result));
                                return;
                            }
                        })
                    }
                }
            })
        }
    }
}

exports.deletecontact = function(ObjectId) {
    return function(req, res) {
        console.log(req)
        var result = {};
        if (req.query.token != req.session.token.token) {
            result.error = true;
            result.data = " No vallide user";
            res.send(JSON.stringify(result));
            return;
        } else if (req.params.id == null) {
            result.error = true;
            result.data = "Id not provided";
            res.send(JSON.stringify(result));
            return;
        } else {
            var myId = req.params.id;
            db.collection('contact').deleteOne({ "_id": ObjectId(myId) }, function(err, obj) {
                if (err) {
                    result.error = true;
                    result.data = " somthing going wrong";
                    res.send(JSON.stringify(result));
                    return;
                } else {
                    result.error = false;
                    result.data = " deleted";
                    res.send(JSON.stringify(result));
                    return;
                }
            });
        }
    }
}

exports.getcontactdetails = function(ObjectId) {
    return function(req, res) {
        var result = {};
        if (req.headers.token != req.session.token.token) {
            result.error = true;
            result.data = " No vallide user";
            res.send(JSON.stringify(result));
            return;
        } else if (req.params.id == null) {
            result.error = true;
            result.data = "Id not provided";
            res.send(JSON.stringify(result));
            return;
        } else {
            var myId = req.params.id;
            db.collection('contact').findOne({ "_id": ObjectId(myId) }, function(err, row) {
                if (err) {
                    result.error = true;
                    result.data = " somthing going wrong";
                    res.send(JSON.stringify(result));
                    return;
                } else {
                    result.error = false;
                    result.data = row;
                    res.send(JSON.stringify(result));
                    return;
                }
            });
        }
    }
}

exports.updatecontact = function(ObjectId) {
    return function(req, res) {
        var result = {};
        if (req.body.token != req.session.token.token) {
            result.error = true;
            result.data = " No vallide user";
            res.send(JSON.stringify(result));
            return;
        } else if (req.body.first_name == null) {
            result.error = true;
            result.data = " First Name not provided";
            res.send(JSON.stringify(result));
        } else if (req.body.last_name == null) {
            result.error = true;
            result.data = " Last Name not provided";
            res.send(JSON.stringify(result));
        } else if (req.body.email == null) {
            result.error = true;
            result.data = " Email not provided";
            res.send(JSON.stringify(result));
        } else if (req.body.mobile_number == null) {
            result.error = true;
            result.data = " Mobile Number not provided";
            res.send(JSON.stringify(result));
        // } else if (req.body.image_path == null) {
        //     result.error = true;
        //     result.data = " Image not provided";
        //     res.send(JSON.stringify(result));
        // } else if (req.body.status == null) {
            result.error = true;
            result.data = " Status not provided";
            res.send(JSON.stringify(result));
        } else {
            var myId = req.params.id;
            var newvalues = {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                mobile: req.body.mobile_number,
                image_path: req.body.image_path,
                status: req.body.status
            }
            db.collection('contact').updateOne({ "_id": ObjectId(myId) }, newvalues, function(err, row) {
                if (err) {
                    result.error = true;
                    result.data = " somthing going wrong";
                    res.send(JSON.stringify(result));
                    return;
                } else {
                    result.error = false;
                    console.log(row);
                    result.data = row;
                    res.send(JSON.stringify(result));
                    return;
                }
            });
        }
    }
}
