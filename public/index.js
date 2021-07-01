

var app = new Vue({
    el: '#app',
    data: {
        swag:{},
        searchChar:"Chongyun"
    },
    updated(){
        updateChart(this.swag.statProgression)
    }
});

async function fetchCharData() {
    const response = await fetch('/api/gi/char/'+app._data.searchChar);
    const data = await response.json();
    return data;
}
//need this complicated way cuase vvue created function doesnt work with promises

kacke()
function kacke(){

    fetchCharData().then(data => {
        app._data.swag = data
    });

}

const labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
];
const chartData = {
    labels: labels,
    datasets: [{
        label: 'My First dataset',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: [0, 10, 5, 2, 20, 30, 45],
    }]
};

const config = {
    type: 'line',
    data: chartData,
    options: {
        plugins: {
            legend: {
                position: 'bottom'
            },
            title: {
                display: true,
                text: 'Click on Labels to hide/show them',
                position: 'bottom'
            }
        }
    }
};


const colors = {
    "Base HP": 'rgb(194,0,0)',
    "Base ATK": 'rgb(0,133,175)',
    "Base DEF": 'rgb(37,132,2)',
    "ATK": 'rgb(132,28,2)',
    "CRIT Rate": 'rgb(182,58,0)',
    "CRIT DMG": 'rgb(201,126,0)',
}




var myChart = new Chart(
    document.getElementById('myChart'),
    config
);

function updateChart(statProgression){
    chartData.labels = statProgression.tableMatrix.map(function(x){
        return x[0]
    })
    chartData.datasets = []

    statProgression.tableMatrix[0].forEach(function(row,index,array){
        if(index > 0){
            chartData.datasets.push({
                label: row,
                backgroundColor: colors[row],
                borderColor:  colors[row],
                data: statProgression.tableMatrix.map(function(x){
                    return x[index]
                }),
            })

        }
    })

    myChart.update()
}