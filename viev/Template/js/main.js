
const serverUrl = 'http://localhost:8080';

const calculateClick = () => {
  if(!validation()) return;

  ajaxInterpolationPromised()
      .then(
        ajaxFuncPromised
      )
      .then(
        ajaxDelta
      );
};

const ajaxInterpolationPromised = () => {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: 'POST',
      url: serverUrl + '/interpolate',

      data: {
          startPoint: $('#startPoint').val(),
          endPoint: $('#endPoint').val(),
          funcStr: $('#funcStr').val(),
          nodes: $('#nodes').val()
        },

      success: (res) => {
          drawChart('interpolated', 'int-parent', res[0], res[1], 'interpolated ' + $('#funcStr').val());
          $('#interpolated').show();
          resolve(res);
        }
    });
  });
};

const ajaxFuncPromised = (interpolationRes) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: 'POST',
      url: serverUrl + '/calculate',

      data: {
        startPoint: $('#startPoint').val(),
        endPoint: $('#endPoint').val(),
        funcStr: $('#funcStr').val(),
        nodes: $('#nodes').val()
      },

      success: (res) => {

        const transferObj = {
          interpolationRes: interpolationRes,
          calculationRes: res
        };

        drawChart('func', 'func-parent', interpolationRes[0], res, $('#funcStr').val());
        $('#func').show();
        resolve(transferObj);
      }
    });
  });
};

const ajaxDelta = (transferObj) => {
  $.ajax({
    type: 'POST',
    url: serverUrl + '/delta',

    data: {
      int: transferObj.interpolationRes[1],
      func: transferObj.calculationRes
    },

    success: (deltaResult) => {
      drawChart('delta', 'delta-parent', transferObj.interpolationRes[0], deltaResult, 'delta');
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
  $('#' + parentId).append('<canvas id="' + id + '"><canvas>');
};

const validation = () => {
  if($('#startPoint').val() >= $('#endPoint').val() ||
                $('#nodes').val() <= 0 || !$('#funcStr').val()) {
    $('#startPoint').css({'color' : 'red'});
    $('#endPoint').css({'color' : 'red'});
    $('#funcStr').css({'color' : 'red'});
    $('#nodes').css({'color' : 'red'});

    return false;
  }

  $('#startPoint').css({'color' : 'black'});
  $('#endPoint').css({'color' : 'black'});
  $('#nodes').css({'color' : 'red'});
  $('#funcStr').css({'color' : 'red'});

  return true;
};
