function updateTime() {
    let timestamp = new Date(2021, 01, 28, 0, 0, 0, 0);
    let currentTimestamp = new Date(new Date().toLocaleString("en", { timeZone:"Europe/Moscow" }));

    let diff = Math.round((currentTimestamp.getTime() - timestamp.getTime()) / 1000);

    let months = Math.floor(diff / (30 * 24 * 60 * 60));
    diff -= months * (30 * 24 * 60 * 60);
    let days = Math.floor(diff / (24 * 60 * 60));
    diff -= days * (24 * 60 * 60);
    let hours = Math.floor(diff / (60 * 60));
    diff -= hours * (60 * 60);
    let minutes = Math.floor(diff / 60);
    diff -= minutes * 60;
    let seconds = diff;

    let typos = [["месяц", "месяца", "месяцев"], ["день", "дня", "дней"], ["час", "часа", "часов"], ["минуту", "минуты", "минут"], ["секунду", "секунды", "секунд"]];
    let types = [months, days, hours, minutes, seconds];

    document.querySelectorAll(".container__deltas > div > span:first-child").forEach(function (item, index) {
        item.innerHTML = types[index];
    });
    
    document.querySelectorAll(".container__deltas > div > span:last-child").forEach(function (item, index) {
        let tempItem = item.parentNode.firstElementChild.innerHTML;
        switch (tempItem) {
            case (tempItem.match(/1\d/) || {}).input: item.innerHTML = typos[index][2]; break;
            case (tempItem.match(/1$/) || {}).input: item.innerHTML = typos[index][0]; break;
            case (tempItem.match(/[2-4]$/) || {}).input: item.innerHTML = typos[index][1]; break;
            default: item.innerHTML = typos[index][2]; break;
        }
    });
}

function Fetch() {
    fetch("https://crisp-professionali.000webhostapp.com/index.json")
    .then((resp) => resp.json())
    .then(function(data) {
        if (data.employeeOpened) {
            if (!lockup) {
                lockup = true;
                document.querySelector(".container").style.display = "none";
                document.querySelector(".container__opened").style.display = "flex";
            }
        } else {
            if (lockup) {
                lockup = false;
                document.querySelector(".container").style.display = "flex";
                document.querySelector(".container__opened").style.display = "none";
            }
            updateTime();
        }
    });
}

let lockup = false;
let timer = setInterval(updateTime, 1000);

window.onload = function() {
    updateTime();
}
