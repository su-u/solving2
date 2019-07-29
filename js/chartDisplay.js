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

