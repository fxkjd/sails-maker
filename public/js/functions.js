$(function(){
  
  //AJAX FORM
  $("#form").submit(function(e){
    //code here
    //var f = $( this ).serializeJSON();
    var f = $(this).toObject();
    console.log(f);
    
    $.ajax({
      url: '/createPage',
      type: 'POST',
      data: JSON.stringify(f),
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      async: false,
      success: function(msg) {
          alert(msg);
      }
    });
    
    
    return false;
  });
  
  $("#newModel").click(function(){
    
    var i = $('.colModel').length;
    
    var html = "";
    html += "<input type='hidden' value='0' name='models["+i+"].attr[0].multi'>";
    html += "<input type='hidden' value='0' name='models["+i+"].attr[0].required'>";
    
    html += "<div id='model"+i+"' class='col-sm-6 col-md-4 col-lg-3 colModel'>";
    html += "<div class='well'>";
    html += "<p><input type='text' class='form-control' name='models["+i+"].name' placeholder='Model Name'></p>";
    html += "<hr>";
    html += "<div class='attrs attrs"+i+"'><div class='attr'><p><input type='text' name='models["+i+"].attr[0].name' class='form-control attrName' placeholder='Attribute Name'></p>";
    html += "<p><select name='models["+i+"].attr[0].type' class='form-control attrType'><option value='string'>string</option><option value='int'>int</option></select></p>";
    
    html += "<p><input type='checkbox' class='attrMulti' value='1' name='models["+i+"].attr[0].multi'> Multilanguaje  <input type='checkbox' class='attrRequired' value='1' name='models["+i+"].attr[0].required'> Required</p>";
    
    
    
    html += "<hr></div>";
    html += "</div>";
    
    html += "<p><a href='javascript:void(0)' class='btn btn-default btn-xs' onclick='addAttr("+i+")'>Add other attribute</a></p>";
    html += "<p><a href='javascript:void(0)' onclick='delModel("+i+")'>Delete model</a></p>";
    html += "</div>";
    html += "</div>";
    
    $("#models").append(html);
    
  });
  
});

function addAttr(i){
  var n = $("#model"+i+" .attr").length;
  var html = "";
  html += "<input type='hidden' value='0' name='models["+i+"].attr["+n+"].multi'>";
  html += "<input type='hidden' value='0' name='models["+i+"].attr["+n+"].required'>";
  
  html += "<div class='attr'><p><input type='text' name='models["+i+"].attr["+n+"].name' class='form-control' placeholder='Attribute Name'></p>";
  html += "<p><select name='models["+i+"].attr["+n+"].type' class='form-control'><option value='string'>string</option><option value='int'>int</option></select></p>";
  html += "<p><input type='checkbox' value='0' name='models["+i+"].attr["+n+"].multi'> Multilanguaje  <input type='checkbox' name='models["+i+"].attr["+n+"].required' value='1'> Required</p>";
  html += "<p><a href='javascript:void(0)' onclick='delAttr(this)'>Delete attribute</a></p>";
    
  html += "<hr></div>"
  $('.attrs' + i).append(html);
}

function delModel(i){
  //Remove
  $("#model"+i).remove();
  
  //Update all inputs names
  var i = $('.colModel').length;
  
  $( ".attrName" ).each(function( index ) {
    $( this ).attr("name", "attrName"+index);
  });
  
  $( ".attrType" ).each(function( index ) {
    $( this ).attr("name", "attrType"+index);
  });
  
  $( ".attrMulti" ).each(function( index ) {
    $( this ).attr("name", "attrMulti"+index);
  });
  
  $( ".attrRequired" ).each(function( index ) {
    $( this ).attr("name", "attrRequired"+index);
  });
  
  //DONE
}

function delAttr(e){
  $(e).closest('div').remove();
}