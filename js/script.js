function Calc(timestamp, currentTimestamp) {
    let diff = Math.round((currentTimestamp.getTime() - timestamp.getTime()) / 1000);
    let typos = [["месяц", "месяца", "месяцев"], ["день", "дня", "дней"], ["час", "часа", "часов"], ["минуту", "минуты", "минут"], ["секунду", "секунды", "секунд"]];

    let months = Math.floor(diff / (30 * 24 * 60 * 60));
    diff -= months * (30 * 24 * 60 * 60);
    let days = Math.floor(diff / (24 * 60 * 60));
    diff -= days * (24 * 60 * 60);
    let hours = Math.floor(diff / (60 * 60));
    diff -= hours * (60 * 60);
    let minutes = Math.floor(diff / 60);
    diff -= minutes * 60;
    let seconds = diff;

    let output = [[months, ""], [days, ""], [hours, ""], [minutes, ""], [seconds, ""]];
    output.forEach(function (item, index) {
        let tempItem = String(item[0]);
        switch (tempItem) {
            case (tempItem.match(/1\d/) || {}).input: item[1] = typos[index][2]; break;
            case (tempItem.match(/1$/) || {}).input: item[1] = typos[index][0]; break;
            case (tempItem.match(/[2-4]$/) || {}).input: item[1] = typos[index][1]; break;
            default: item[1] = typos[index][2]; break;
        }
    })
    
    return output;
}

function UpdatePage(timestamp, seasonEndTimestamp) {
    let currentTimestamp = new Date(new Date().toLocaleString("en", { timeZone:"Europe/Moscow" }));

    if (String(currentTimestamp) >= String(seasonEndTimestamp)) {
        OnSeasonEnd();
    } else {
        data = Calc(timestamp, currentTimestamp);

        document.querySelectorAll(".container__deltas > div > span:first-child").forEach(function (item, index) {
            item.innerHTML = data[index][0];
        });
    
        document.querySelectorAll(".container__deltas > div > span:last-child").forEach(function (item, index) {
            item.innerHTML = data[index][1];
        });
    }
}

function OnSeasonEnd() {
    clearInterval(timer);

    let item = document.querySelector(".container__title");
    item.innerHTML = "Первый сезон завершился! По его итогам набор в общину <a class=\"container__title__link no-select\" href=\"https://rp.plo.su/t/113\" target=\"_blank\">Чайный Союз</a> был закрыт:";
    item.style.fontSize = "2.25rem";
}

let timestamp = new Date(2021, 01, 28);
let seasonEndTimestamp = new Date(2021, 06, 1);

let timer = setInterval(UpdatePage, 1000, timestamp, seasonEndTimestamp);

window.onload = function() {
    UpdatePage(timestamp, seasonEndTimestamp);
}
