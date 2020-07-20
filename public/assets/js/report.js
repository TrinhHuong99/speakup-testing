window.onload = function() {
if ($('#canvas-1').length) {
    var ctx = $('#canvas-1');
    window.myBar = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['3/25/2019', '3/26/2019'],
            datasets: [{
                type: 'bar',
                label: 'Số lượng TT',
                backgroundColor: 'rgb(54, 162, 235)',
                yAxisID: 'y-axis-1',
                data: [200,1350]
            }, {
                type: 'bar',
                label: 'Số lượng KH',
                backgroundColor: 'rgb(255, 159, 64)',
                yAxisID: 'y-axis-1',
                data: [220,840]
            }]
        },
        options: {
            responsive: true,
            title: {
                display: false,
                text: 'Biểu đồ so sánh kế hoạch và thực tế'
            },
            tooltips: {
                mode: 'index',
                intersect: false,
                enabled: false
            },
            animation: {
                onComplete: function () {
                    var ctx = this.chart.ctx;
                    ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontFamily, 'normal', Chart.defaults.global.defaultFontFamily);
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'bottom';
                    ctx.fillStyle = "#fff";
                    this.data.datasets.forEach(function (dataset)
                    {
                        for (var i = 0; i < dataset.data.length; i++) {
                            for(var key in dataset._meta)
                            {
                                var model = dataset._meta[key].data[i]._model;
                                ctx.fillText(dataset.data[i], model.x, (model.y + 25));
                            }
                        }
                    });
                }
            },
            scales: {
                yAxes: [{
                    type: 'linear',
                    display: true,
                    position: 'left',
                    id: 'y-axis-1',
                    ticks: {
                        beginAtZero: true,
                        suggestedMax: 2000
                    }
                }],
            }
        }
    });
}
if ($('#canvas-2').length) {
    var ctx = $('#canvas-2');
    window.myBar = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['3/25/2019', '3/26/2019','3/27/2019', '3/28/2019'],
            datasets: [{
                type: 'line',
                label: 'Số lượng TT',
                borderWidth: 2,
                borderColor: 'rgb(255, 205, 86)',
                backgroundColor: 'rgb(54, 162, 235)',
                yAxisID: 'y-axis-1',
                fill: false,
                data: [200,450,150,750]
            }, {
                type: 'line',
                label: 'Số lượng KH',
                borderWidth: 2,
                borderColor: 'rgb(201, 203, 207)',
                backgroundColor: 'rgb(255, 159, 64)',
                yAxisID: 'y-axis-1',
                fill: false,
                data: [120,240,310,840]
            }]
        },
        options: {
            responsive: true,
            title: {
                display: false,
                text: 'Biểu đồ so sánh kế hoạch và thực tế'
            },
            tooltips: {
                mode: 'index',
                intersect: true,
                enabled: false
            },
            animation: {
                onComplete: function () {
                    var ctx = this.chart.ctx;
                    ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontFamily, 'normal', Chart.defaults.global.defaultFontFamily);
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'bottom';
                    ctx.fillStyle = "#444";
                    this.data.datasets.forEach(function (dataset)
                    {
                        for (var i = 0; i < dataset.data.length; i++) {
                            for(var key in dataset._meta)
                            {
                                var model = dataset._meta[key].data[i]._model;
                                ctx.fillText(dataset.data[i], model.x, model.y);
                            }
                        }
                    });
                }
            },
            scales: {
                yAxes: [{
                    type: 'linear',
                    display: true,
                    position: 'left',
                    id: 'y-axis-1',
                    ticks: {
                        beginAtZero: true,
                        suggestedMax: 900
                    }
                }],
            }
        }
    });
}
if ($('#canvas-3').length) {
        var ctx = $('#canvas-3');
        window.myHorizontalBar = new Chart(ctx, {
            type: 'horizontalBar',
            data: {
                labels: ['3/25/2019', '3/26/2019'],
                datasets: [{
                    label: 'Số lượng TT',
                    backgroundColor: 'rgb(54, 162, 235)',
                    borderColor: 'rgb(54, 162, 235)',
                    borderWidth: 1,
                    data: [200,1350]
                }, {
                    label: 'Số lượng KH',
                    backgroundColor: 'rgb(255, 159, 64)',
                    borderColor: 'rgb(255, 159, 64)',
                    data: [220,840]
                }]

            },
            options: {
                elements: {
                    rectangle: {
                        borderWidth: 2,
                    }
                },
                responsive: true,
                legend: {
                    position: 'right',
                },
                title: {
                    display: false,
                    text: 'Chart.js Horizontal Bar Chart'
                },
                tooltips: {
                    mode: 'index',
                    intersect: false,
                    enabled: false
                },
                animation: {
                    onComplete: function () {
                        var ctx = this.chart.ctx;
                        ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontFamily, 'normal', Chart.defaults.global.defaultFontFamily);
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'bottom';
                        ctx.fillStyle = "#fff";
                        this.data.datasets.forEach(function (dataset)
                        {
                            for (var i = 0; i < dataset.data.length; i++) {
                                for(var key in dataset._meta)
                                {
                                    var model = dataset._meta[key].data[i]._model;
                                    ctx.fillText(dataset.data[i], (model.x - 15), (model.y + 8));
                                }
                            }
                        });
                    }
                }
            }
        });
    }
