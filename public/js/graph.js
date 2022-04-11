var full_data = [];
var data_of_dates = [];
var data_of_D_V_P_M = [];
var data_of_D_V_P_M2 = [];
var myChart;

fetch("https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/vaccinations/vaccinations.json")
  .then(res => res.json())
  .then(point_data => {
    console.log(point_data);
    full_data = point_data;
    abcd(full_data, 'bar')
  });

function abcd(full_data, chart_type) {
  console.log(full_data[96].data.length);
  document.getElementById('start').min = 1;
  document.getElementById('start').max = full_data[96].data.length;
  document.getElementById('end').max = full_data[96].data.length;
  document.getElementById('end').value = full_data[96].data.length;
  for (let i = 0; i < full_data[96].data.length; i++) {
    data_of_dates.push(full_data[96].data[i].date);
    data_of_D_V_P_M.push(full_data[96].data[i].daily_vaccinations_per_million);
    data_of_D_V_P_M2.push(full_data[222].data[i].daily_vaccinations_per_million);
  }

  const data = {
    labels: data_of_dates,
    datasets: [{
      label: 'INDIA',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: data_of_D_V_P_M,
    },
    {
      label: 'United States',
      backgroundColor: 'rgb(255, 165, 0)',
      borderColor: 'rgb(255, 165, 0)',
      data: data_of_D_V_P_M2
    }
  ]
  };

  const config = {
    type: chart_type,
    data: data,
    options: {
      maintainAspectRatio: false,
      hoverRadius: 10,
      hitRadius: 50,
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      borderWidth: 5
    }
  };

  myChart = new Chart(
    document.getElementById('myChart'),
    config
  );


  console.log(data_of_dates);
  console.log(data_of_D_V_P_M);

}

function bar_chart() {
  myChart.config.type = 'bar';
  myChart.update();
  document.getElementById('myChart')
}

function line_chart() {
  myChart.config.type = 'line';
  myChart.update();
}

function past_7_days(){
  const seven = data_of_dates.slice((data_of_dates.length-30));
  const seven_data = data_of_D_V_P_M.slice((data_of_D_V_P_M.length-30));
  const seven_data2 = data_of_D_V_P_M2.slice((data_of_D_V_P_M2.length-30));
  myChart.config.data.labels = seven;
  myChart.config.data.datasets[0].data = seven_data;
  myChart.config.data.datasets[1].data = seven_data2;
  myChart.update();
}

const start = document.getElementById('start');
const end = document.getElementById('end');

function updateSTART(range) {
  console.log(range.value);
  const minX = data_of_dates.slice(range.value - 1, end.value);
  const minY = data_of_D_V_P_M.slice(range.value - 1, end.value);
  const minY2 = data_of_D_V_P_M2.slice(range.value - 1, end.value);
  myChart.config.data.labels = minX;
  myChart.config.data.datasets[0].data = minY;
  myChart.config.data.datasets[1].data = minY2;
  end.min = range.value;
  myChart.update();
}

function updateEND(range) {
  const minX = data_of_dates.slice(start.value - 1, range.value);
  const minY = data_of_D_V_P_M.slice(start.value - 1, range.value);
  const minY2 = data_of_D_V_P_M2.slice(start.value - 1, range.value);
  myChart.config.data.labels = minX;
  myChart.config.data.datasets[0].data = minY;
  myChart.config.data.datasets[1].data = minY2;
  start.max = range.value;
  myChart.update();
}