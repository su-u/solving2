const CreateLabels = (n,m) =>{
    const diff = Math.abs(m-n);
    const diff_n = diff / 10.0;
    let labels = new Array();
    for (let i = 0; i < 11; i++) {
        labels.push(n + (diff_n * i) );
    }
    return labels;
};

const getSelectNum = () =>{
    const str = document.getElementById('num').value;
    const num = parseInt(str,10);
    if(!isNaN(num)){
        return num
    }else {
        return 0;
    }
};