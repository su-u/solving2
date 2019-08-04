const createChartNibun = (min, max, func, center, dot1, dot2) => {
    return new CanvasJS.Chart("chartContainer-nibun", {
        height:450,
        width:window.innerWidth * 0.99,
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


let timerNibun;
let iNibun = 0;
let chartNibun;
let isExecNibun = false;


const ManageLineNibun = function () {
    const func = getFunc('num-nibun');
    const [range1, range2] = getRange('num-nibun');
    const [centers, dotes] = nibun(range1, range2, func);
    chartNibun = createChartNibun(-10.0, 10.0, func, centers[iNibun], dotes[iNibun][0], dotes[iNibun][1]);
    chartNibun.render();

    const table = document.getElementById("table-cal-nibun");
    while( table.rows[ 1 ] ) table.deleteRow( 1 );
    const row = table.insertRow(-1);
    const cell1 = row.insertCell(-1);
    const cell2 = row.insertCell(-1);
    const cell3 = row.insertCell(-1);

    cell1.innerHTML = dotes[iNibun][0].toFixed(10);
    cell2.innerHTML = centers[iNibun].toFixed(10);
    cell3.innerHTML = dotes[iNibun][1].toFixed(10);

    iNibun++;
    if (iNibun >= centers.length || iNibun >= dotes.length) {
        const cell4 = row.insertCell(-1);
        const cell5 = row.insertCell(-1);
        cell4.innerHTML = centers[iNibun - 1].toFixed(10);
        cell5.innerHTML = Math.abs(0 - func(centers[iNibun-  1]) * (-1)).toFixed(10);
        clearInterval(timerNibun);
        isExecNibun = false;
    }
};

const startNibun = () =>{
    if(!isExecNibun) {
        resetNibun();
        isExecNibun = true;
        iNibun = 0;
        timerNibun = setInterval("ManageLineNibun()", 500);
    }
};

const resetNibun = () =>{
    isExecNibun = false;
    clearInterval(timerNibun);
    const table = document.getElementById("table-cal-nibun");
    while( table.rows[ 1 ] ) table.deleteRow( 1 );
};
