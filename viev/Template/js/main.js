
let interRes = [];
let arr = [];


const sinclick = () => {
  if(!validation()) return;

  ajaxFuncPromised('http://localhost:8080/interpolate/sin', 'http://localhost:8080/calculate/sin')
      .then(
        ajaxInterpolationPromised
      )
      .then(
        ajaxDelta
      );

  // $.ajax({
  //   type: 'POST',
  //   url: 'http://localhost:8080/interpolate/sin',
  //
  //   data: {
  //     startPoint: $('#startPoint').val(),
  //     endPoint: $('#endPoint').val()
  //   },
  //
  //   success: (res) => {
  //
  //     arr = res[0];
  //     interRes[0] = res[1];
  //
  //     drawChart('interpolated', 'int-parent', arr, res[1], 'interpolated sin(x)');
  //
  //     $('#interpolated').show();
  //
  //   }
  // });
  //
  // $.ajax({
  //   type: 'POST',
  //   url: 'http://localhost:8080/calculate/sin',
  //
  //   data: {
  //     startPoint: $('#startPoint').val(),
  //     endPoint: $('#endPoint').val()
  //   },
  //
  //   success: (res) => {
  //     interRes[1] = res;
  //     drawChart('func', 'func-parent', arr, res, 'sin(x)');
  //     $('#func').show();
  //   }
  // });
  //
  // $.ajax({
  //   type: 'POST',
  //   url: 'http://localhost:8080/delta',
  //
  //   data: {
  //     int: interRes[0],
  //     func: interRes[1]
  //   },
  //
  //   success: (deltaResult) => {
  //     drawChart('delta', 'delta-parent', arr, deltaResult, 'delta');
  //     $('#delta').show();
  //   }
  //
  // });

};

const sin2click = () => {
  if(!validation()) return;

  ajaxFuncPromised('http://localhost:8080/interpolate/sin2', 'http://localhost:8080/calculate/sin2')
      .then(
        ajaxInterpolationPromised
      )
      .then(
        ajaxDelta
      );

  // $.ajax({
  //   type: 'POST',
  //   url: 'http://localhost:8080/interpolate/sin2',
  //
  //   data: {
  //     startPoint: $('#startPoint').val(),
  //     endPoint: $('#endPoint').val()
  //   },
  //
  //   success: (res) => {
  //     arr = res[0];
  //     interRes[0] = res[1];
  //     drawChart('interpolated', 'int-parent', arr, res[1], 'interpolated sin^2(x)');
  //     $('#interpolated').show();
  //   }
  // });
  //
  // $.ajax({
  //   type: 'POST',
  //   url: 'http://localhost:8080/calculate/sin2',
  //
  //   data: {
  //     startPoint: $('#startPoint').val(),
  //     endPoint: $('#endPoint').val()
  //   },
  //
  //   success: (res) => {
  //     interRes[1] = res;
  //     drawChart('func', 'func-parent', arr, res, 'sin^2(x)');
  //     $('#func').show();
  //   }
  // });
  //
  // $.ajax({
  //   type: 'POST',
  //   url: 'http://localhost:8080/delta',
  //
  //   data: {
  //     int: interRes[0],
  //     func: interRes[1]
  //   },
  //
  //   success: (deltaResult) => {
  //     drawChart('delta', 'delta-parent', arr, deltaResult, 'delta');
  //     $('#delta').show();
  //   }
  // });
};

const ajaxFuncPromised = (url1, url2) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: 'POST',
      url: url1,

      data: {
          startPoint: $('#startPoint').val(),
          endPoint: $('#endPoint').val()
        },

      success: (res) => {
        console.log(1);
          arr = res[0];
          interRes[0] = res[1];
          drawChart('interpolated', 'int-parent', res[0], res[1], 'interpolated sin^2(x)');
          $('#interpolated').show();
          resolve(url2, res[0], res[1]);
        }
    });
  });
};

const ajaxInterpolationPromised = (url) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: 'POST',
      url: url,

      data: {
        startPoint: $('#startPoint').val(),
        endPoint: $('#endPoint').val()
      },

      success: (res) => {
        console.log(2);
        interRes[1] = res;
        drawChart('func', 'func-parent', arr, res, 'sin^2(x)');
        $('#func').show();
        resolve();
      }
    });
  });
};

const ajaxDelta = () => {
  console.log(3);
  $.ajax({
    type: 'POST',
    url: 'http://localhost:8080/delta',

    data: {
      int: interRes[0],
      func: interRes[1]
    },

    success: (deltaResult) => {
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
  $('#' + parentId).html('');
  $('#' + parentId).append('<canvas id="' + id + '" width="400" height="400"><canvas>');
};

const validation = () => {  if($('#startPoint').val() >= $('#endPoint').val()) {
    $('#startPoint').css({'color' : 'red'});
    $('#endPoint').css({'color' : 'red'});

    return false;
  }

  $('#startPoint').css({'color' : 'black'});
  $('#endPoint').css({'color' : 'black'});

  return true;
};
