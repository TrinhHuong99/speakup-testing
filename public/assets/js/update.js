// lấy giá theo chọn sách của hóa đơn
$(document).on('change','.number-book', function(event) {
    var book_id = $('.book_name').val();
    var number = $(this).val();
    var geturlgroup = $('#book_pricetotal').attr('data-action');
     if (book_id !='') {
        $.ajax({
                  "type": "POST",
                  "url": geturlgroup,
                  "data": {book_id: book_id,number: number},
                  "success": function (res) {
                    $( ".total-1" ).html(res);
                  }
            });
      }else{
        alert('Hãy chọn sách trước khi chọn số lượng!');
      }
});

$(document).on('change', '.book_name', function(event) {
    var book_id = $('.book_name').val();
    var geturlgroup = $('.book_price').attr('data-action');
     if (book_id !='') {
        $.ajax({
                  "type": "POST",
                  "url": geturlgroup,
                  "data": {book_id: book_id},
                  "success": function (res) {
                    $( ".price-1" ).html(res);
                  }
            });
      }else{
        alert('Hãy chọn đúng tên sách !');
      }
});
$(document).on('change', '#selectedtest', function(event) {
    var book_id = $(this).val();
    var geturlgroup = $('.book_price').attr('data-action');
     if (book_id !='') {
        $.ajax({
                  "type": "POST",
                  "url": geturlgroup,
                  "data": {book_id: book_id},
                  "success": function (res) {
                    $( ".price-bills" ).html(res);
                  }
            });
      }else{
        alert('Hãy chọn đúng tên sách !');
      }
});
$(document).on('change', '.discount', function(event) {
    var discount_per = $(this).val();
    var book_id = $('#selectedtest').val();
    var geturlgroup = $('.book_discount').attr('data-action');
     if (book_id !='') {
        $.ajax({
                  "type": "POST",
                  "url": geturlgroup,
                  "data": {discount_per: discount_per,book_id: book_id},
                  "success": function (res) {
                    $( ".total-price" ).html(res);
                  }
            });
      }else{
        alert('Hãy chọn đúng tên sách !');
      }
});

// $(document).on('click', '.edit-bil', function(event) {

    // var contenmail = $('.contenmail').val();

//     var price = $('.price-1').val();
//     var geturlgroup = $('#create_orders').attr('action');
//     console.log(geturlgroup);
    // console.log('contenmail');
    // console.log(contenmail);
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
