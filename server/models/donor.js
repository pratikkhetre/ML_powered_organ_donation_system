const {mongoose} = require('../db/mongoose')

var donorSchema = mongoose.Schema({
    name: {
        type: String,
        minlength: 1,
        required: true,
        trim: true,
    },
    age:{
        type: Number,
        minlength: 1,
        required: true,
    },
    gender: {
        type: String,
        maxlength: 6,
        required: true
    },
    prefered_language: {
        type: String,
    },
    email: {
        type: String,
        maxlength: 50
    },
    phoneNo: {
        type: Number,
        maxlength: 12,
        required: true,
        trim: true,
    },
    emergencyPhoneNo: {
        type: Number,
        maxlength: 12,
        required: true,
        trim: true,
    },
    address: {
        type: String,
        required: true,
        trim: true,
    },
    medicalHistory: {
        type: String,
        maxlength: 750,
        required: true,
        trim: true,
    },
    familyHistory: {
        type: String,
        maxlength: 750,
        required: true,
        trim: true,
    },
    currentMedication: {
        type: String,
        maxlength: 750,
        required: true,
        trim: true,
    },
    immunizationRecord: {
        type: String,
        maxlength: 750,
        required: true,
        trim: true,
    },
    physicianName: {
        type: String,
        minlength: 1,
        required: true,
        trim: true,
    },
    physicianContact: {
        type: String,
        minlength: 1,
        required: true,
        trim: true,
    },
    bloodGroup:{
        type: String,
        minlength:1,
        trim: true,
        required: true
    },
    sCr:{
        type: String,
        minlength:1,
        required: true
    },
    eGFR:{
        type: String,
        minlength:1,
        required: true
    },
    HbA1c:{
        type: String,
        minlength:1,
        required: true
    },
    bloodCellCount:{
        type: String,
        minlength:1,
        required: true
    },
    diabetesMillitus:{
        type: String,
        minlength:1,
        required: true
    },
    hemoglobin:{
        type: String,
        minlength:1,
        required: true
    },
    pusCell:{
        type: String,
        minlength:1,
        required: true
    },
    albunimDisorderSeverity:{
        type: String,
        minlength:1,
        required: true
    },
    appet:{
        type: String,
        minlength:1,
        required: true
    },
    hospital: {
        type: String,
        minlength: 1,
        trim: true,
    },
    resultCluster: {
        type: String,
        minlength: 1,
    },
    insertedDate: {
        type: Date,
        default: Date.now
    }
})

var Donor = mongoose.model('donors', donorSchema)

module.exports = {Donor}