import fs from 'fs'
import MainList from '../models/MainListModel'
import { log } from 'console'
import AttackModel from '../models/TypesAttackModel'




export const seedMain = async () => {
    try {
        let number = 0
        const data = await JSON.parse(fs.readFileSync('./data.json', 'utf-8'))
        for (const event of data) {
            if (!event || !event.iyear || !event.imonth || !event.city || !event.latitude || !event.longitude || !event.attacktype1_txt || !event.gname || !event.nkill || !event.nwound) {
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
                casualties: (event.nkill + event.nwound)
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
        console.error('Error attack types:', err);
        throw err;
    }
};
