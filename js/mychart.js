const getFunc = () =>{
    const func1 = x =>{
        return Math.pow(x, 3.0) + x - 1.0;
};
    const func2 = x =>{
        return Math.pow(x, 3.0) + x - 10.0;
    };

    const funcs = [func1, func1, func2];
    return funcs[getSelectNum()];
};

const getRange = () =>{
    const num = getSelectNum();
    const range = [[-10.0, 10.0],[-10.0, 0.0],[-10.0,10.0]];
    console.log(range[num]);
    return [range[num][0], range[num][1]];
};

const baseLine = (min, max, func) =>{
    if(min > max) throw new RangeError("minが小さい必要あり");
    let data = [];
    console.log(min,max);
    for (let j = min; j < max; j+= 0.01) {
        data.push({x:j,y:func(j)});
    }
    console.log(data);
    return data;
};

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

const [range1, range2] = getRange();
const [centers, dotes] = nibun(range1, range2, getFunc());

const ManageLine = function () {
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

    if (i >= centers.length) {
        clearInterval(timer);
        const cell4 = row.insertCell(-1);
        cell4.innerHTML = centers[i];
    }
    i++;
};

const start = () =>{
    if(!isExec) {
        reset();
        isExec = true;
        i = 0;
        timer = setInterval("ManageLine()", 1000);
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