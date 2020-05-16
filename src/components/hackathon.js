import firestore from "./Firestore.js";

export default class Hackathon {

    constructor(input) {
        if ("id" in input) {
            this.createHackathonFromId(input.id)
        } else {
            this.populateFields(
                input.email,
                input.password,
                input.name,
                input.start,
                input.end,
                input.location,
                input.budget,
                {},
                []
            )
            this.id = null;
        }
    }

    // This constructor gets the fields from teh database
    createHackathonFromId(id) {
        this.id = id;
        const db = firestore.firestore();
        const hackathonRef = db.collection('hackathons').doc(this.id);
        hackathonRef.get().then(doc => {
            if (!doc.exists) {
                console.log('No such document!');
            } else {
                let data = doc.data();
                this.populateFields(
                    data.email,
                    data.password,
                    data.name,
                    data.start,
                    data.end,
                    data.location,
                    data.budget,
                    data.applications,
                    data.prizes
                )
            }
        }).catch(err => {
            console.log('Error getting document', err);
        });
    }

    populateFields(email, password, name, start, end, location, budget, applications, prizes) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.start = start;
        this.end = end;
        this.location = location;
        this.budget = budget;
        this.applications = applications;
        this.prizes = prizes;
    }

    async postToDB() {
        const db = firestore.firestore();
        //Query the db
        const hackRef = await db.collection("hackathons").add({
            email: this.email,
            name: this.name,
            start: this.start,
            end: this.end,
            budget: this.budget,
            prizes: this.prizes,
            location: this.location,
            applications: this.applications
        });
        this.id = hackRef.id;
        console.log("New hackathon: " + this.id + ". Submitted to the db!");
        return hackRef;
    }

    acceptReject(userID, accept = true) {
        const db = firestore.firestore();
        console.log("Hack ID: " + this.id);
        const hackathonRef = db.collection('hackathons').doc(this.id);
        hackathonRef.get().then(doc => {
            if (!doc.exists) {
                console.log('No such document!');
            } else {
                // Get hackathon document
                console.log('Document data:', doc.data());
                let data = doc.data();
                let apps = data.applications;
                apps[this.email] = accept ? 'accepted' : 'rejected';
                hackathonRef.set({
                    "applications": apps
                }, { merge: true });

                // This is where you would send an email to the user
            }
        }).catch(err => {
            console.log('Error getting document', err);
        });
    }
}