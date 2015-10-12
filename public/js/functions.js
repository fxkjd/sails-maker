$(function(){
  
  $("#newModel").click(function(){
    
    var i = $('.colModel').length;
    
    var html = "";
    html += "<div class='col-sm-4 col-md-3 colModel'>";
    html += "<div class='well'>";
    html += "<p>Model "+i+" name: <input type='text' name='modelNames'></p>";
    
    html += "<p>-----------</p>"
    
    html += "<div class='attrs attrs"+i+"'><div class='attr'><p>Attr "+i+" name: <input type='text' name='attrName"+i+"'></p>";
    html += "<p>Attr "+i+" type: <input type='text' name='attrType"+i+"'></p>";
    html += "<p>Attr "+i+" multilanguaje: <input type='checkbox' name='attrMulti"+i+"'></p>";
    
    html += "<p>-----------</p></div>";
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
   html += "<div class='attr'><p>Attr "+i+" name: <input type='text' name='attrName"+i+"'></p>";
    html += "<p>Attr "+i+" type: <input type='text' name='attrType"+i+"'></p>";
    html += "<p>Attr "+i+" multilanguaje: <input type='checkbox' name='attrMulti"+i+"'></p>";
    
    html += "<p>-----------</p></div>"
  $('.attrs' + id).append(html);
}