function recommend (data,days){
    console.log(data);
    console.log("this is ", 2000*days);
    let recommendations = {};
    recommendations.calories = 2000*days;
    recommendations.fat = 78*days;
    recommendations.satfat = 20*days;
    recommendations.transfat = 0;
    recommendations.cholesterol = 300*days;
    recommendations.sodium = 2400*days;
    recommendations.carbohydrates = 275*days;
    recommendations.fiber = 28*days;
    recommendations.sugars = 50*days;
    recommendations.protein = 50*days;
    recommendations.calcium = 1300*days;
    recommendations.iron = 18*days;
    data.map(item =>{
        recommendations.calories = recommendations.calories - item.calories;
        recommendations.fat = recommendations.fat - item.fat;
        recommendations.satfat = recommendations.satfat - item.satfat;
        recommendations.transfat = recommendations.transfat - item.transfat;
        recommendations.cholesterol = recommendations.cholesterol - item.cholesterol;
        recommendations.sodium = recommendations.sodium - item.sodium;
        recommendations.carbohydrates = recommendations.carbohydrates - item.carbohydrates;
        recommendations.fiber = recommendations.fiber - item.fiber;
        recommendations.sugars = recommendations.sugars - item.sugars;
        recommendations.protein = recommendations.protein - item.protein;
        recommendations.calcium = recommendations.calcium - item.calcium;
        recommendations.iron = recommendations.iron - item.iron;
    });
    console.log(recommendations);
    
    return recommendations;
}

module.exports = recommend;