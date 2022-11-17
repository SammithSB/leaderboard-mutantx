const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
	email : {
		type : String,
		required : true,
		unique : true
	},
	password : {
		type : String,
		required : true
	},
	name : {
		type: String,
		required: true
	},
	Score : {
		type: Number,
		default: 0
	},
	Rank: {
		type: Number,
		default: 0
	},
	isAdmin : {
		type: Boolean,
		default: false
	},
	ScoreChange : {
		type: Number,
		default: 0
	},
	scoreHistory : {
		type: Array,
		default: []
	},
	RankChange : {
		type: Number,
		default: 0
	},
	rankHistory : {
		type: Array,
		default: []
	}
});

UserSchema.methods.isValidPassword = async function (password) {
	const user = this;
	const compare = await bcrypt.compare(password, user.password);
	return compare;
}
const UserModel = mongoose.model('user', UserSchema);
module.exports = UserModel;