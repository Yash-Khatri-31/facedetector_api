const profileid = (req,res,knex) => {
    const{id} = req.params;
    knex.select('*').from('users').where({
        id:id
    })
    .then(user=>{
        if(user.length){res.json(user[0])}
        else{res.status(400).json('no such id')}
    }
)
}

module.exports = {
    profileid:profileid
}