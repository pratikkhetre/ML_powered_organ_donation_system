const express = require('express')
const body_parser = require('body-parser')
const { Patient } = require('./models/patient')
const { Donor } = require('./models/donor')
const axios = require('axios')
var app = express()

app.set('view engine', 'ejs');

app.use(body_parser.json())
app.use(body_parser.urlencoded({ extended: true }))

app.use(express.static('public'))

app.get('/', (req, res, next) => {
    res.sendFile('index.html')
})

app.post('/register_patient', async(req, res, next) => {
    var body = req.body
    if (body.fname && body.lname && body.age && body.gender && body.language && body.phone && body.emergencyContact && body.address && body.medicalHistory &&
        body.familyHistory && body.medications && body.immunizationRecord && body.insurence && body.bloodGroup && body.scr && body.egfr && body.hba1c && body.hospital) {

        var options = {
            method: 'POST',
            url: 'http://organdonation.pythonanywhere.com/getOrganCluster',
            headers: {
                Accept: '*/*',
                'Content-Type': 'application/json'
            },
            data: {
                scr: body.scr,
                egfr: body.egfr,
                hba1c: body.hba1c
            }
        };

        axios.request(options).then(function(response) {
            var newpatient = new Patient({
                name: body.fname + " " + body.lname,
                age: body.age,
                gender: body.gender,
                prefered_language: body.language,
                email: body.email,
                phoneNo: body.phone,
                emergencyPhoneNo: body.emergencyContact,
                address: body.address,
                medicalHistory: body.medicalHistory,
                familyHistory: body.familyHistory,
                currentMedication: body.medications,
                immunizationRecord: body.immunizationRecord,
                insurence: body.insurence,
                physicianName: body.physicianName,
                physicianContact: body.physicianContact,
                bloodGroup: body.bloodGroup,
                heartRate: body.heartRate,
                respiratoryRate: body.respiratoryRate,
                sCr: body.scr,
                eGFR: body.egfr,
                HbA1c: body.hba1c,
                hospital: body.hospital,
                resultCluster: response.data
            })

            newpatient.save().then((doc) => {
                pid = doc._id;
                res.status(200).send({ "msg": "Patient Registered Successfully", pid })
            }).catch((e) => {
                res.status(400).send('Error while saving record')
            })
        }).catch(function(error) {
            res.status(400).send('Unexpected error occured! Please try again')
        });
    } else {
        res.status(400).send('Fields mark with * are important')
    }
})

app.post('/register_donor', (req, res, next) => {
    var body = req.body
    if (body.fname && body.lname && body.age && body.gender && body.language && body.phone && body.emergencyContact && body.address && body.medicalHistory &&
        body.familyHistory && body.medications && body.immunizationRecord && body.bloodGroup && body.scr && body.egfr && body.hba1c && body.bloodCellCount &&
        body.diabetesMillitus && body.hemoglobin && body.pusCell && body.albunimDisorderSeverity && body.appet && body.hospital) {

        var options = {
            method: 'POST',
            url: 'http://organdonation.pythonanywhere.com/getDiseaseStatus',
            headers: {
                Accept: '*/*',
                'Content-Type': 'application/json'
            },
            data: {
                bloodCellCount: body.bloodCellCount,
                diabetesMillitus: body.diabetesMillitus,
                hemoglobin: body.hemoglobin,
                pusCell: body.pusCell,
                albunimDisorderSeverity: body.albunimDisorderSeverity,
                appet: body.appet
            }
        };

        axios.request(options).then(function(response) {
            if (response.data == 0) {
                var options = {
                    method: 'POST',
                    url: 'http://organdonation.pythonanywhere.com/getOrganCluster',
                    headers: {
                        Accept: '*/*',
                        'Content-Type': 'application/json'
                    },
                    data: {
                        scr: body.scr,
                        egfr: body.egfr,
                        hba1c: body.hba1c
                    }
                };

                axios.request(options).then(function(response) {
                    var newDonor = new Donor({
                        name: body.fname + " " + body.lname,
                        age: body.age,
                        gender: body.gender,
                        prefered_language: body.language,
                        email: body.email,
                        phoneNo: body.phone,
                        emergencyPhoneNo: body.emergencyContact,
                        address: body.address,
                        medicalHistory: body.medicalHistory,
                        familyHistory: body.familyHistory,
                        currentMedication: body.medications,
                        immunizationRecord: body.immunizationRecord,
                        physicianName: body.physicianName,
                        physicianContact: body.physicianContact,
                        bloodGroup: body.bloodGroup,
                        sCr: body.scr,
                        eGFR: body.egfr,
                        HbA1c: body.hba1c,
                        bloodCellCount: body.bloodCellCount,
                        diabetesMillitus: body.diabetesMillitus,
                        hemoglobin: body.hemoglobin,
                        pusCell: body.pusCell,
                        albunimDisorderSeverity: body.albunimDisorderSeverity,
                        appet: body.appet,
                        hospital: body.hospital,
                        resultCluster: response.data
                    })
                    newDonor.save().then((doc) => {
                        donerId = doc._id;
                        res.status(200).send({ "msg": "Donor Registered Successfully", donerId })
                    }).catch((e) => {
                        console.log(e)
                        res.status(400).send('Error while saving record')
                    })
                }).catch(function(error) {
                    console.error(error);
                    res.status(400).send('Unexpected error occured! Please try again')
                });
            } else {
                res.status(400).send("Disease detected. Sorry, we can't register you as a donor!")
            }
        }).catch(function(error) {
            console.error(error);
            res.status(400).send('Unexpected error occured! Please try again')
        });
    } else {
        res.status(400).send('Fields mark with * are important')
    }

})

