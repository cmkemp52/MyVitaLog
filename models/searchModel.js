const axios = require('axios')

async function foodsearch(input, page = 1){
    let results2 = false;
    let results3 = false;
    const response = await axios.post('https://api.nal.usda.gov/fdc/v1/search?api_key=oIbSq6bzsa0JDZ9pQFbwu5r3VOckChzNCjbz2JiN', {
            generalSearchInput:`${input}`,
            requireAllWords: "true",
            pageNumber:`${page}`
            
        })
    const results1 = response.data.foods;
    if(response.data.currentPage<response.data.totalPages){
        const response2 = await axios.post('https://api.nal.usda.gov/fdc/v1/search?api_key=oIbSq6bzsa0JDZ9pQFbwu5r3VOckChzNCjbz2JiN', {
            generalSearchInput:`${input}`,
            requireAllWords: "true",
            pageNumber:`${page+1}`
        })
        results2 = response2.data.foods;
        if(response2.data.currentPage<response2.data.totalPages){
            const response3 = await axios.post('https://api.nal.usda.gov/fdc/v1/search?api_key=oIbSq6bzsa0JDZ9pQFbwu5r3VOckChzNCjbz2JiN', {
                generalSearchInput:`${input}`,
                requireAllWords: "true",
                pageNumber:`${page+2}`
            })
            results3 = response3.data.foods;
        }
    }
    return {results1, results2, results3};

}
module.exports = foodsearch;