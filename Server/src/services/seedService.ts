import fs from 'fs'
import MainList from '../models/MainListModel'
import { log } from 'console'
import AttackModel from '../models/TypesAttackModel'
import Organization from '../models/OrganizationModel'
import Location from '../models/LocationModel'
import Year from '../models/YearModel'




export const seedMain = async () => {
    try {
        let number = 0
        const data = await JSON.parse(fs.readFileSync('./data.json', 'utf-8'))
        for (const event of data) {
            if (!event || !event.iyear || !event.imonth || !event.city || !event.latitude || !event.longitude || !event.attacktype1_txt || !event.gname ) {
                console.log("Worg");
                continue
            }
            const newMainList = new MainList({
                year: event.iyear,
                month: event.imonth,
                city: event.city,
                lat: event.latitude,
                long: event.longitude,
                attacktype: event.attacktype1_txt,
                organization: event.gname,
                casualties: (event.nkill || 0 + event.nwound || 0).toFixed()
            })
            number ++
            await newMainList.save()
            console.log(number);
            console.log("Main list Saved successfully");     
        }
    } catch (err) {
        console.error(err)
        throw err
    }
}






export const seedAttack = async () => {
    try {
        let number = 0;
        const data = await MainList.find({}).lean();
        for (const event of data) {
            const attackModel = await AttackModel.findOne({ name: event.attacktype });

            if (!attackModel) {
                const newTypesAttack = new AttackModel({
                    name: event.attacktype,
                    casualties: event.casualties,
                    listEvents: [event._id] 
                });
                await newTypesAttack.save(); 
                number++; 
                console.log(`Saved new attack type`);
            } else {
                await attackModel.updateOne({
                    $push: { listEvents: event._id }, 
                    $inc: { casualties: event.casualties } 
                });
                console.log(`Updated existing attack type`);
            }
        }
        console.log(`new attack types saved successfully`);
    } catch (err) {
        console.log('Error attack types',err);
        throw err;
    }
};
export const seedOrganization = async () => {
    try {
        let number = 0;
        const data = await MainList.find({}).lean();
        for (const event of data) {
            const organizationModel = await Organization.findOne({ name: event.organization });
            if (!organizationModel) {
                const newOrganization = new Organization({
                    name: event.organization,
                    casualties: event.casualties,
                    listEvents: [event._id] 
                });
                await newOrganization.save(); 
                number++; 
                console.log(`Saved new orgization`);
            } else {
                await organizationModel.updateOne({
                    $push: { listEvents: event._id }, 
                    $inc: { casualties: event.casualties } 
                });
                console.log(`Updated  orgization`);
            }
        }
        console.log(`new organization saved successfully`);
    } catch (err) {
        console.log('Error organization',err);
        throw err;
    }
};

export const seedLocation = async () => {
    try {
        const events = await MainList.find({});
        for (const event of events) {
            const locationData = await Location.findOne({ city: event.city });
            if (!locationData) {
                const newLoction = new Location({
                    city: event.city,
                    casualties: event.casualties,
                    lat: event.lat,
                    long: event.long,
                    events: [{ organization: event.organization, amountEvents: 1 }],
                    listEvents: [event._id]
                });
                await newLoction.save();
                console.log("New location saved successfully");
            } else {
                await locationData.updateOne({
                    $push: { listEvents: event._id },
                    $inc: { casualties: event.casualties }
                });
                const organizationFromDb = locationData.events.find(e => e.organization === event.organization);
                if (!organizationFromDb) {
                    locationData.events.push({ organization: event.organization, amountEvents: 1 });
                } else {
                    organizationFromDb.amountEvents += 1;
                }
                await locationData.save();
                console.log("Location updated successfully");
            }
        }
    } catch (err) {
        console.log("Error to seeding location",err);
    }
};


export const seedYear = async () => {
    try {
        const events = await MainList.find({}); 
        for (const event of events) {
            const yearData = await Year.findOne({ year: event.year });
            if (!yearData) {
                const newYear = new Year({
                    year: event.year,
                    listAmontType: [{ typeAttack: event.attacktype, ampount: 1 }],
                    listOrganization: [{ organization: event.organization, amount: 1 }],
                    listEvents: [event._id] 
                });
                await newYear.save();
                console.log(`Year created successfully.`);
            } else {
                await yearData.updateOne({
                    $push: { listEvents: event._id }
                });

                const typeFromDb = yearData.listAmontType.find(e => e.typeAttack === event.attacktype);
                if (!typeFromDb) {
                    yearData.listAmontType.push({ typeAttack: event.attacktype, ampount: 1 });
                } else {
                    typeFromDb.ampount += 1;
                }
                const orgFromDb = yearData.listOrganization.find(e => e.organization === event.organization);
                if (!orgFromDb) {
                    yearData.listOrganization.push({ organization: event.organization, amount: 1 });
                } else {
                    orgFromDb.amount += 1;
                }
                await yearData.save();
                console.log(`Year updated successfully`);
            }
        }
    } catch (err) {
        console.log("Error to seeding year",err);
    }
};