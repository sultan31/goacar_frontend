// ========preloader==========
//preloader
window.addEventListener('load', function () {
    $('.pre_loader').css('display', 'none');
})



/*=============== CHANGE BACKGROUND HEADER ===============*/
function scrollHeader() {
    const header = document.getElementById('header')
    // When the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
    if (this.scrollY >= 50) {
        $("#header").css('background-color', 'white');
        $("#header").css('box-shadow', 'rgba(0, 0, 0, 0.15) 0px 5px 15px 0px');
        $("#header .logo").css('color', 'var(--clr-blue)');


    } else {
        $("#header").css('background-color', 'transparent');
        $("#header").css('box-shadow', 'none');
        $("#header .logo").css('color', 'white')
    }
}
window.addEventListener('scroll', scrollHeader)

if (window.scrollY >= 50) {
    $("#header").css('background-color', 'white');
    $("#header").css('box-shadow', 'rgba(0, 0, 0, 0.15) 0px 5px 15px 0px');
    $("#header .logo").css('color', 'var(--clr-blue)');
}



// --------------------------------CTO---------------------------------
function ctoSlide() {
    const header = document.getElementById('cto_container')
    
    var hT = $('footer').offset().top -300,
       hH = $('footer').outerHeight(),
       wH = $(window).height(),
       wS = $(window).scrollTop();
       
       
    // When the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
    if (this.scrollY > 250 && wS<(hT+hH-wH)) {
        $(".cto_container").css('right', '2rem');
    } else {
        $(".cto_container").css('right', '-5rem');
    }
}
window.addEventListener('scroll', ctoSlide)




// ======================Menu=====================
$("#menu-btn").click(function () {
    $(".navbar").css('top', '0');
})

$("#close-btn").click(function () {
    $(".navbar").css('top', '-400%');
})





/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')

