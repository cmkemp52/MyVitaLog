const axios = require('axios')

async function foodData(input){
    const response = await axios.get(`https://api.nal.usda.gov/fdc/v1/${input}?api_key=oIbSq6bzsa0JDZ9pQFbwu5r3VOckChzNCjbz2JiN`)

    return response.data;
}
module.exports = foodData;