const CreateLabels = (n,m) =>{
    const diff = Math.abs(m-n);
    const diff_n = diff / 10.0;
    let labels = new Array();
    for (let i = 0; i < 11; i++) {
        labels.push(n + (diff_n * i) );
    }
    return labels;
};

const getSelectNum = (elementId) =>{
    const str = document.getElementById(elementId).value;
    const num = parseInt(str,10);
    if(!isNaN(num)){
        return num
    }else {
        return 0;
    }
};

const getFunc = () =>{
    const func1 = x =>{
        return Math.pow(x, 3.0) + x - 1.0;
    };
    const func2 = x =>{
        return (Math.pow(x, 3.0) + Math.pow(x, 2.0) - 30.0) * (-1);
    };

    const funcs = [func1, func1, func2];
    return funcs[getSelectNum('num-nibun')];
};

const getRange = () =>{
    const range = [[-10.0, 10.0],[-10.0, -5.0],[-5.0,5.0]];
    const num = getSelectNum('num-nibun');
    return [range[num][0], range[num][1]];
};

const baseLine = (min, max, func) =>{
    if(min > max) throw new RangeError("minが小さい必要あり");
    let data = [];
    for (let j = min; j < max; j+= 0.01) {
        data.push({x:j,y:func(j)});
    }
    console.log(data);
    return data;
};