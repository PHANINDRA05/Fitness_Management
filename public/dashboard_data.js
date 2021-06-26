var rainfallpredobj =  {
  type: 'bar',
  data: {
    labels: ['Men Users','Women Users'],
    datasets: [{
      label: '# of Tomatoes',
      data:[37,50],
      backgroundColor: [
        'rgba(5, 162, 235, 0.9)',
        'rgba(155, 206, 96, 0.9)'
      ],
      borderColor: [
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)'
      ],
      borderWidth: 1
    }]
  },
  options: {
       //cutoutPercentage: 40,
    responsive: false,

  }
};

var rainpredGraph = document.getElementById('visitor-data').getContext('2d');
var rainpredChart = new Chart(rainpredGraph, rainfallpredobj);
var i = 6;

function updateTemp(){
  rainpredChart.data.datasets[0].data[0] = Math.floor(Math.random()*50);
  rainpredChart.data.datasets[0].data[1] = Math.floor(Math.random()*50);
  i=i+1;
  rainpredChart.update()
}

setInterval(updateTemp, 5000000);

var profit =  {
  type: 'line',
  data: {
    labels: [' ',' ',' '],
    datasets: [{
      label: 'Profit',
      data:[60,17,29],
      backgroundColor: [
        'rgba(5, 162, 235, 0.2)',
        'rgba(155, 206, 96, 0.2)',
        'rgba(75, 192, 192, 0.2)'
      ],
      borderColor: [
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)'
      ],
      borderWidth: 1
    }]
  },
  options: {
       //cutoutPercentage: 40,
    responsive: false,

  }
};

var profitGraph = document.getElementById('visitor-data2').getContext('2d');
var profitChart = new Chart(profitGraph, profit);
var j = 6;

function updateProfit(){
profitChart.data.datasets[0].data[0] = Math.floor(Math.random()*50);
profitChart.data.datasets[0].data[1] = Math.floor(Math.random()*50);
j=j+1;
profitChart.update()
}

setInterval(updateProfit, 5000000);