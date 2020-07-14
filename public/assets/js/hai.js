'use strict';
$(document).on('change', '#teachercheck', function(event) {
    // alert("111");
    var checked = "";
    var idData = $(this).is(':checked');
    // console.log(idData);
    var geturl = $(this).attr('geturl');
    // alert(geturl);
    $.ajax({
        type: 'post',
        url: geturl,
        data :{ active: idData},
        success: function () {
        }
    });
    return true;
});

$(document).on('click', '#athea', function(event) {
    var val = $(this).data('teacher');
    var id = $(this).find('i').attr('id');
    var geturl = $(this).attr('geturl1');
    $.ajax({
        type: 'post',
        url: geturl,
        data :{ active: val},
        success: function () {
            // window.location.reload();
            if ($('#' + id).hasClass("fa fa-eye")) {
                $('#' + id).removeClass("fa fa-eye").addClass("fa fa-eye-slash")
                alert("Ẩn giáo viên thành công")
            } else {
                $('#' + id).removeClass("fa fa-eye-slash").addClass("fa fa-eye")
                alert("Hiện giáo viên thành công")
            }
        }
    });
    return true;
});



$('#confirm-delete').on('show.bs.modal', function(e) {
    $(this).find('.btn-ok').attr('href', $(e.relatedTarget).data('href'));
});


$(document).ready(function() {

    /*--------------------------------------
         Notifications & Dialogs
     ---------------------------------------*/
    /*
     * Notifications
     */
    function notify(from, align, icon, type, animIn, animOut,title, msg){
        $.growl({
            icon: icon,
            title: title,
            message: msg,
            url: ''
        },{
            element: 'body',
            type: type,
            allow_dismiss: true,
            placement: {
                from: from,
                align: align
            },
            offset: {
                x: 30,
                y: 30
            },
            spacing: 10,
            z_index: 999999,
            delay: 2500,
            timer: 1000,
            url_target: '_blank',
            mouse_over: false,
            animate: {
                enter: animIn,
                exit: animOut
            },
            icon_type: 'class',
            template: '<div data-growl="container" class="alert" role="alert">' +
                '<button type="button" class="close" data-growl="dismiss">' +
                '<span aria-hidden="true">&times;</span>' +
                '<span class="sr-only">Close</span>' +
                '</button>' +
                '<span data-growl="icon"></span>' +
                '<span data-growl="title"></span>' +
                '<span data-growl="message"></span>' +
                '<a href="#" data-growl="url"></a>' +
                '</div>'
        });
    };

    $('.notifications .btn').on('click',function(e){
        e.preventDefault();
        var nFrom = $(this).attr('data-from');
        var nAlign = $(this).attr('data-align');
        var nIcons = $(this).attr('data-icon');
        var nType = $(this).attr('data-type');
        var nAnimIn = $(this).attr('data-animation-in');
        var nAnimOut = $(this).attr('data-animation-out');

        notify(nFrom, nAlign, nIcons, nType, nAnimIn, nAnimOut,"Bạn đã thay đổi trạng thái thành công");
    });

});



