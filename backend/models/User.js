const etsy = (sequelize, type) => {
    return sequelize.define('user', {
    name:{
        type: String,
        required: true
    },
    email:{
        type:String,
        required: true,
        allowNull: false
    },
    password:{
        type : String,
        required: true
    }
});
};


module.exports = etsy;