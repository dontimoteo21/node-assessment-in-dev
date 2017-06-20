const data = require('./userData.json');

module.exports = {
  getUsers: function(req, res, next) {
    let q = req.query
    var results = []

    //query for favorites
    if (q.favorites) {
      for (let i = 0; i < data.length; i++) {      
        if (data[i].favorites.indexOf(req.query.favorites) !== -1) {      
          results.push(data[i])        
        }      
      }

      //query by age less than
    } else if (q.age) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].age < q.age) {
          results.push(data[i])
        }
      }

      //query by last name
    } else if (q.lastname) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].last_name == q.lastname) {
          results.push(data[i])
        }
      }

      //query by email
    } else if (q.email) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].email == q.email) {
          results.push(data[i])
          return res.status(200).send(results[0])
        }
      }

      //return all users
    } else {
      results = data
    }
    return res.status(200).send(results)
  },

  getUserById: function(req, res, next) {
    let id = req.params.id
    for (let i = 0; i < data.length; i++) {
      if (data[i].id == id) {
        return res.status(200).json(data[i])
      }
    }
    return res.status(404).json(null)
  },

  getAdmins: function(req, res, next) {
    let admins = []
    for (let i = 0; i < data.length; i++) {
      if (data[i].type == 'admin') {
        admins.push(data[i])
      }
    }
    return res.status(200).json(admins);
  },

  getNonAdmins: function(req, res, next) {
    let nonAdmins = []
    for (let i = 0; i < data.length; i++) {
      if (data[i].type != 'admin') {
        nonAdmins.push(data[i])
      }
    }
    return res.status(200).json(nonAdmins)
  },

  getUsersByType: function(req, res, next) {
    let type = req.params.type
    let results = []
    for (let i = 0; i < data.length; i++) {
      if (data[i].type == type) {
        results.push(data[i])
      }
    }
    return res.status(200).json(results)
  },

  updateUserById: function(req, res, next) {
    let id = req.params.id
    for (let i = 0; i < data.length; i++) {
      if (data[i].id == id) {
        data[i] = req.body
      }
    }
    return res.status(200).json(data);
  },

  addUser: function(req, res, next) {
    let id = data.length + 1
    req.body.id = id;
    data.push(req.body)
    return res.status(200).json(data)
  },

  deleteUserById: function(req, res, next) {
    let id = req.params.id
    for (let i = 0; i < data.length; i++) {
      if (data[i].id == id) {
        data.splice(i--, 1)
        return res.status(200).json(data)
      }
    }
  }
}