const Data = {
    labels: [-10, -9, -8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    data: [1, 1, 1, 1, 1, 1, 1, 1]
};


let data = new Array();
let timer;
let i = 0;

let

const ManageLine = function () {
    data.push((Data.labels[i] * Data.labels[i]) - (Data.labels[i] / 2) + 4);
    loadCharts(data);
    if (i >= Data.labels.length) clearInterval(timer);
    i++;
};

const start = function () {
    timer = setInterval("ManageLine()", 500);
};
window.onload = function () {
    loadCharts();
};