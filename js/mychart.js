
const createChart = (min, max, func, center, dot1, dot2) => {
    return new CanvasJS.Chart("chartContainer", {
        zoomEnabled: true,
        zoomType: "xy",
        exportEnabled: true,
        title: {
            text: "二分法"
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


const ManageLine = function () {
    const [range1, range2] = getRange();
    const [centers, dotes] = nibun(range1, range2, getFunc());
    chart = createChart(-10.0, 10, getFunc(), centers[i], dotes[i][0], dotes[i][1]);
    chart.render();

    const table = document.getElementById("table-cal");
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
        cell4.innerHTML = centers[i - 1];
        clearInterval(timer);
    }
};

const start = () =>{
    if(!isExec) {
        reset();
        isExec = true;
        i = 0;
        timer = setInterval("ManageLine()", 500);
    }
};

const reset = () =>{
    isExec = false;
    clearInterval(timer);
    const table = document.getElementById("table-cal");
    while( table.rows[ 1 ] ) table.deleteRow( 1 );
};


window.onload =()=> {
    createChart(-10.0, 10.0, getFunc()).render();
};