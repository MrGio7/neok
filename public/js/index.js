"use strict";var d=document.getElementById("addTaskFormDialog");$(function(){$("#datepicker").datepicker({dateFormat:"D, M dd"}),$("#taskStartDate").datepicker(),$("#addTaskForm").dialog({autoOpen:!1}),$("#showAddTaskFormBtn").click(function(o){$(document).on("click",function(a){console.info(a.target)}),$("#addTaskForm").dialog("open")})});