

const sign = (req,res,knex,bcrypt)=>{

    const {email , password} = req.body;

    if(!email || !password){return res.status(400).json('incorrect form submission')}

    knex.select('hash','email').from('login')
    .where('email','=',email)
    .then(data => {
        const isvalid =bcrypt.compareSync(password , data[0].hash);
        console.log(isvalid);
        if (isvalid){
           return knex.select('*')
            .from('users')
            .where('email','=',email)
            .then(user=>{res.json(user[0])})
            .catch(err => res.status(400).json('Unable to get user'))
        }else{
            res.status(400).json('wrong credentials');
        }
    })
    .catch(err => res.status(400).json('wrong credentials'))
}

module.exports = {
    sign:sign
}