if ($('#canvas-4').length) {
    var ctx = $('#canvas-4');
    window.myBar = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['3/25/2019', '3/26/2019'],
            datasets: [{
                data: [67, 33],
                backgroundColor: ['rgb(255, 159, 64)', 'rgb(54, 162, 235)']
            }]
        },
        options: {
            responsive: true
        }
    });
}
// Chart Product Chanel
    if ($('#product-canvas-1').length) {
        var ctx = $('#product-canvas-1');
        window.myBar = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['3/25/2019', '3/26/2019'],
                datasets: [{
                    type: 'bar',
                    label: 'Số lượng TT',
                    backgroundColor: 'rgb(54, 162, 235)',
                    yAxisID: 'y-axis-1',
                    data: [200,350]
                }, {
                    type: 'bar',
                    label: 'Số lượng KH',
                    backgroundColor: 'rgb(255, 159, 64)',
                    yAxisID: 'y-axis-1',
                    data: [220,840]
                }]
            },
            options: {
                responsive: true,
                title: {
                    display: false,
                    text: 'Biểu đồ so sánh kế hoạch và thực tế'
                },
                tooltips: {
                    mode: 'index',
                    intersect: false,
                    enabled: false
                },
                legend: {
                    position: 'right',
                },
                animation: {
                    onComplete: function () {
                        var ctx = this.chart.ctx;
                        ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontFamily, 'normal', Chart.defaults.global.defaultFontFamily);
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'bottom';
                        ctx.fillStyle = "#fff";
                        this.data.datasets.forEach(function (dataset)
                        {
                            for (var i = 0; i < dataset.data.length; i++) {
                                for(var key in dataset._meta)
                                {
                                    var model = dataset._meta[key].data[i]._model;
                                    ctx.fillText(dataset.data[i], model.x, (model.y + 25));
                                }
                            }
                        });
                    }
                },
                scales: {
                    yAxes: [{
                        type: 'linear',
                        display: true,
                        position: 'left',
                        id: 'y-axis-1',
                        ticks: {
                            beginAtZero: true
                        }
                    }],
                }
            }
        });
    }
    if ($('#product-canvas-2').length) {
        var ctx = $('#product-canvas-2');
        window.myBar = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['3/25/2019', '3/26/2019','3/27/2019', '3/28/2019'],
                datasets: [{
                    type: 'line',
                    label: 'Số lượng TT',
                    borderWidth: 2,
                    borderColor: 'rgb(255, 205, 86)',
                    backgroundColor: 'rgb(54, 162, 235)',
                    yAxisID: 'y-axis-1',
                    fill: false,
                    data: [200,450,150,750]
                }, {
                    type: 'line',
                    label: 'Số lượng KH',
                    borderWidth: 2,
                    borderColor: 'rgb(201, 203, 207)',
                    backgroundColor: 'rgb(255, 159, 64)',
                    yAxisID: 'y-axis-1',
                    fill: false,
                    data: [120,240,310,840]
                }]
            },
            options: {
                responsive: true,
                title: {
                    display: false,
                    text: 'Biểu đồ so sánh kế hoạch và thực tế'
                },
                tooltips: {
                    mode: 'index',
                    intersect: true,
                    enabled: false
                },
                animation: {
                    onComplete: function () {
                        var ctx = this.chart.ctx;
                        ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontFamily, 'normal', Chart.defaults.global.defaultFontFamily);
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'bottom';
                        ctx.fillStyle = "#444";
                        this.data.datasets.forEach(function (dataset)
                        {
                            for (var i = 0; i < dataset.data.length; i++) {
                                for(var key in dataset._meta)
                                {
                                    var model = dataset._meta[key].data[i]._model;
                                    ctx.fillText(dataset.data[i], model.x, model.y);
                                }
                            }
                        });
                    }
                },
                scales: {
                    yAxes: [{
                        type: 'linear',
                        display: true,
                        position: 'left',
                        id: 'y-axis-1',
                        ticks: {
                            beginAtZero: true,
                            suggestedMax: 900
                        }
                    }],
                }
            }
        });
    }
    if ($('#product-canvas-3').length) {
        var ctx = $('#product-canvas-3');
        window.myHorizontalBar = new Chart(ctx, {
            type: 'horizontalBar',
            data: {
                labels: ['3/25/2019', '3/26/2019'],
                datasets: [{
                    label: 'Số lượng TT',
                    backgroundColor: 'rgb(54, 162, 235)',
                    borderColor: 'rgb(54, 162, 235)',
                    borderWidth: 1,
                    data: [200,1350]
                }, {
                    label: 'Số lượng KH',
                    backgroundColor: 'rgb(255, 159, 64)',
                    borderColor: 'rgb(255, 159, 64)',
                    data: [220,840]
                }]

            },
            options: {
                elements: {
                    rectangle: {
                        borderWidth: 2,
                    }
                },
                responsive: true,
                legend: {
                    position: 'right',
                },
                title: {
                    display: false,
                    text: 'Chart.js Horizontal Bar Chart'
                },
                tooltips: {
                    mode: 'index',
                    intersect: false,
                    enabled: false
                },
                animation: {
                    onComplete: function () {
                        var ctx = this.chart.ctx;
                        ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontFamily, 'normal', Chart.defaults.global.defaultFontFamily);
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'bottom';
                        ctx.fillStyle = "#fff";
                        this.data.datasets.forEach(function (dataset)
                        {
                            for (var i = 0; i < dataset.data.length; i++) {
                                for(var key in dataset._meta)
                                {
                                    var model = dataset._meta[key].data[i]._model;
                                    ctx.fillText(dataset.data[i], (model.x - 15), (model.y + 8));
                                }
                            }
                        });
                    }
                }
            }
        });
    }
    if ($('#product-canvas-4').length) {
        var ctx = $('#product-canvas-4');
        window.myBar = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['3/25/2019', '3/26/2019'],
                datasets: [{
                    data: [67, 33],
                    backgroundColor: ['rgb(255, 159, 64)', 'rgb(54, 162, 235)']
                }]
            },
            options: {
                responsive: true
            }
        });
    }