$(document).ready(function() {
    $.validator.addMethod(
        "required",
        function(value, element) {
            return ($.trim(value) != '');
        },
        'Không được bỏ trống!'
    );
    $.validator.addMethod(
        "textname",
        function(value, element) {
            var re = new RegExp(/^[A-Za-z0-9]+$/);
            //var re = new RegExp(/^[ァ-ンｧ-ﾝﾞﾟー ]*$/);
            return this.optional(element) || re.test(value);
        },
        'Không được chứa ký tự đặc biệt'
    );
    $.validator.addMethod(
        "checkemail",
        function(value, element) {
            var re = new RegExp(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);
            //var re = new RegExp(/^[ァ-ンｧ-ﾝﾞﾟー ]*$/);
            return this.optional(element) || re.test(value);
        },
        'Không được chứa ký tự đặc biệt'
    );

    $("#crete_teacher").validate({
        onfocusout: function(e)
        {  // this option is not needed
            this.element(e);       // this is the default behavior
        },
        rules: {
            txtcode: {
                required: true,
                maxlength: 20,
                textname: true,
            },

            txtfullname: {
                required: true,

            },

            txtphone: {
                required: true,
                number:true,
                minlength: 10,
                maxlength: 13,

            },

            txtaddress: {
                required: true,

            },

            txtemail: {
                email: true,
                maxlength: 50,
                checkemail: true,
            },

        },
        messages: {
            txtcode: {
                required: "Mã giáo viên không được để trống",
                maxlength: "Mã giáo viên tối đa 20 kí tự",
                textname: "Mã giáo viên chỉ bao gồm các ký tự chữ và số"
            },

            txtfullname: {
                required: "Tên giáo viên không được để trống",
            },

            txtphone: {
                required: "Số điện thoại không được trống",
                number : "Số điện thoại phải là số",
                minlength: "Số điện thoại tối thiểu 10 kí tự",
                maxlength: "Số điện thoại tối đa 13 kí tự",

            },

            txtaddress: {
                required: "Địa chỉ không được trống",
            },
            txtemail: {
                email:"Email không đúng định dạng",
                maxlength:"Email tối đa được 50 ký tự",
                checkemail: "Email không hợp lệ"
            },
        },

        submitHandler: function(form) {
            // $('#crete_teacher').on('submit', function(e) {

                // e.preventDefault(); // Now nothing will happen
                var geturl = $(form).find('input').attr('geturl1');
                $.ajax({
                    "type": "POST",
                    "url": geturl,
                    "data": {code: $('#kemtratrung').val()},
                    "success": function (ret) {
                        if (ret == 1) {
                            $('#kemtratrung').parent().find('p').remove();
                            // $(form).attr('id', "fdfdfd");
                            // $('#fdfdfd').submit();
                            form.submit();
                        } else {
                            $('#kemtratrung').parent().find('p').remove()
                            $('#kemtratrung').parent().append('<p id="themmoi" style="color: red; font-size: 15px; margin-top: 15px;margin-bottom: -3px;">Mã giáo viên đã tồn tại</p>')
                            $('#kemtratrung').focus() //tự động trỏ chuột tới nếu mà xuất hiện lỗi
                        }
                    }
                });
                // return false;
            // })
        },

    });

    $("#edit_teacher").validate({
        onfocusout: function(e)
        {  // this option is not needed
            this.element(e);       // this is the default behavior
        },
        rules: {
            txtcode: {
                required: true,
                maxlength: 20,
            },

            txtfullname: {
                required: true,

            },

            txtphone: {
                required: true,
                number:true,
                minlength: 10,
                maxlength: 13,

            },

            txtaddress: {
                required: true,

            },

            txtemail: {
                email: true,
                maxlength: 50,
                checkemail: true,
            },

        },
        messages: {
            txtcode: {
                required: "Mã giáo viên không được để trống",
                maxlength: "Mã giáo viên tối đa 20 kí tự",
            },

            txtfullname: {
                required: "Tên giáo viên không được để trống",
            },

            txtphone: {
                required: "Số điện thoại không được trống",
                number : "Số điện thoại phải là số",
                minlength: "Số điện thoại tối thiểu 10 kí tự",
                maxlength: "Số điện thoại tối đa 13 kí tự",

            },

            txtaddress: {
                required: "Địa chỉ không được trống",
            },

            txtemail: {
                email:"Email không đúng định dạng",
                maxlength:"Email tối đa được 50 ký tự",
                checkemail: "Email không hợp lệ"
            },
        }
    });
});
function keydownFunction() {
    document.getElementById("themmoi").remove()
}


$(document).on('click', '#lknn', function(event) {
    var val = $(this).data('book');
    var geturl = $(this).attr('geturlbook');
    if (val !='') {
        $.ajax({
                "type": "POST",
                "url": geturl,
                "data": {databook: val},
                "success": function (res) {

                    let job = JSON.parse(res);
                    let html = '';
                    html = '';
                        $.each(job,function(index, val) {
                            // console.log(val);
                            html += '<tr style="text-align: center">'
                            html+='<td >' + (index+1) +'</td>';
                            html+='<td>' + val.bill_code +'</td>';
                            html+='<td>' + val.total_price +'</td>';
                            html+='<td>' + val.book_name +'</td>';
                            // html+='<td style="text-align: center">' + val.class_id +'</td>';
                            html+='</tr>';
                        });
                        $(' #listitembook').html(html);
                        $('hai').html(html);
                    // $('.hai').modal('show');

                }
            });
      }
});