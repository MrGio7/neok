"use strict";document.addEventListener("click",t=>{let e=document.getElementById("taskDetailDialog");e.contains(t.target)||e.close()});document.addEventListener("closeTaskDetailDialog",t=>{let e=document.getElementById("taskDetailDialog"),a=e.querySelector("form");e.close(),a.reset()});
