$(function(){
  
  $("#newModel").click(function(){
    
    var i = $('.colModel').length;
    
    var html = "";
    html += "<div id='model"+i+"' class='col-sm-6 col-md-4 col-lg-3 colModel'>";
    html += "<div class='well'>";
    html += "<p><input type='text' class='form-control' name='modelNames' placeholder='Model Name'></p>";
    html += "<hr>";
    html += "<div class='attrs attrs"+i+"'><div class='attr'><p><input type='text' name='attrName"+i+"' class='form-control attrName' placeholder='Attribute Name'></p>";
    html += "<p><select name='attrType"+i+"' class='form-control attrType'><option value='string'>string</option><option value='int'>int</option></select></p>";
    html += "<p><input type='checkbox' class='attrMulti' name='attrMulti"+i+"'> Multilanguaje  <input type='checkbox' class='attrRequired' name='attrRequired"+i+"'> Required</p>";
    
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
  var html = "";
   html += "<div class='attr'><p><input type='text' name='attrName"+i+"' class='form-control' placeholder='Attribute Name'></p>";
    html += "<p><select name='attrType"+i+"' class='form-control'><option value='string'>string</option><option value='int'>int</option></select></p>";
    html += "<p><input type='checkbox' name='attrMulti"+i+"'> Multilanguaje  <input type='checkbox' name='attrRequired"+i+"'> Required</p>";
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