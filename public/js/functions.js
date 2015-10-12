$(function(){
  
  $("#newModel").click(function(){
    
    var i = $('.colModel').length;
    
    var html = "";
    html += "<div class='col-sm-6 col-md-4 col-lg-3 colModel'>";
    html += "<div class='well'>";
    html += "<p><input type='text' class='form-control' name='modelNames' placeholder='Model Name'></p>";
    html += "<hr>";
    html += "<div class='attrs attrs"+i+"'><div class='attr'><p><input type='text' name='attrName"+i+"' class='form-control' placeholder='Attribute Name'></p>";
    html += "<p><select name='attrType"+i+"' class='form-control'><option value='string'>string</option><option value='int'>int</option></select></p>";
    html += "<p><input type='checkbox' name='attrMulti"+i+"'> Multilanguaje  <input type='checkbox' name='attrRequired"+i+"'> Required</p>";
    
    html += "<hr></div>";
    html += "</div>";
    
    html += "<p><a href='javascript:void(0)' class='btn btn-default btn-xs' onclick='addAttr("+i+")'>Add other attribute</a></p>";
    html += "</div>";
    html += "</div>";
    
    $("#models").append(html);
    
  });
  
});

function addAttr(id){
  //var i = $('.attrs .attr').length + 1;
  //var i = $('.colModel').length + 1;
  var i = id;
  
  var html = "";
   html += "<div class='attr'><p><input type='text' name='attrName"+i+"' class='form-control' placeholder='Attribute Name'></p>";
    html += "<p><select name='attrType"+i+"' class='form-control'><option value='string'>string</option><option value='int'>int</option></select></p>";
    html += "<p><input type='checkbox' name='attrMulti"+i+"'> Multilanguaje  <input type='checkbox' name='attrRequired"+i+"'> Required</p>";
    
    html += "<hr></div>"
  $('.attrs' + id).append(html);
}