const selectCars = document.querySelector("#cars-list");
const infoBlock = document.querySelector(".info-block");
const getData = async (name) => {
  const responceCars = await fetch("./l30-cars.json");
  const cars = await responceCars.json();
  if (name) {
    for (let item of cars.cars) {
      if (item.brand === name) {
        return item;
      }
    }
  } else return cars;
};
getData()
  .then((data) => {
    for (let model of data.cars) {
      let option = document.createElement("option");
      option.value = model.brand;
      option.innerText = model.brand;
      selectCars.append(option);
    }
  })
  .catch((error) => {
    console.log(error);
  });

try {
  selectCars.addEventListener("change", (e) => {
    getData(e.target.value)
      .then((data) => {
        if (data.model === undefined) {
          infoBlock.innerHTML = "";
          throw new Error("Нет данных");
        }
        infoBlock.innerHTML = `<div class="model"><span>Модель </span>${data.model}</div><div class="price"><span>Цена </span>${data.price}</div>`;
      })
      .catch((error) => {
        console.log(error);
      });
  });
} catch (error) {
  console.log(error);
}
