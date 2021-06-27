const searchInput = document.querySelector(".search_input");
const searchRandomRecipeName = document.querySelector(".random_recipe_name");
const randomRecipeeImage = document.querySelector(".Random_recipee_image");
const recipeeContainer = document.querySelector(".search_rec_container");
const fav_img_box_img = document.querySelector(".fav_img_box_img");
const fav_img_box_name = document.querySelector(".fav_img_box_name");
const favSection = document.querySelector(".fav_meal_box");
const randFav = document.querySelector("favheart");

const getRandomRecipe = async () => {
  const response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/random.php"
  );
  const resp = await response.json();
  const randomMeal = resp.meals;

  searchRandomRecipeName.innerHTML = randomMeal[0].strMeal;
  randomRecipeeImage.src = randomMeal[0].strMealThumb;
};

window.addEventListener("load", getRandomRecipe);

const getRecipeBySearch = async () => {
  const searchValue = searchInput.value;
  console.log(searchValue);
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`
  );
  const resp = await response.json();
  const mealBySearch = resp.meals;
  for (const meals of mealBySearch) {
    const li = document.createElement("li");
    recipeeContainer.append(li);
    li.style.listStyle = "none";
    const div = document.createElement("div");
    div.style.border = "2px solid #7607dd";
    div.style.borderRadius = "5px";
    div.style.margin = "1rem";
    li.append(div);
    const img = document.createElement("img");
    img.src = meals.strMealThumb;
    img.classList.add("Random_recipee_image");
    img.style.marginBottom = "1rem";
    const divNameContains = document.createElement("div");
    divNameContains.style.display = "flex";
    divNameContains.style.justifyContent = "space-between";
    divNameContains.style.alignItems = "center";
    divNameContains.style.padding = "1rem";
    divNameContains.style.fontSize = "1.2rem";
    div.append(img, divNameContains);
    const h2 = document.createElement("h2");
    h2.style.color = "#7607dd";
    h2.innerHTML = meals.strMeal;
    const fav = document.createElement("i");
    fav.style.fontSize = "2rem";
    fav.style.color = "#aaa";
    fav.style.cursor = "pointer";
    fav.innerHTML = '<i class="fas fa-heart"></i>';
    divNameContains.append(h2, fav);
    console.log(recipeeContainer);

    const addFavMeal = () => {
      const favMealdiv = document.createElement("div");
      favMealdiv.classList.add("favitem_container");
      favSection.append(favMealdiv);
      const favMealImgBox = document.createElement("div");
      favMealImgBox.classList.add("fav_img_box");
      const favMealImg = document.createElement("img");
      favMealImg.classList.add("fav_img_box_img");
      favMealImg.src = meals.strMealThumb;
      favMealImgBox.append(favMealImg);
      const favMealName = document.createElement("p");
      favMealName.classList.add("fav_img_box_name");
      favMealName.innerHTML = meals.strMeal;
      favMealdiv.append(favMealImgBox, favMealName);
    };
    fav.addEventListener("click", () => {
      addFavMeal();
      fav.style.color = "red";
    });
    searchInput.value = "";
  }
};

searchInput.addEventListener("change", getRecipeBySearch);
