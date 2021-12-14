
const registerHandler = (req,res ,knex, bcrypt) => {
const {email, name , password} = req.body;
if(!email || !name || !password){return res.status(400).json('incorrect form submission')}
    const hash = bcrypt.hashSync(password);

    knex.transaction(trx => {
        trx.insert({
            hash:hash,
            email:email
        })  //all we did is move the return knex(now trx) block within a then where first it updates the login table with the hash and email. a transaction is a way to confirm that if 1 thing goes wrong and other thing goes right, both fail to prevent inconsistency.
        .into('login')
        .returning('email')
        .then(loginEmail => {
            return trx('users')
            .returning('*') //knex already has a way to return 
            .insert({
                email:loginEmail[0],
                name:name
            }).then(user => {
                res.json(user[0]) // OKAY SO ANOTHER ERROR HERE. I WASNT GETTING THE NAME ON MY SITE, THOUGHT I WOULD COPY HIS CODE. BUT I FIXED IT. its hm, well you see, i gotta return knex, thats 1 error i think(im not gonna check cause what if it stops working) and the other error was, i had to return user[0], because cmon, its an dict within an array, it cant really access the stuffs in it like that.
            })
        })
        .then(trx.commit)
        .catch(trx.rollback)

    })
    .catch(err => res.status(400).json('unable to connect')) // res.json(database.users[database.users.length-1]) //wow so -1 index doesnt work in js. Sad.
}

module.exports = {
    registerHandler : registerHandler
}