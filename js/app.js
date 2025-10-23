// app.js

// Vi väljer en kategori att filtrera på
const CATEGORY_TO_MATCH = "Seafood";

// Vår huvudfunktion (async för att kunna använda await)
async function loadMeals() {
  try {
    // 1) Hämta data från API:et
    const response = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=chicken");
    const data = await response.json();

    // 2) Kontrollera att vi fick en lista
    const meals = Array.isArray(data.meals) ? data.meals : [];
    console.log("Totalt antal måltider hämtade:", meals.length);

    // 3) Första 5 namn i alfabetisk ordning
    const firstFive = [...meals]
      .sort((a, b) => a.strMeal.localeCompare(b.strMeal))
      .slice(0, 5)
      .map(meal => meal.strMeal);

    console.log("Första 5 måltider (alfabetiskt):", firstFive);

    // 4) Alla måltider i vald kategori
    const mealsInCategory = meals.filter(
      meal => (meal.strCategory || "").toLowerCase() === CATEGORY_TO_MATCH.toLowerCase()
    );

    console.log(`Måltider i kategorin "${CATEGORY_TO_MATCH}":`);
    mealsInCategory.forEach(meal => {
      console.log(meal.strMeal, "-", meal.strCategory);
    });

    // 5) Räkna antal måltider per kategori
    const countByCategory = meals.reduce((acc, meal) => {
      const cat = meal.strCategory || "Okänd";
      acc[cat] = (acc[cat] || 0) + 1;
      return acc;
    }, {});

    console.log("Antal måltider per kategori:", countByCategory);
  } catch (error) {
    console.error("Ett fel uppstod:", error);
  }
}

loadMeals();


