
const APP_ID = 'b6d70a87a6df418188332226240504&q';


const DEFAULT_VALUE = "--";

// API phan thoi tiet hien tai
const searchInput = document.querySelector("#search-history-id");
const searchInput2 = document.querySelector("#search-history-id");


// hearder :
const timeHeader = document.querySelector(".time-hearder")

// nhiet do hien tai
const cityName = document.querySelector(".Your-position-city");
const dayAndTime = document.querySelector(".dayAndTime");

const weatherStatus = document.querySelector(".status");
const weatherIcon = document.querySelector(".icon-weather-1");
const weatherTemperature = document.querySelector(".temperature");

// API chi tiet

// humidity : do am
const humidityStatus = document.querySelector(".humidity-status");

// wind : toc do gio
const windStatus = document.querySelector(".wind-status");

// rain : luong mua
const rainStatus = document.querySelector(".rain-status");

// direction : huong gio
const directionStatus = document.querySelector(".direction-status");

// waterProof : kha nang mua
const waterProofStatus = document.querySelector(".waterProof-status");

// UV 
const UVStatus = document.querySelector(".UV-status");

// airQuality : chat luong khong khi
const airQualityStatus = document.querySelector(".airQuality-status");

// cloud : do may che phu
const cloudStatus = document.querySelector(".cloud-status");

const item = document.querySelector(".time--color")






// searchInput.addEventListener('change', (e) => {
//     fetch(`https://api.openweathermap.org/data/2.5/weather?q=${e.target.value}&appid=${APP_ID}&units=metric&lang=vi`)
//         .then(async res => {
//             const data = await res.json();
//             console.log(`[Search Input]`, data);
//             cityName.innerHTML = data.name || DEFAULT_VALUE;    
//             weatherStatus.innerHTML = data.weather[0].description || DEFAULT_VALUE;
//             weatherIcon.setAttribute('src', `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
//             weatherTemperature.innerHTML = Math.round(data.main.temp) || DEFAULT_VALUE;
//             // day.innerText = new Date().toLocaleDateString('vi');

//             // chi tiet

//             humidityStatus.innerHTML = data.main.humidity || DEFAULT_VALUE; 
//             windStatus.innerHTML = data.wind.speed || DEFAULT_VALUE; 
//             // rainStatus.innerHTML = data.hourly.pressure || DEFAULT_VALUE; 

//         });
// });

    
   
// // });