app.post('/get_donor_list', async(req, res, next) => {
    Donor.find().select('_id name age address bloodGroup insertedDate').then((doc) => {
        res.status(200).send({ "msg": "Donor List fetched", doc})
    }).catch((e) => {
        console.log(e)
        res.status(400).send('Error while fetching donor records')
    })
})

app.get('/get_donor_details/:id', async(req, res, next) => {
    Donor.findById(req.params.id, (err, document) => {
        if (err) {
            console.error(err);
        } else {
            if (document) {
                res.render('donorDetails', { document });
            } else {
                console.log('Document not found');
            }
        }
    })
})

app.post('/get_patient_list', async(req, res, next) => {
    Patient.find().select('_id name age address bloodGroup insertedDate').then((doc) => {
        res.status(200).send({ "msg": "Donor List fetched", doc})
    }).catch((e) => {
        console.log(e)
        res.status(400).send('Error while fetching donor records')
    })
})

app.get('/get_patient_details/:id', async(req, res, next) => {
    Patient.findById(req.params.id, (err, document) => {
        if (err) {
            console.error(err);
        } else {
            if (document) {
                if(document.bloodGroup == 'A+'){ compatibleBloodGroup = ['A+', 'A-', 'O+', 'O-'] }
                if(document.bloodGroup == 'A-'){ compatibleBloodGroup = ['A-', 'O-'] }
                if(document.bloodGroup == 'B+'){ compatibleBloodGroup = ['B+', 'B-', 'O+', 'O-'] }
                if(document.bloodGroup == 'B-'){ compatibleBloodGroup = ['B-', 'O-'] }
                if(document.bloodGroup == 'AB+'){ compatibleBloodGroup = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] }
                if(document.bloodGroup == 'AB-'){ compatibleBloodGroup = ['AB-', 'A-', 'B-', 'O-'] }
                if(document.bloodGroup == 'O+'){ compatibleBloodGroup = ['O+', 'O-'] }
                if(document.bloodGroup == 'O-'){ compatibleBloodGroup = ['O-'] }

                Donor.find({
                    resultCluster: document.resultCluster,
                    bloodGroup: {
                        $in: compatibleBloodGroup
                    }
                }).then((availableDonors) =>{
                    if (availableDonors) {
                        document.donorsList = JSON.stringify(availableDonors)
                        res.render('patientDetails', { document });
                    }
                })
            }
        }
    })
})

app.listen(3000, () => {
    console.log('listening on port 3000')
})