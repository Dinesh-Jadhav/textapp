exports.getallusers = function() {
    return function(req, res) {
        var result = {};
        if (req.query.token != req.session.token.token) {
            result.error = true;
            result.data = " No valid token provided";
            res.send(JSON.stringify(result));
        } else {
            db.collection('users').find().toArray(function(err, row) {
                if (err) throw err;
                result.error = false;
                console.log(row);
                result.data = row;
                res.send(JSON.stringify(result));
            })
        }
    }
}

exports.addnewusers = function(crypto) {
    return function(req, res) {
        console.log()
        var result = {};
        if (req.session.token.token == "" || req.session.token.token == undefined) {
            result.error = true;
            result.data = " No valid user";
            res.send(JSON.stringify(result));
        } else if (req.body.token != req.session.token.token) {
            result.error = true;
            result.data = " No valid token provided";
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
        } else if (req.body.username == null) {
            result.error = true;
            result.data = " Username not provided";
            res.send(JSON.stringify(result));
        } else if (req.body.password == null) {
            result.error = true;
            result.data = "Password not provided";
            res.send(JSON.stringify(result));
        } else if (req.body.status == null) {
            result.error = true;
            result.data = " Status not provided";
            res.send(JSON.stringify(result));
        } else if (req.body.type == null) {
            result.error = true;
            result.data = " USer type not provided";
            res.send(JSON.stringify(result));
        } else
        if (req.body.image_path == null) {
            result.error = true;
            result.data = " Image path not provided";
            res.send(JSON.stringify(result));
        } else {
            db.collection('users').find({ username: req.body.username }).toArray(function(err, row) {
                if (err) {
                    result.error = true;
                    result.data = "somthing going wrong";
                    res.send(JSON.stringify(result));
                    return;
                } else {
                    console.log(row);
                    if (row.length > 0) {
                        result.error = true;
                        result.data = "Username already exist";
                        res.send(JSON.stringify(result));
                        return;
                    } else {
                        var record = {
                            first_name: req.body.first_name,
                            last_name: req.body.last_name,
                            email: req.body.email,
                            user_group: req.body.user_group,
                            password: crypto.createHash('sha256').update(req.body.password).digest('base64'),
                            mobile: req.body.mobile_number,
                            username: req.body.username,
                            image_path: req.body.image_path,
                            type: req.body.type,
                            status: req.body.status
                        }
                        db.collection('users').insert(record, function(err, row) {
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


exports.deleteuser = function(ObjectId) {
    return function(req, res) {
        var result = {};
        console.log(req.session.token.token);
        if (req.query.token != req.session.token.token) {
            result.error = true;
            result.data = " No valid user";
            res.send(JSON.stringify(result));
            return;
        } else if (req.params.id == null) {
            result.error = true;
            result.data = " userID not provided";
            res.send(JSON.stringify(result));
        } else {
     
            var myId = req.params.id;
            db.collection('users').deleteOne({ "_id": ObjectId(myId) }, function(err, obj) {
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


exports.getuserdetails = function(ObjectId) {
    return function(req, res) {
        var result = {};
        if (req.headers.token != req.session.token.token) {
            result.error = true;
            result.data = " No valid user";
            res.send(JSON.stringify(result));
            return;
        } else if (req.params.id == null) {
            result.error = true;
            result.data = " userID not provided";
            res.send(JSON.stringify(result));
        } else {
            var myId = req.params.id;
            db.collection('users').findOne({ "_id": ObjectId(myId) }, function(err, row) {
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

exports.updatedetails = function(ObjectId,crypto) {
    return function(req, res) {
        var result = {};
        console.log(req.body);
        if (req.body.token != req.session.token.token) {
            result.error = true;
            result.data = " No valid user";
            res.send(JSON.stringify(result));
            return;
        } else if (req.params.id == null) {
            result.error = true;
            result.data = " userID not provided";
            res.send(JSON.stringify(result));
        }
        if (req.body.first_name == null) {
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
        } else if (req.body.username == null) {
            result.error = true;
            result.data = " Username not provided";
            res.send(JSON.stringify(result));
        } else if (req.body.status == null) {
            result.error = true;
            result.data = " Status not provided";
            res.send(JSON.stringify(result));
        } else
        /*if(req.body.image_path == null){
               result.error = true;
              result.data = " Image path not provided";
              res.send(JSON.stringify(result));
          }else*/
        {



            var myId = req.params.id;
            var newvalues = {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                mobile: req.body.mobile_number,
                username: req.body.username,
                status: req.body.status,
                image_path: req.body.image_path
            }

            if(req.body.is_updated==1){
               newvalues.password = crypto.createHash('sha256').update(req.body.password).digest('base64');
                }else{
                 newvalues.password = req.body.password;
                } 

            db.collection('users').updateOne({ "_id": ObjectId(myId) }, newvalues, function(err, row) {
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

exports.login = function(ObjectId,crypto) {
    return function(req, res) {
        sess = req.session;
        var username = req.body.username;
        var password = req.body.password;
        console.log(username, password);
        var result = {};
        if ((username == null)) {
            result.error = true;
            result.data = "Email id not provided";
            res.send(JSON.stringify(result));
            return;
        } else if (password == null) {
            result.error = true;
            result.data = "Password not provided";
            res.send(JSON.stringify(result));
            return;
        } else {
            db.collection('users').find({ "username": username, "password": crypto.createHash('sha256').update(password).digest('base64') }).toArray(function(err, row) {
                console.log(row.length);
                if ((row == null) || row.length == 0) {
                    result.error = true;
                    result.data = "User not found";
                    res.send(JSON.stringify(result));
                    return;
                } else {
                    console.log(row[0]);
                    console.log(row[0].status);
                    if (row[0].status == 0) {
                        console.log("here");
                        result.error = true;
                        result.data = "User Not allowed to login";
                        res.send(JSON.stringify(result));
                        return;
                    } else {
                        sess.userID = row[0]._id;
                        db.collection('users').updateOne({ "_id": ObjectId(row[0]._id)},{$set: {online: 1} }, function(err, row) {
                           if (err) {
                               result.error = true;
                               result.data = " somthing going wrong";
                               res.send(JSON.stringify(result));
                               return;
                           } else {
                              // console.log(row);
                               }
                           })
                        sess.userPrivilege = 2;
                        sess.userLevel = "User";
                        var data = {
                            id: row[0]._id,
                            username: row[0].username,
                            first_name: row[0].first_name,
                            last_name: row[0].last_name,
                            mobile: row[0].mobile,
                            email: row[0].email,
                            image: row[0].image_path,
                            user_group: row[0].user_group
                        }
                        result.error = false;
                        result.data = data;
                        res.send(JSON.stringify(result));
                        return;
                    }
                }
            });
        }
    };
}
exports.logout = function(ObjectId) {
   return function(req, res) {
        result = {};
        db.collection('users').updateOne({ "_id": ObjectId(req.session.userID)},{$set: {online: 0} }, function(err, row) {
                           if (err) {
                               result.error = true;
                               result.data = " somthing going wrong";
                               res.send(JSON.stringify(result));
                               return;
                           } else {
                              req.session = "";
                              result.error = false;
                              result.data = "Log out successfully";
                              res.send(JSON.stringify(result));
                               }
                           })
       
   }
}