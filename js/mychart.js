const Data = {
    labels: [-10, -9, -8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    data: [1, 1, 1, 1, 1, 1, 1, 1]
};


const loadCharts2 = function (data) {
    console.log(data);
    const chartDataSet = {
        type: 'line',
        data: {
            labels: Data.labels,
            datasets: [{
                type: "line",
                label: 'sample1',
                data: [{x: 1, y: 30}],
                backgroundColor: 'rgba(200, 100, 100, 1.0)',
                pointRadius: 10,
                // borderColor: 'rgba(60, 160, 220, 0.8)'
            }, {
                type: "line",
                label: 'sample2',
                data: data,
                backgroundColor: 'rgba(0, 0, 0, 0.0)',
                borderColor: 'rgba(60, 160, 220, 0.8)'
            }
            ]
        },
        options: {
            animation: {
                duration: 0,
            }
        }
    };

    const ctx = document.getElementById("mycanvas")
        .getContext("2d");
    ctx.canvas.parentNode.style.height = '90%';
    ctx.canvas.parentNode.style.width = '70%';
    const myChart = new Chart(ctx, chartDataSet);

};

let data = new Array();
let timer;
let i = 0;

const ManageLine = function () {
    data.push((Data.labels[i] * Data.labels[i]) - (Data.labels[i] / 2) + 4);
    loadCharts2(data);
    if (i >= Data.labels.length) clearInterval(timer);
    i++;
};

const start = function () {
    timer = setInterval("ManageLine()", 500);
};
window.onload = function () {
    loadCharts2();
};