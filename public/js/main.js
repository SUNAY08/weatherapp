const cityName = document.getElementById('cityName');
const submitBtn = document.getElementById('submitBtn');

const city_name = document.getElementById('city_name');
const temp_real_val = document.getElementById('temp_real_val');
const temp_status = document.getElementById('temp_status');
const datahide = document.querySelector('.middle_layer');
const dt = new Date();
document.getElementById('date-time').innerHTML = dt;


const getInfo = async (event) => {
    event.preventDefault();

    let cityVal = cityName.value;

    if (cityVal === "") {
        city_name.innerText = `Plz write the name before search`;
        alert("plz enter crrcct name")
        datahide.classList.add("data_hide");
    } else {

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=9fcdaec639733546522c9d7c4e1760b2`
        console.log(url,"url");

        try {


            // let url = `http://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=9fcdaec639733546522c9d7c4e1760b2`
            // console.log(url,"url");
            const response = await fetch(url);

            const data = await response.json()
            console.log(data,"data after 29");
            const arrData = [data];

            city_name.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`;
            temp_real_val.innerText = arrData[0].main.temp;
            const tempcond = arrData[0].weather[0].main;
            console.log(tempcond);

            const timestamp =  Date.now() / 1000;

            // console.log(timestamp);


            if (tempcond == "Clear" && timestamp >= arrData[0].sys.sunrise && timestamp <= arrData[0].sys.sunset ) {
                temp_status.innerHTML =
                    "<i class='fas  fa-sun' style='color: #eccc68;'></i>";
            }
            else if (tempcond == "Clear" &&  timestamp >= arrData[0].sys.sunset ) {
                temp_status.innerHTML =
                    "<i class='fas  fa-moon' style='color: #eccc68;'></i>";
            } else if (tempcond == "Clouds") {
                temp_status.innerHTML =
                    "<i class='fas  fa-cloud' style='color: #f1f2f6;'></i>";
            } else if (tempcond == "Rain") {
                temp_status.innerHTML =
                    "<i class='fas  fa-cloud-rain' style='color: #a4b0be;'></i>";
            } else {
                temp_status.innerHTML =
                    "<i class='fas  fa-cloud' style='color:#f1f2f6;'></i>";

            }
            datahide.classList.remove('data_hide');
            cityVal = "";


        } catch {
            cityVal = " ";
            datahide.classList.add("data_hide");
            city_name.innerText = `please enter the proper city name`;
            console.log('please add the proper city name');
            alert("type correct name");
        }

    }
}

submitBtn.addEventListener('click', getInfo);