searchInput.addEventListener('change', (e) => {
    fetch(`http://api.weatherapi.com/v1/current.json/forecast.json?key=${APP_ID}=${e.target.value}&aqi=yes&lang=vi`)
    .then(async res => {
        const data = await res.json();
        console.log(`[Search Input]`, data);

        // header
        timeHeader.innerHTML = data.location.localtime || DEFAULT_VALUE;

        // nhiet do hien tai
        cityName.innerHTML = data.location.name || DEFAULT_VALUE;
        dayAndTime.innerHTML = data.location.localtime || DEFAULT_VALUE;
        weatherStatus.innerHTML = data.current.condition.text || DEFAULT_VALUE;
        weatherIcon.innerHTML = data.current.condition.icon || DEFAULT_VALUE;
        weatherIcon.setAttribute('src', `https://${data.current.condition.icon}`);
        weatherTemperature.innerHTML = data.current.temp_c || DEFAULT_VALUE;
        
        // chi tiet
        humidityStatus.innerHTML = data.current.humidity
        windStatus.innerHTML = data.current.wind_kph
        rainStatus.innerHTML = data.current.precip_mm
        UVStatus.innerHTML = data.current.uv
        cloudStatus.innerHTML = data.current.cloud
        waterProofStatus.innerHTML = data.forecast.forecastday[0].day.daily_chance_of_rain

        //ham tinh thoi tiet theo gio
        // Hàm lọc 2 ký tự đầu tiên từ một chuỗi
        function filterFirstTwoCharacters(inputString) {
            return inputString.substring(10, 13); // Hoặc inputString.slice(0, 2);
        }

        // Example usage:
        const originalString = data.location.localtime;
        const filteredString = filterFirstTwoCharacters(originalString);
        console.log(filteredString); // Kết quả: "so gio"

       

        // filteredString : la so gio duoc loc ra

        // thoi tiet theo gio
       
        
        

        //     // Lấy mảng dữ liệu thời tiết theo giờ từ phản hồi API
        //     const weatherDataList = data;
        //     console.log(weatherDataList)

        //     // Lặp qua danh sách các thẻ li và gán dữ liệu từ API vào các phần tử con tương ứng
        // for (let i = 0; i < liElements.length; i++) {
        //     const weatherData = weatherDataList[i];
 
        //     // Truy cập các phần tử con trong thẻ li
        //     const hourlyElement = liElements[i].querySelector('.humidity-item');
            
        //     const timeElement = liElements[i].querySelector('.time--color');
        //     const temperatureElement = liElements[i].querySelector('.hourly-item');
        //     const descriptionElement = liElements[i].querySelector('.humidity-item');

        //     // Gán dữ liệu từ API vào các phần tử con tương ứng
        //     hourlyElement.textContent = weatherDataList.forecast.forecastday[0].hour[2].chance_of_rain;
        //     timeElement.textContent = weatherDataList.current.cloud;
        //     // temperatureElement.textContent = `${weatherData.main.temp}°C`;
        //     // descriptionElement.textContent = weatherData.weather[0].description;
        // } 
        const liElements = document.querySelectorAll('#myList .hourly-item');

        const weatherDataList = data.forecast.forecastday[0];
        console.log(weatherDataList);

                // Lặp qua từng phần tử trong mảng dữ liệu từ API và gán giá trị vào các phần tử con trong mỗi thẻ li
                for (let i = 0; i < weatherDataList.length && i < liElements.length; i++) {
                    const weatherData = weatherDataList[i];
                    const liElement = liElements[i];

                    const timeElement = liElement.querySelector('.time--color');
                    
                    const temperatureElement = liElement.querySelector('.hourly-item--temperature');
                    const descriptionElement = liElement.querySelector('.humidity-item');

                    timeElement.textContent = weatherDataList.temp_c;
                    temperatureElement.textContent = weatherDataList.humidity;
                    descriptionElement.textContent = weatherDataList.weather[0].description;
                }

          
      
        


        

        
            
        
       // huong gio 
        function tinhHuongGio(laBan) {
                const directions = ["Bắc", "Bắc Đông Bắc", "Đông Bắc", "Đông Đông Bắc", "Đông", "Đông Đông Nam", "Đông Nam",
                 "Nam Đông Nam", "Nam", "Nam Tây Nam", "Tây Nam", "Tây Tây Nam", "Tây", "Tây Tây Bắc", "Tây Bắc", "Bắc Tây Bắc"];
            
                const index = Math.round(laBan / 22.5) % 16;
                return directions[index];
            }
            
            // Example usage:
            const laBan = data.current.wind_degree; // tinh Độ la bàn (0 đến 360)
            const huongGio = tinhHuongGio(laBan);
            // console.log("Hướng gió là:", huongGio);
        
        directionStatus.innerHTML = huongGio

        // chat luong khong khi
            function AirQuality (Ari) {
                if(Ari == 1 ) {
                    return "Tốt";
                }
                else if (Ari == 2 ) {
                    return "Khá";
                }
                else if (Ari == 3 ) {
                    return "Trung bình";
                }
                else if (Ari == 4 ) {
                    return "Yếu";
                }
                else if (Ari == 5 ) {
                    return "Kém";
                }
                else if (Ari == 6 ) {
                    return "Nguy hiểm";
                }
                else {
                    return "error";
                }
            }
            
            // bug phan goi : us-epa-index
            const Ari = data.current.air_quality.us_epa_index;

            const khongKhi = AirQuality(Ari);
            console.log("khong khi : ", khongKhi);

            airQualityStatus.innerHTML = khongKhi



    })


});


// thoi tiet theo gio 
            // lay id the ul
            // Lấy thẻ ul
    
        // const ulElement = document.getElementById("myList");
        
        // // Lấy tất cả các thẻ li bên trong ul
        // const liElements = ulElement.querySelectorAll(".hourly-item");

        // // Chuyển NodeList thành mảng
        // const liElementsArray = Array.from(liElements);

        // // Lấy chỉ 6 thẻ li
        // const firstSixLiElements = liElementsArray.slice(0, 6);

        // // Hiển thị mảng
        // console.log(firstSixLiElements); // Mảng 6 thẻ li

        // const weatherDataList = data.current.gust_mph;

        // const liElement = document.querySelectorAll(".hourly-item")

        // theo gio 




