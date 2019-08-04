const createChartNyu = (min, max, func, center, dot1, dot2) => {
    return new CanvasJS.Chart("chartContainer-nyu", {
        height:450,
        width:window.innerWidth * 0.99,
        zoomEnabled: true,
        zoomType: "xy",
        exportEnabled: true,
        title: {
            text: "ニュートン法"
        },
        axisX: {
            title: "X",
        },
        axisY: {
            title: "Y",
            titleFontColor: "#4F81BC",
            labelFontColor: "#4F81BC"
        },
        toolTip: {
            shared: true
        },
        legend:{
            cursor:"pointer",
        },
        data: [{
            type: "line",
            name: "func",
            dataPoints: baseLine(min, max, func)
        }, {
            type: "line",
            name: "X",
            showInLegend: true,
            dataPoints: [
                {x:dot1,y:func(dot1)},
                {x:dot2, y:func(dot2)}]
        }, {
            type: "line",
            name: "Center",
            color: "#39a64f",
            showInLegend: true,
            dataPoints: [
                {x:center,y:func(center)}]
        }]
    });
};


let timer;
let i = 0;
let chart;
let isExec = false;


const ManageLine = function (range1, range2, centers, dotes, func) {
    chart = createChartNyu(-10.0, 10.0, func, centers[i], dotes[i][0], dotes[i][1]);
    chart.render();

    const table = document.getElementById("table-cal-nyu");
    while( table.rows[ 1 ] ) table.deleteRow( 1 );
    const row = table.insertRow(-1);
    const cell1 = row.insertCell(-1);
    const cell2 = row.insertCell(-1);
    const cell3 = row.insertCell(-1);

    cell1.innerHTML = dotes[i][0];
    cell2.innerHTML = centers[i];
    cell3.innerHTML = dotes[i][1];

    i++;
    if (i >= centers.length || i >= dotes.length) {
        const cell4 = row.insertCell(-1);
        const cell5 = row.insertCell(-1);
        cell4.innerHTML = centers[i - 1];
        cell5.innerHTML = Math.abs(0-func(centers[i-1])*(-1));
        clearInterval(timer);
        isExec = false;
    }
};

const start = () =>{
    if(!isExec) {
        reset();
        isExec = true;
        i = 0;
        const func = getFunc();
        const [range1, range2] = getRange();
        const [centers, dotes] = nibun(range1, range2, func);
        timer = setInterval("ManageLine(range1, range2, centers, dotes, func)", 500);
    }
};

const reset = () =>{
    isExec = false;
    clearInterval(timer);
    const table = document.getElementById("table-cal-nyu");
    while( table.rows[ 1 ] ) table.deleteRow( 1 );
};
