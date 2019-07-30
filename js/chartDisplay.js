const ChartsDisplay = (data) => {
    const chartDataSet = {
        type: 'line',
        data: data,
        options: {
            animation: {
                duration: 0,
            },
            tooltips: {
                mode: 'point'
            }
        }
    };

    const ctx = document.getElementById("mycanvas")
        .getContext("2d");
    ctx.canvas.parentNode.style.height = '100%';
    ctx.canvas.parentNode.style.width = '80%';
    let myChart;
    if (! myChart) {
        myChart = new Chart(ctx, chartDataSet);
    } else {
        //データのみ更新
        myChart.data.datasets = chartDataSet.data.datasets;
        myChart.update();
    }
};

