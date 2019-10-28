const axios = require('axios')

async function foodsearch(input, page = 1){
    const response = await axios.post('https://api.nal.usda.gov/fdc/v1/search?api_key=oIbSq6bzsa0JDZ9pQFbwu5r3VOckChzNCjbz2JiN', {
        generalSearchInput:`${input}`,
        requireAllWords: "true",
        page:`${page}`
    })
    return response.data.foods;

}
module.exports = foodsearch;