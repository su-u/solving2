const Data = {
    labels: [-10, -9, -8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    data: [1, 1, 1, 1, 1, 1, 1, 1]
};

let data = new Array();
let timer;
let i = 0;

const func = x =>{
    return Math.pow(x, 3.0) + x - 1.0;
};

let dot = nibun(0.0,1.0,func);

console.log(dot);
for (let j = 0; j < Data.labels.length; j++) {
    data.push(func(Data.labels[j]));
}
console.log(data);

const chartData = (data) =>{
    return  {
        labels: Data.labels,
        datasets: [{
            type: "line",
            label: 'sample1',
            data: [{x: 1, y: 30}],
            backgroundColor: 'rgba(200, 100, 100, 1.0)',
            pointRadius: 10,
        }, {
            type: "line",
            label: 'sample2',
            data: data,
            backgroundColor: 'rgba(0, 0, 0, 0.0)',
            borderColor: 'rgba(60, 160, 220, 0.8)'
    }]}
};

const ManageLine = function () {
    loadCharts(chartData(data));
    if (i >= Data.labels.length) clearInterval(timer);
    i++;
};

const start = function () {
    timer = setInterval("ManageLine()", 500);
};
window.onload = function () {
    ChartsDisplay(chartData);
};