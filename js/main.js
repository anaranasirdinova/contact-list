// <!--Проект № 1
// Контактная книжка: -->

// Используйте этот код  для запуска терминала
// json-server --watch ./db/db.json --port 8000

let first_name = $(".first-name");
let last_name = $(".last-name");
let phone = $(".phone");
let btn = $(".btn");
let inp = $("input");
let list = $(".list");
let search_contact=$('.search-contact');
let table=$('.contacts-list tbody');
render();

//  ввод данных
btn.on("click", function() {
  let contact = {
    first_name: first_name.val(),
    last_name: last_name.val(),
    phone: phone.val()
  }
  if (inp.val() === "") {
    alert("Заполните поля!");
    return;
  }

  //   Post;
  $.ajax({
    method: "post",
    url: "http://localhost:8000/contacts",
    data: contact,
    success:render
  })
  inp.val('');
});

//DELETE
$(".list").on("click", ".btn-del", function(e) {
  let id = $(e.target).attr("data-id");
  let confirmation = confirm("Вы уверенны,что хотите удалить контакт?");
  if (confirmation) {
    $.ajax({
      method: "delete",
      url: `http://localhost:8000/contacts/${id}`,
      success: render
    });
  }
});

//ВЫЗОВ МОДАЛКИ
$(".list").on("click", ".btn-edit", function(e) {
  e.preventDefault();
  let id = $(e.target).attr("data-id");
  $(".modal-form").attr("data-id", id);
  // $(".modal-form").fadeIn();
  $(".modal-form").toggleClass("modal-form_2");
  $(".main-wrapper").toggleClass("main-wrapper_2");
  $.ajax({
    method: "get",
    url: `http://localhost:8000/contacts/${id}`,
    success: function(data) {
      let i = 0;
      for (let key in data) {
        $(`.modal-form .${key}`).val(data[key]);
      }
    }
  });
});

// закрытие по крестику
$(document).on('click', '#close', function(e){
  let id = $(e.target).attr('data-id');
  $(".modal-form").toggleClass("modal-form_2");
  $(".main-wrapper").toggleClass("main-wrapper_2");
})

// закрытие по клику вне окна
$(document).mouseup(function(e){
  let popup = $('.modal-bord');
  if (e.target!=popup[0]&&popup.has(e.target).length === 0){
    $(".modal-form_2").toggleClass("modal-form_2");
    $(".main-wrapper_2").toggleClass("main-wrapper");
    $(".main-wrapper_2").css('filter', 'none');
  }
})


// ИЗМЕНЕНИЯ В МОДАЛКЕ
$(".modal-form").on("submit", function(e) {
  e.preventDefault();
  let id = $(".modal-form").attr("data-id");
  let data = $(".modal-form").serialize();
  $.ajax({
    method: "patch",
    url: `http://localhost:8000/contacts/${id}`,
    data: data,
    success: () => {
      $(".modal-form").keydown(function(e) {
        if (e.keyCode === 13) {
          $(".modal-form").toggleClass("modal-form_2");
          $(".main-wrapper").toggleClass("main-wrapper_2");
        }
      });
      render();
    }
  });
});

// Get
function render() {
  $.ajax({
    method: "get",
    url: "http://localhost:8000/contacts",
    success: function(data) {
      $(".list").html("");
      data.forEach(item => {
        $(".list").append(`
          <tr data-id="${item.id}">
            <td class="item-info" data-about="firstName">${item.first_name}</td>
            <td class="item-info" data-about="lastName">${item.last_name}</td>
            <td class="item-info" data-about="phone">${item.phone}</td>
            <td>
            <button class="btn-del" data-id="${item.id}">Удалить</button>
            </td>
            <td>
            <button class="btn-edit" data-id="${item.id}">Настройка</button>
            </td>
          </tr>`);
      });
    }
  });
}

// $(".modal-form").keydown(function(e) {
//   if (e.keyCode === 13) {
//     $(".modal-form").toggleClass("modal-form_2");
//     $(".main-wrapper").toggleClass("main-wrapper_2");
//   }
// });

// $(".btn-modal").on("click", function(e) {
//    if (e.target !== e.currentTarget) return;
//    $(".modal-form").toggleClass("modal-form_2");
//    $(".main-wrapper").toggleClass("main-wrapper_2");
//  })

// Поиск контактов

$(".search-contact").on("keyup", function() {
  let valik = $(this).val().toLowerCase(); 
  let tr = $(table).find("tr");

  for (i = 0; i < tr.length; i++) { 
    let name = $(tr[i]).find("td")[0]; 
    
    if (name) { 
      let txtValue = name.innerText; 

      if (txtValue.toLowerCase().indexOf(valik) > -1) { 
        $(tr[i]).show() 
      } else {
        $(tr[i]).hide() 
      }
    }
  }
});

// чисто ради прикола 

$(document).on('click', '.dop-fun', function(e){
  $('.dop-fun1').fadeIn();
  $('.dop-fun1').css('display', 'block');
  $('.wrapper').css('display', 'none');
  $('.poiskovik').css('display', 'none');
  $('.prikol').css('display', 'none');
  $('.contacts-list').css('display', 'none');
})