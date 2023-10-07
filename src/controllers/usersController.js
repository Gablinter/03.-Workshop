const router = require("express").Router();
let userService = require('../services/userService');
let bcrypt = require('bcrypt')

router.get("/register", (req, res) => {
    res.render("user/register");
});


router.post("/register", async (req, res) => {
    let { username, password, repeatPassword } = { username: req.body.username, password: req.body.password, repeatPassword: req.body.repeatPassword };
    if (password !== repeatPassword) {
        res.send("<script>alert(`The passwords don't match`)</script >");
        res.end()
    } else {
        res.redirect('/');
        let cryptedPassword = await bcrypt.hash(password, 10);
        userService.create({ username, password: cryptedPassword });
    }
});


router.get("/login", async (req, res) => {
    res.render("user/login");
});

router.post('/login', async (req, res) => {
    const username = req.body.username;
    const getByUsername = await userService.getByUsername(username)
    if (getByUsername.length === 0) {
        console.log('Invalid user')
    } else {
        const usersPassword = getByUsername[0].password
        const password = req.body.password;
        const isValid = await bcrypt.compareSync(password, usersPassword)
        if (isValid) {
            res.redirect('/')
        } else {
            res.send("<script>alert(`Incorrect username or password`)</script >");
        }
    }
})

module.exports = router;
