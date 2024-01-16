
let apiKey = '03ed0c12d1ca387207f71e4c8bb7b9ed';
 /* http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=03ed0c12d1ca387207f71e4c8bb7b9ed;*/
 
 let input = document.querySelector('#city');
 
 let city;

 let url = `http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=${apiKey}&q=${city}`;

/*получаем значение из формы*/ 
let form =document.querySelector("#myform");

let button = document.querySelector('#button');
/**значение поля какой город выбран */
let label = document.querySelector('#label');
/*температура сейчас */
let tempNow = document.querySelector('#tempNow');

/*функция переводящая фаренгейты в цельсий */
function normalizeForecast(item) {
    return Math.round(item-273.15) + ' °C';
 }

/*осадки сейчас*/
let precipitation = document.querySelector('#precip');
/*температура позже */
let tempLate = document.querySelector('#tempLate');
/*влажность*/
let precipGen = document.querySelector('#precipGen');
/*геолокация */
let locationCity = document.querySelector('#locationCity')
/*картинкa */
let imgToday = document.querySelector('#imgToday');

/*осадки дней недели */
let precip2 =document.querySelector('#precip2');
let precip3 =document.querySelector('#precip3');
let precip4 =document.querySelector('#precip4');
let precip5 =document.querySelector('#precip5');
let precip6 =document.querySelector('#precip6');

/* определяем дни недели  */
let date = new Date();
let day = date.getDay();
let days = ['SUN','MON','TUE','WED','THU','FRI','SAT'];

let dayWeek2 = document.querySelector('#dayWeek2');
let dayWeek3 = document.querySelector('#dayWeek3');
let dayWeek4 = document.querySelector('#dayWeek4');
let dayWeek5 = document.querySelector('#dayWeek5');
let dayWeek6 = document.querySelector('#dayWeek6');

/* картинки отражающие погоду */
let img2 = document.querySelector('#img2');
let img3 = document.querySelector('#img3');
let img4 = document.querySelector('#img4');
let img5 = document.querySelector('#img5');
let img6 = document.querySelector('#img6');

/*   максимальная и минимальная температура*/
let tempMax2 = document.querySelector('#tempMax2');
let tempMin2 = document.querySelector('#tempMin2');
let tempMax3 = document.querySelector('#tempMax3');
let tempMin3 = document.querySelector('#tempMin3');
let tempMax4 = document.querySelector('#tempMax4');
let tempMin4 = document.querySelector('#tempMin4');
let tempMax5 = document.querySelector('#tempMax5');
let tempMin5 = document.querySelector('#tempMin5');
let tempMax6 = document.querySelector('#tempMax6');
let tempMin6 = document.querySelector('#tempMin6');

/*функция получения данных на основании выбранного города */

function getForecastByCity(city) {
    fetch(`http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=${apiKey}&q=${city}`).then(response=>{
        return response.json()
       }).then((data)=>{
        console.log(data);
        
/*функция отображения дней недели */

        function renderForecastDay(elem) {
            return days[new Date(data.list[elem].dt_txt.toString().substring(0,10).replace('-',',').replace('-',',')).getDay()];
        }

/*Функция отображения осадков */

        function renderForecastPrecip(elem) {
            return data.list[elem].weather[0].main;
        }
/*функция отображения картинок */

        function renderForecastImg(elem) {
            return  './img/' + elem + '.png';
        }
/*функция отображения температуры днем и ночью */

        function renderForecastTemp (elem) {
            return normalizeForecast(data.list[elem].main.temp);
        }
/* Данные на сегодня */
        tempNow.innerHTML = normalizeForecast(data.list[3].main.temp);
        precipitation.innerHTML = renderForecastPrecip(0)
        tempLate.innerHTML = normalizeForecast(data.list[6].main.temp);
        precipGen.innerHTML = 'humidity: ' + data.list[6].main.humidity;
        locationCity.innerHTML = data.city.name + ', ' + data.city.country;
        imgToday.src= renderForecastImg( precipitation.innerHTML);
/*отображение дней недели*/
        dayWeek2.innerHTML = renderForecastDay(5);
        dayWeek3.innerHTML = renderForecastDay(11);
        dayWeek4.innerHTML = renderForecastDay(18);
        dayWeek5.innerHTML = renderForecastDay(26);
        dayWeek6.innerHTML = renderForecastDay(36);
        
/*отображение осадков */        
        precip2.innerHTML = renderForecastPrecip(5);
        precip3.innerHTML = renderForecastPrecip(11);
        precip4.innerHTML = renderForecastPrecip(14);
        precip5.innerHTML = renderForecastPrecip(26);
        precip6.innerHTML = renderForecastPrecip(34);
       
/*отображение картинок */

        img2.src= renderForecastImg( precip2.innerHTML);
        img3.src= renderForecastImg(precip3.innerHTML);
        img4.src= renderForecastImg(precip4.innerHTML );
        img5.src= renderForecastImg(precip5.innerHTML);
        img6.src= renderForecastImg(precip6.innerHTML);

/* отображение температуры днем и ночью*/

        tempMax2.innerHTML = renderForecastTemp(6);
        tempMin2.innerHTML = renderForecastTemp(2);
        tempMax3.innerHTML = renderForecastTemp(14);
        tempMin3.innerHTML = renderForecastTemp(10);
        tempMax4.innerHTML = renderForecastTemp(22);
        tempMin4.innerHTML = renderForecastTemp(19);
        tempMax5.innerHTML = renderForecastTemp(30);
        tempMin5.innerHTML = renderForecastTemp(26);
        tempMax6.innerHTML = renderForecastTemp(38);
        tempMin6.innerHTML = renderForecastTemp(35);
       });

         
}
getForecastByCity('Kyiv');

/*слушаем отправку формы  */

 form.onsubmit = function(event) {
    event.preventDefault();
    city = input.value.trim();//обрезаем пробелы
    getForecastByCity(city)
 }
   