// Chart Hourly
// Chart Product Chanel
    if ($('#hourly-canvas-1').length) {

        var soldout_book_key = $('.data_value').html();
        var soldout_book_value = $('.data_value').attr('data-iteam');
        soldout_book_key = JSON.parse(soldout_book_key);
        soldout_book_value = JSON.parse(soldout_book_value);

        var ctx = $('#hourly-canvas-1');
        window.myBar = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: soldout_book_key,
                datasets: [{
                    type: 'bar',
                    label: 'Sách bán chạy',
                    backgroundColor: 'rgb(255, 132, 124)',
                    borderColor: 'rgb(153, 184, 152)',
                    borderWidth: 2,
                    yAxisID: 'y-axis-1',
                    data: soldout_book_value
                }
                // ,{
                //     type: 'bar',
                //     label: 'Sách không bán được',
                //     backgroundColor: 'rgb(255, 159, 64)',
                //     yAxisID: 'y-axis-1',
                //     data: inventory_book
                // }
                ]
            },
            options: {
                responsive: true,
                title: {
                    display: false,
                    text: 'Biểu đồ so sánh kế hoạch và thực tế'
                },
                tooltips: {
                    mode: 'index',
                    intersect: false,
                    enabled: false
                },
                legend: {
                    position: 'right',
                },
                animation: {
                    onComplete: function () {
                        var ctx = this.chart.ctx;
                        ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontFamily, 'normal', Chart.defaults.global.defaultFontFamily);
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'bottom';
                        ctx.fillStyle = "#fff";
                        this.data.datasets.forEach(function (dataset)
                        {
                            for (var i = 0; i < dataset.data.length; i++) {
                                for(var key in dataset._meta)
                                {
                                    var model = dataset._meta[key].data[i]._model;
                                    ctx.fillText(dataset.data[i], model.x, (model.y + 25));
                                }
                            }
                        });
                    }
                },
                scales: {
                    yAxes: [{
                        type: 'linear',
                        display: true,
                        position: 'left',
                        id: 'y-axis-1',
                        ticks: {
                            beginAtZero: true
                        }
                    }],
                }
            }
        });
    }
    
    if ($('#hourly-canvas-6').length) {
        var ctx = $('#hourly-canvas-6');
       var sell_book_key = $('.array_date').html();
        var bestsell_book = $('.array_date').attr('data-iteam');

        sell_book_key = JSON.parse(sell_book_key);
        bestsell_book = JSON.parse(bestsell_book);
        window.myHorizontalBar = new Chart(ctx, {
            type: 'horizontalBar',
            data: {
                labels: sell_book_key,
                datasets: [{
                    label: 'Sách bán chạy',
                    backgroundColor: 'rgb(255, 132, 124)',
                    borderColor: 'rgb(153, 184, 152)',
                    borderWidth: 2,
                    data: bestsell_book
                }, 
                // {
                //     label: 'Số lượng KH',
                //     backgroundColor: 'rgb(255, 159, 64)',
                //     borderColor: 'rgb(255, 159, 64)',
                //     data: [220,840]
                // }
                ]

            },
            options: {
                elements: {
                    rectangle: {
                        borderWidth: 2,
                    }
                },
                responsive: true,
                legend: {
                    position: 'right',
                },
                title: {
                    display: false,
                    text: 'Chart.js Horizontal Bar Chart'
                },
                tooltips: {
                    mode: 'index',
                    intersect: false,
                    enabled: false
                },
                animation: {
                    onComplete: function () {
                        var ctx = this.chart.ctx;
                        ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontFamily, 'normal', Chart.defaults.global.defaultFontFamily);
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'bottom';
                        ctx.fillStyle = "#fff";
                        this.data.datasets.forEach(function (dataset)
                        {
                            for (var i = 0; i < dataset.data.length; i++) {
                                for(var key in dataset._meta)
                                {
                                    var model = dataset._meta[key].data[i]._model;
                                    ctx.fillText(dataset.data[i], (model.x - 15), (model.y + 8));
                                }
                            }
                        });
                    }
                }
            }
        });
    }
    if ($('#hourly-canvas-2').length) {
        var ctx = $('#hourly-canvas-2');
        var array_date = $('.array_date').html();
        var data_value = $('.data_value').html();
        var array_dateobj = JSON.parse(array_date);
        var data_valueobj = JSON.parse(data_value);
        console.log(array_dateobj);
        window.myBar = new Chart(ctx, {
            type: 'line',
            data: {
                labels: array_dateobj,
                datasets: [{
                    type: 'line',
                    label: 'Tổng tiền DT',
                    borderWidth: 2,
                    borderColor: 'rgb(255, 159, 64)',
                    backgroundColor: 'rgb(255, 159, 64)',
                    yAxisID: 'y-axis-1',
                    fill: false,
                    data: data_valueobj
                },
                //  {
                //     type: 'line',
                //     label: 'Tổng tiền DT',
                //     borderWidth: 2,
                //     borderColor: 'rgb(201, 203, 207)',rgb(255, 205, 86)
                //     backgroundColor: 'rgb(255, 159, 64)',
                //     yAxisID: 'y-axis-1',
                //     fill: false,
                //     data: [12000,24000,31000,840000,31000,84000,3010]
                // }
                ]
            },
            options: {
                responsive: true,
                title: {
                    display: false,
                    text: 'Biểu đồ so sánh kế hoạch và thực tế'
                },
                tooltips: {
                    mode: 'index',
                    intersect: true,
                    enabled: false
                },
                animation: {
                    onComplete: function () {
                        var ctx = this.chart.ctx;
                        ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontFamily, 'normal', Chart.defaults.global.defaultFontFamily);
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'bottom';
                        ctx.fillStyle = "#444";
                        this.data.datasets.forEach(function (dataset)
                        {
                            for (var i = 0; i < dataset.data.length; i++) {
                                for(var key in dataset._meta)
                                {
                                    var model = dataset._meta[key].data[i]._model;
                                    ctx.fillText(dataset.data[i], model.x, model.y);
                                }
                            }
                        });
                    }
                },
                scales: {
                    yAxes: [{
                        type: 'linear',
                        display: true,
                        position: 'left',
                        id: 'y-axis-1',
                        ticks: {
                            beginAtZero: true
                     
                        }
                    }],
                }
            }
        });
    }

   
    if ($('#hourly-canvas-3').length) {
        var ctx = $('#hourly-canvas-3');
        var inventory_book_key = $('.inventory_book').html();
        var inventory_book = $('.inventory_book').attr('data-iteam');

        inventory_book_key = JSON.parse(inventory_book_key);
        inventory_book = JSON.parse(inventory_book);
        window.myHorizontalBar = new Chart(ctx, {
            type: 'horizontalBar',
            data: {
                labels: inventory_book_key,
                datasets: [{
                    label: 'Sách không bán được',
                    backgroundColor: 'rgb(153, 184, 152)',
                    borderColor: '#FFFF33',
                    borderWidth: 2,
                    data: inventory_book
                }, 
                // {
                //     label: 'Số lượng KH',
                //     backgroundColor: 'rgb(255, 159, 64)',
                //     borderColor: 'rgb(255, 159, 64)',
                //     data: [220,840]
                // }
                ]

            },
            options: {
                elements: {
                    rectangle: {
                        borderWidth: 2,
                    }
                },
                responsive: true,
                legend: {
                    position: 'right',
                },
                title: {
                    display: false,
                    text: 'Chart.js Horizontal Bar Chart'
                },
                tooltips: {
                    mode: 'index',
                    intersect: false,
                    enabled: false
                },
                animation: {
                    onComplete: function () {
                        var ctx = this.chart.ctx;
                        ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontFamily, 'normal', Chart.defaults.global.defaultFontFamily);
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'bottom';
                        ctx.fillStyle = "#fff";
                        this.data.datasets.forEach(function (dataset)
                        {
                            for (var i = 0; i < dataset.data.length; i++) {
                                for(var key in dataset._meta)
                                {
                                    var model = dataset._meta[key].data[i]._model;
                                    ctx.fillText(dataset.data[i], (model.x - 15), (model.y + 8));
                                }
                            }
                        });
                    }
                }
            }
        });
    }

    if ($('#hourly-canvas-4').length) {
        var ctx = $('#hourly-canvas-4');
        var soldout_book_key = $('.data_value').html();
        var soldout_book_value = $('.data_value').attr('data-iteam');
        soldout_book_key = JSON.parse(soldout_book_key);
        soldout_book_value = JSON.parse(soldout_book_value);

        window.myBar = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: soldout_book_key,
                datasets: [{
                    data: soldout_book_value,
                    backgroundColor: ['rgb(254, 206, 168)', 'rgb(255, 132, 124)','rgb(232, 74, 95)','rgb(248, 177, 149)','rgb(246, 114, 128)','rgb(153, 184, 152)','rgb(192, 108, 132)']
                }]
            },
            options: {
                responsive: true
            }
        });
    }
}

    $(document).on('click','.list-group',function(){
        $('body').append('<div class="card-load uk-flex uk-flex-center uk-flex-middle"><div class="card-loader"><i class="feather icon-radio rotate-refresh"></i></div></div>');
        // var  formURL = '/olm-admin-php/public/report/adgroup';
        var formURL = $(this).attr('data-action');
        var postData = $('#filter-data').serializeArray();
        var adgroup_id = $(this).attr('data-id');
        $.post(formURL, {post: postData,adgroup_id :adgroup_id }, function(data){
            $('.card-load.uk-flex').remove();
             $( "#myModal .modal-body" ).html(data);
             $('#myModal').modal('show')
        });
    });

    
    $(document).on('click','#ajax_page .page-link',function(){
        $('body').append('<div class="card-load uk-flex uk-flex-center uk-flex-middle"><div class="card-loader"><i class="feather icon-radio rotate-refresh"></i></div></div>');
        var page = $(this).attr('href');
        var postData = $('#filter-data').serializeArray();
        var url = $('#filter-data1').attr('action');
        $.post(url, {post: postData,page :page }, function(data){
            $('.card-load.uk-flex').remove();
             $( "#myModal .modal-body" ).html(data);
             $('#myModal').modal('show')
        });
        return false;
    });


