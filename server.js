const express = require('express');
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
// added next line
const jwt = require('jsonwebtoken');

const userService = require("./user-service.js");

const HTTP_PORT = process.env.PORT || 8080;

// added next 3 lines
const passport = require("passport");
app.use(passport.initialize());
passport.use(strategy);

app.use(express.json());
app.use(cors());



app.post("/api/user/register", (req, res) => {
    userService.registerUser(req.body)
    .then((msg) => {
        res.json({ "message": msg });
    }).catch((msg) => {
        res.status(422).json({ "message": msg });
    });
});

app.post("/api/user/login", (req, res) => {
    const { email, password } = req.body;
    userService.checkUser(email, password)
      .then(user => {
        // Generate payload object for JWT
        const payload = { _id: user._id, userName: user.userName };
        // Sign the payload with JWT_SECRET
        const token = jwt.sign(payload, process.env.JWT_SECRET);
        // Include token in the response message
        res.json({ message: { token } });
      })
      .catch(msg => {
        res.status(422).json({ message: msg });
      });
  });
  
/*app.post("/api/user/login", (req, res) => {
    userService.checkUser(req.body)
    .then((user) => {
        res.json({ "message": "login successful"});
    }).catch(msg => {
        res.status(422).json({ "message": msg });
    });
});*/

//added this to the routes :passport.authenticate('jwt', { session: false })
app.get("/api/user/favourites", passport.authenticate('jwt', { session: false }), (req, res) => {
    userService.getFavourites(req.user._id)
    .then(data => {
        res.json(data);
    }).catch(msg => {
        res.status(422).json({ error: msg });
    })

});

app.put("/api/user/favourites/:id", passport.authenticate('jwt', { session: false }), (req, res) => {
    userService.addFavourite(req.user._id, req.params.id)
    .then(data => {
        res.json(data)
    }).catch(msg => {
        res.status(422).json({ error: msg });
    })
});

app.delete("/api/user/favourites/:id", passport.authenticate('jwt', { session: false }), (req, res) => {
    userService.removeFavourite(req.user._id, req.params.id)
    .then(data => {
        res.json(data)
    }).catch(msg => {
        res.status(422).json({ error: msg });
    })
});

app.get("/api/user/history", passport.authenticate('jwt', { session: false }), (req, res) => {
    userService.getHistory(req.user._id)
    .then(data => {
        res.json(data);
    }).catch(msg => {
        res.status(422).json({ error: msg });
    })

});

app.put("/api/user/history/:id", passport.authenticate('jwt', { session: false }), (req, res) => {
    userService.addHistory(req.user._id, req.params.id)
    .then(data => {
        res.json(data)
    }).catch(msg => {
        res.status(422).json({ error: msg });
    })
});

app.delete("/api/user/history/:id", passport.authenticate('jwt', { session: false }), (req, res) => {
    userService.removeHistory(req.user._id, req.params.id)
    .then(data => {
        res.json(data)
    }).catch(msg => {
        res.status(422).json({ error: msg });
    })
});

userService.connect()
.then(() => {
    app.listen(HTTP_PORT, () => { console.log("API listening on: " + HTTP_PORT) });
})
.catch((err) => {
    console.log("unable to start the server: " + err);
    process.exit();
});