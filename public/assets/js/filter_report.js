
// báo cáo doanh thu
$('#filterbills').on('submit',function(){
    $('body').append('<div class="card-load uk-flex uk-flex-center uk-flex-middle"><div class="card-loader"><i class="feather icon-radio rotate-refresh"></i></div></div>');
    var _this = $(this);
    var postData = _this.serializeArray();
    var formURL = _this.attr('action');
    $.post(formURL, {post: postData}, function(data){
        $('.card-load.uk-flex').remove();
        // var json = JSON.parse(data);
        // $('#result_filter tbody').html('').html(json.html);
        // $('#pagination_filter').html('').html(json.page);
    });
    return false;
});

// $(document).on('click', '.xembaocao', function(event) {

//     var date_start = $('.date-start').val();
//     var date_end = $('.date-end').val();

//     var price = $('.price-1').val();
//     var geturlgroup = $('#create_orders').attr('action');
//     console.log(geturlgroup);
//     console.log('contenmail');
//     console.log(contenmail);
//     console.log(total_price);
//         // if (book_id !='') {
//         //   $.ajax({
//         //             "type": "POST",
//         //             "url": geturlgroup,
//         //             "data": {book_id: book_id},
//         //             "success": function (res) {
//         //               $( ".price-1" ).html(res);
//         //             }
//         //       });
//         // }else{
//         //   alert('Hãy chọn đúng tên sách !');
//         // }
// });
