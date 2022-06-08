const axios = require('axios')
const fs = require('fs')
/*
fs.readFile('./qs.json', 'utf-8', (err, jsonString) => {
    if (err) {
        console.log(err)
    } else {
        try {
            const data = JSON.parse(jsonString)
        console.log(data)
        } catch(err) {
            console.log('Error parsing JSON', err)
        }
        
    }  
})
*/
/*
try {
    const jsonString = fs.readFileSync('./test.json', 'utf-8')
    const data = JSON.parse(jsonString)
    console.log(data)
} catch (err) {
    console.log(err)
}
*/

fs.readFile('./qs.json', 'utf-8', async function(err, jsonString) {
    let data = JSON.parse(jsonString)
    for (eachSubject in data) {
        for (eachUni of data[eachSubject]) {
            let name = eachUni.Institution
            let country = eachUni.Location
            let address = name + ", " + country
            let response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
                params: {
                    address: address,
                    key: 'AIzaSyDKJvrzonuv9qzW29p_QTgfbKQfOevoD74'
                }
            })
            let location = response.data.results[0].geometry.location
            let lat = Number(location.lat)
            let lng = Number(location.lng)
            
            eachUni.lat = lat
            eachUni.lng = lng
            fs.writeFile('./qs.json', JSON.stringify(data), err => {
                if (err) {
                    console.log(err)
                }
            })
            
        }
    }
})