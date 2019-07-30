const CreateLabels = (n,m) =>{
    const diff = Math.abs(n - m);
    const diff_n = diff / 10;
    let labels = new Array();
    for (let i = 0; i < 11; i++) {
        labels.push(n + (diff_n * i) )
    }
    return labels;
};

let data = new Array();
let timer;
let i = 0;

const func = x =>{
    return Math.pow(x, 3.0) + x - 1.0;
};

let dot = nibun(0.0,1.0,func);

const labels = CreateLabels(-5,5);
for (let j = 0; j < labels.length; j++) {
    data.push(func(labels[j]));
}
const chartData = (data) =>{
    return  {
        labels: CreateLabels(-5,5),
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
    ChartsDisplay(chartData(data));
    if (i >= labels.length) clearInterval(timer);
    i++;
};

const start = function () {
    timer = setInterval("ManageLine()", 500);
};
window.onload = function () {
    ChartsDisplay(chartData);
};

console.log(data);
console.log(dot);
console.log(labels);