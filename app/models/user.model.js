const mongoose = require('mongoose');
const extendSchema = require('mongoose-extend-schema');
 
const UserSchema = new mongoose.Schema({
  firstname: {type: String, required: true},
  lastname: {type: String, required: true},
  email: {type: String, unique: true, required: true},
  password: {type: String, required: true},
  phone_number: {type: String, unique: true, required: true},
  gender: {type: String, required: true},
  adresse: {type: String, required: true}
  
});
 
// Admin Extend UserSchema
const AdminSchema = extendSchema(UserSchema, {
  
});
// Doctor Extend UserSchema
const DoctorSchema = extendSchema(UserSchema, {
  specialité: {type: String, required: true}
});
// Patient Extend UserSchema
const PatientSchema = extendSchema(UserSchema, {
  
});
 

const Admin = mongoose.model('admins', AdminSchema);
const Doctor = mongoose.model('doctors', DoctorSchema);
const Patient = mongoose.model('patients', PatientSchema);
 
// const john = new User({
//   email: 'user@site.com',
//   passwordHash: 'bla-bla-bla',
//   firstname: 'John'
// });
 
// john.save();
 
// const admin = new Admin({
//   email: 'admidn@site.com',
//   passwordHash: 'bdla-bla-bla',
//   firstname: 'Hdenry',
//   lastname: 'Hadrdcore',
//   phone: '+555-5555-55',
//   specialité:'cardiologue'
// });
 
// admin.save();
// Oops! Error 'phone' is required




   
module.exports = {Admin,Patient,Doctor};