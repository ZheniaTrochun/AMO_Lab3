
// const Chart = require('Chart');

let interRes = [];
let arr = [];


const sinclick = () => {
  $.ajax({
    type: 'POST',
    url: 'http://localhost:8080/interpolate/sin',

    data: {
      startPoint: $('#startPoint').val(),
      endPoint: $('#endPoint').val()
    },

    success: (res) => {
    //  console.log(res);

      arr = res[0];
      interRes[0] = res[1];

      drawChart('interpolated', 'int-parent', arr, res[1], 'interpolated sin(x)');

      // let ctx = document.getElementById('interpolated');
      // let interpolatedChart = new Chart(ctx, {
      //   type: 'line',
      //   data: {
      //     labels: res[0],
      //     datasets: [{
      //       fill: false,
      //       lineTension: 0.1,
      //       backgroundColor: "rgba(75,192,192,0.4)",
      //       borderColor: "rgba(75,192,192,1)",
      //       borderCapStyle: 'butt',
      //       borderDash: [],
      //       borderDashOffset: 0.0,
      //       borderJoinStyle: 'miter',
      //       pointBorderColor: "rgba(75,192,192,1)",
      //       pointBackgroundColor: "#fff",
      //       pointBorderWidth: 1,
      //       pointHoverRadius: 5,
      //       pointHoverBackgroundColor: "rgba(75,192,192,1)",
      //       pointHoverBorderColor: "rgba(220,220,220,1)",
      //       pointHoverBorderWidth: 2,
      //       pointRadius: 1,
      //       pointHitRadius: 10,
      //       label: "interpolated sin(x)",
      //       data: res[1]
      //     }]
      //   }
      //
      // });

      $('#interpolated').show();

    }
  });

  $.ajax({
    type: 'POST',
    url: 'http://localhost:8080/calculate/sin',

    data: {
      startPoint: $('#startPoint').val(),
      endPoint: $('#endPoint').val()
    },

    success: (res) => {
      //console.log(res);

      interRes[1] = res;

      drawChart('func', 'func-parent', arr, res, 'sin(x)');
      //
      // let ctx1 = ;
      // let funcChart = new Chart(document.getElementById('func'), {
      //   type: 'line',
      //   data: {
      //     labels: arr,
      //     datasets: [{
      //       fill: false,
      //       lineTension: 0.1,
      //       backgroundColor: "rgba(75,192,192,0.4)",
      //       borderColor: "rgba(75,192,192,1)",
      //       borderCapStyle: 'butt',
      //       borderDash: [],
      //       borderDashOffset: 0.0,
      //       borderJoinStyle: 'miter',
      //       pointBorderColor: "rgba(75,192,192,1)",
      //       pointBackgroundColor: "#fff",
      //       pointBorderWidth: 1,
      //       pointHoverRadius: 5,
      //       pointHoverBackgroundColor: "rgba(75,192,192,1)",
      //       pointHoverBorderColor: "rgba(220,220,220,1)",
      //       pointHoverBorderWidth: 2,
      //       pointRadius: 1,
      //       pointHitRadius: 10,
      //       label: "sin(x)",
      //       data: res
      //     }]
      //   }
      // });
      $('#func').show();

    }

  });

  //console.log(interRes);
  $.ajax({
    type: 'POST',
    url: 'http://localhost:8080/delta',


    data: {
      int: interRes[0],
      func: interRes[1]
    },

    success: (deltaResult) => {
      console.log(deltaResult);

      drawChart('delta', 'delta-parent', arr, deltaResult, 'delta');

      // let ctx2 = document.getElementById('delta');
      // let deltaChart = new Chart(ctx2, {
      //   type: 'line',
      //   data: {
      //     labels: arr,
      //     datasets: [{
      //       fill: false,
      //       lineTension: 0.1,
      //       backgroundColor: "rgba(75,192,192,0.4)",
      //       borderColor: "rgba(75,192,192,1)",
      //       borderCapStyle: 'butt',
      //       borderDash: [],
      //       borderDashOffset: 0.0,
      //       borderJoinStyle: 'miter',
      //       pointBorderColor: "rgba(75,192,192,1)",
      //       pointBackgroundColor: "#fff",
      //       pointBorderWidth: 1,
      //       pointHoverRadius: 5,
      //       pointHoverBackgroundColor: "rgba(75,192,192,1)",
      //       pointHoverBorderColor: "rgba(220,220,220,1)",
      //       pointHoverBorderWidth: 2,
      //       pointRadius: 1,
      //       pointHitRadius: 10,
      //       label: "delta",
      //       data: deltaResult
      //     }]
      //   }
      // });
      $('#delta').show();
    }

  });

};

const sin2click = () => {
  $.ajax({
    type: 'POST',
    url: 'http://localhost:8080/interpolate/sin2',

    data: {
      startPoint: $('#startPoint').val(),
      endPoint: $('#endPoint').val()
    },

    success: (res) => {

      arr = res[0];
      interRes[0] = res[1];

      drawChart('interpolated', 'int-parent', arr, res[1], 'interpolated sin^2(x)');

      $('#interpolated').show();

    }
  });

  $.ajax({
    type: 'POST',
    url: 'http://localhost:8080/calculate/sin2',

    data: {
      startPoint: $('#startPoint').val(),
      endPoint: $('#endPoint').val()
    },

    success: (res) => {
      interRes[1] = res;

      drawChart('func', 'func-parent', arr, res, 'sin^2(x)');

      $('#func').show();

    }

  });

  $.ajax({
    type: 'POST',
    url: 'http://localhost:8080/delta',


    data: {
      int: interRes[0],
      func: interRes[1]
    },

    success: (deltaResult) => {
      console.log(deltaResult);

      drawChart('delta', 'delta-parent', arr, deltaResult, 'delta');

      $('#delta').show();
    }

  });

};

const drawChart = (id, parentId, xArr, yArr, label) => {
  refreshCanvas(id, parentId);

  let deltaChart = new Chart(document.getElementById(id), {
    type: 'line',
    data: {
      labels: xArr,
      datasets: [{
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        label: label,
        data: yArr
      }]
    }
  });
};

const refreshCanvas = (id, parentId) => {
  $('#' + id).remove(); // this is my <canvas> element
  $('#' + parentId).append('<canvas id="' + id + '" width="400" height="400"><canvas>');
};
