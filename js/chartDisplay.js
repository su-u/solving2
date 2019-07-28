const ChartsDisplay = (data) => {
    const chartDataSet = {
        type: 'line',
        data: data,
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

// {
//     labels: Data.labels,
//         datasets: [{
//     type: "line",
//     label: 'sample1',
//     data: [{x: 1, y: 30}],
//     backgroundColor: 'rgba(200, 100, 100, 1.0)',
//     pointRadius: 10,
// }, {
//     type: "line",
//     label: 'sample2',
//     data: data,
//     backgroundColor: 'rgba(0, 0, 0, 0.0)',
//     borderColor: 'rgba(60, 160, 220, 0.8)'
// }]
// }