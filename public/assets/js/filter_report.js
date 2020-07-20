
// báo cáo doanh thu
$('#filter-data').on('submit',function(){
    $('body').append('<div class="card-load uk-flex uk-flex-center uk-flex-middle"><div class="card-loader"><i class="feather icon-radio rotate-refresh"></i></div></div>');
    var _this = $(this);
    var postData = _this.serializeArray();
    var formURL = _this.attr('action');
    console.log(postData);
    console.log(formURL);
    $.post(formURL, {post: postData}, function(data){
        $('.card-load.uk-flex').remove();
        $('.render-filter').html(data);
            if (_this.hasClass('load_account_report')) {
                canvas_2();
            }
            if (_this.hasClass('load_book_report')) {
                thong_ke_sach();
            }
    });
    return false;
});

function canvas_2(){
    if ($('#hourly-canvas-2').length) {
        var ctx = $('#hourly-canvas-2');
        var array_date = $('.array_date').html();
        var data_value = $('.data_value').html();
        var array_dateobj = JSON.parse(array_date);
        var data_valueobj = JSON.parse(data_value);
        console.log(data_value);
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
}

function thong_ke_sach(){
 if ($('#hourly-canvas-1').length) {

        var sell_book_key = $('.array_date').html();
        var bestsell_book = $('.array_date').attr('data-iteam');

        sell_book_key = JSON.parse(sell_book_key);
        bestsell_book = JSON.parse(bestsell_book);

        var ctx = $('#hourly-canvas-1');
        window.myBar = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: sell_book_key,
                datasets: [{
                    type: 'bar',
                    label: 'Sách bán chạy',
                    backgroundColor: 'rgb(255, 132, 124)',
                    borderColor: 'rgb(153, 184, 152)',
                    borderWidth: 2,
                    yAxisID: 'y-axis-1',
                    data: bestsell_book
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
// end báo cáo doanh thu