function scrollActive() {
    const scrollY = window.pageYOffset

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 200;
        sectionId = current.getAttribute('id')

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.navbar a[href*=' + sectionId + ']').classList.add('active-link')
        } else {
            document.querySelector('.navbar a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)




$(document).ready(function () {



    $(function () {
        $("#pick_d").datepicker();

        currentDate = new Date();
        $("#pick_d").datepicker("option", "minDate", currentDate);
    });

    $(function () {
        $("#drop_d").datepicker({});

        currentDate = new Date();
        $("#drop_d").datepicker("option", "minDate", currentDate);
    });

    $('#pick_d').change(function () {
        startDate = $(this).datepicker('getDate');
        $("#drop_d").datepicker("option", "minDate", startDate);
    })

    $('#drop_d').change(function () {
        // endDate = $(this).datepicker('getDate');
        // $("#pick_d").datepicker("option", "maxDate", endDate);
    })

    $(function () {
        $("#pick_t").timepicker({
            timeFormat: 'h:mm p',
            interval: 30,
            startTime: '00:00',
            dynamic: false,
            dropdown: true,
            scrollbar: true
        });
    });

    $(function () {
        $("#drop_t").timepicker({
            timeFormat: 'h:mm p',
            interval: 30,
            startTime: '00:00',
            dynamic: false,
            dropdown: true,
            scrollbar: true
        });
    });

})



// ================Modal=============================================================
// ====================================================================================

// Get the modal
var modal = document.getElementById("myModal");


// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close1")[0];


// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}



// When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// }



// ==============================Res-Form1==================================
$("#reservation_form").submit(function (e) {
    e.preventDefault();

    var carType = $("#car-select").val();
    var pickupLoc = $("#pick-up-location").val();
    var dropLoc = $("#drop-off-location").val();
    
    var pickDate = $("#pick_d").val();
    var pickTime = $("#pick_t").val();
    var dropDate = $("#drop_d").val();
    var dropTime = $("#drop_t").val();

    //changin date format from mm/dd/yyyy to dd month yyyy
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    var pickDay = pickDate.substr(3, 2);
    var pickMonth = pickDate.substr(0, 2);
    if (pickMonth.substr(0, 1) == "0") {
        pickMonth = pickMonth.substr(1, 1);
    }
    var pickYear = pickDate.substr(6, 9);

    var dropDay = dropDate.substr(3, 2);
    var dropMonth = dropDate.substr(0, 2);
    if (dropMonth.substr(0, 1) == "0") {
        dropMonth = dropMonth.substr(1, 1);
    }
    var dropYear = dropDate.substr(6, 9);

    pickDate = pickDay + " " + months[pickMonth - 1] + " " + pickYear;
    dropDate = dropDay + " " + months[dropMonth - 1] + " " + dropYear;


    //setting values in confirm form
    $(".data_content.car_type").html(carType);
    $("#carType").val(carType)

    $(".data_content.pick_loc").html(pickupLoc);
    $("#pickLocation").val(pickupLoc);

    $(".data_content.drop_loc").html(dropLoc);
    $("#dropLocation").val(dropLoc);
    

    $(".data_content.pick_dt").html(pickDate + " at " + pickTime);
    $("#pickDateTime").val(pickDate + " at " + pickTime);

    $(".data_content.drop_dt").html(dropDate + " at " + dropTime);
    $("#dropDateTime").val(dropDate + " at " + dropTime);

    modal.style.display = "block";
})




// ========================Confirm-form=======================
$("#confirm_form").submit(function (e) {
    //prevent page refresh
    e.preventDefault();

    //swapping close buttons
    $(".close1").css('display', 'none');
    $(".close2").css('display', 'block');

    //set token values
    $(".token_name").html($("#confirm_form #name").val());
    $(".token_number").html($("#confirm_form #phone").val());
    $(".token_email").html($("#confirm_form #email").val());
    $(".token_car_type").html($("#confirm_form #carType").val());
    $(".token_pick_loc").html($("#confirm_form #pickLocation").val());
    $(".token_drop_loc").html($("#confirm_form #dropLocation").val());
    $(".token_pick_dt").html($("#confirm_form #pickDateTime").val());
    $(".token_drop_dt").html($("#confirm_form #dropDateTime").val());

    //generating and setting token code
    var num = Math.floor(Math.random() * 90000) + 10000;
    $("#confirm_form #inputCode").val(num);
    $(".token_code").html($("#confirm_form #inputCode").val());
    
    // setting whatsapp confirmation button href
     $(".btn_whatsapp_confirmation").prop("href", "https://api.whatsapp.com/send?phone=+919867344336&text=Hello%20I%20want%20to%20confirm%20my%20booking%20for,%0a"
        +$("#confirm_form #carType").val()
        +"%0afrom%20"+$("#confirm_form #pickDateTime").val()
        +"%0ato%20"+$("#confirm_form #dropDateTime").val()
        +"%0a*My%20Token%20Code%20is%20-%20"+$("#confirm_form #inputCode").val()+"*");




    //Make a POST request
    $.ajax({
                dataType: "JSON",
                url: "libraries/sendEmailForm.php",
                type: "POST",
                data: $("#confirm_form").serialize(),
                beforeSend: function(xhr){
                    $("#checkout2").html("Confirming...");
                    $("#checkout2").attr("disabled", "true");
                    
                },
                success: function(resp){
                    if(resp){
                        if(resp['signal'] == "ok"){                             //mail sent successfully function
                        
                        //show success div and hide form div
                            $(".modal_data_container").css("display", "none");
                            $(".success_modal_container").css("display", "flex");
                        
                            //generating and downloading token image
                            var container = document.getElementById("token");
                            container.style.display = "block";
                            html2canvas(container, { allowTaint: false }).then(function (canvas) {
                                
                                var link = document.createElement("a");
                                document.body.appendChild(link);
                                link.download = "Toekn-GoaCarRentalService.png";
                                
                                var dataURL = canvas.toDataURL();
                                
                                link.href = dataURL;
                                link.target = '_blank';
                                link.click();
                    
                                //setting href for download again link
                                $("#download_again").prop('href', dataURL);
                                
                                $("#download_again").trigger('click');
                        
                            });
                            
                        }else{
                            $(".modal_data_container").css("display", "none");
                            $(".error_model_container").css("display", "flex");
                        }
                        
                    }
                },
                error: function(){
                    $(".modal_data_container").css("display", "none");
                    $(".error_model_container").css("display", "flex");
                },
                complete: function(){
                    $("#checkout2").html("Confirm Booking");
                    $("#checkout2").removeAttr("disabled");
                }
            })

})

$(".close2").click(function () {
    modal.style.display = "none";

    $(".modal_data_container").css("display", "block");
    $(".success_modal_container").css("display", "none");
    $(".error_model_container").css("display", "none");

    //swapping close buttons
    $(".close2").css('display', 'none');
    $(".close1").css('display', 'block');

    //reset forms
    $("#confirm_form").trigger("reset");
    $("#reservation_form").trigger("reset");
})


$(".success_modal_container button").click(function () {

    modal.style.display = "none";

    $(".modal_data_container").css("display", "block");
    $(".success_modal_container").css("display", "none");
})




//=====================BOOKING========================
$(".web_booking").click(function () {
    $("#car-select").val($(this).val()).change();

    $('html, body').animate({
        scrollTop: $("#Home").offset().top
    }, 100);

})



// =======================CONTACT FORM==============================
$("#contact_form").submit(function (e) {
    //prevent page refresh
    e.preventDefault();

    //Make a POST request
    $.ajax({
                dataType: "JSON",
                url: "../libraries/sendContactForm.php",
                type: "POST",
                data: $("#contact_form").serialize(),
                beforeSend: function(xhr){
                    $("#contact_submit").html("Sending...");
                    $("#contact_submit").attr("disabled", "true");
                    
                },
                success: function(resp){
                    if(resp){
                        if(resp['signal'] == "ok"){                             //mail sent successfully function
                            //show success div and hide form div
                            $("#contact_form").css("display", "none");
                            $("#con_success").css("display", "flex");
                            
                        }else{
                            $("#contact_form").css("display", "none");
                            $("#con_error").css("display", "flex");
                        }
                        
                    }
                },
                error: function(){
                    $("#contact_form").css("display", "none");
                    $("#con_error").css("display", "flex");
                },
                complete: function(){
                    $('#contact_form').trigger("reset");
                    $("#contact_submit").html("Send");
                    $("#contact_submit").removeAttr("disabled");
                }
            })

})

$(".back_btn").click(function(){
    $("#contact_form").css("display", "flex");
    $("#con_success").css("display", "none");
    $("#con_error").css("display", "none");
})



