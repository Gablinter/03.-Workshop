const router = require("express").Router();
const cookieParser = require("cookie-parser");
let userService = require('../services/userService');

let bcrypt = require('bcrypt');
let jwt = require('../lib/jwt')

let { SECRET } = require('../constants')

router.get("/register", (req, res) => {
    res.render("user/register");
});


router.post("/register", async (req, res) => {
    let { username, password, repeatPassword } = { username: req.body.username, password: req.body.password, repeatPassword: req.body.repeatPassword };
    if (password !== repeatPassword) {
        res.send("<script>alert(`The passwords don't match`)</script >");
        res.end()
    } else {
        res.redirect('user/login');
        let cryptedPassword = await bcrypt.hash(password, 10);
        userService.create({ username, password: cryptedPassword });
    }
});

// Login

router.get("/login", async (req, res) => {
    res.render("user/login");
});



router.post('/login', async (req, res) => {
    const username = req.body.username;
    const user = await userService.getByUsername(username)
    const payload = {
        _id: user._id,
        username: user.username,
    };

    if (user.length === 0) {
        console.log('Invalid user')
    } else {
        const usersPassword = user[0].password
        const password = req.body.password;
        const isValid = await bcrypt.compareSync(password, usersPassword)
        if (isValid) {
            

            const token = await jwt.sign(payload, SECRET, { expiresIn: "3d" });

            res.cookie('auth', token)



            res.redirect('/')
        } else {
            res.send("<script>alert(`Incorrect username or password`)</script >");
        }
    }
})

module.exports = router;
