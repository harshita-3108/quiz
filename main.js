var queNo = 0;
var score = 0;
var jsonQuestionObject;
var totalque;
var userAnswerMap = new Map();

function loadBody() {
  $("#indexBody").load("login.html");
  document.getElementById("id_main_container").style.display = "none";
  

}

function validateUser() {

  var userId = document.getElementById("userId").value;
  var userPass = document.getElementById("passId").value;
  let flag = 0;
  $.get("auth.json", function(jsonDataObject, status) {
    if ((userId == jsonDataObject['uid']) && (userPass == jsonDataObject['upass'])) {
      $("#btnSubmitId").removeClass("btn-danger").addClass("btn-success");
      alert("login success");
      $("#indexBody").load("quizRules.html");
      document.getElementById("id_main_container").style.display = "contents";
      flag = 1;
    } else {
      $("#btnSubmitId").removeClass("btn-success").addClass("btn-danger");
      flag = 0;
      alert("login failed");
      console.log(userId + "-" + jsonDataObject['uid']);
    }
  });

  if (flag == 0) {
    return false;
  } else {
    return true;
  }
}

function startQuiz() {
  var checkTnc = document.getElementById("chktnc");
  if (checkTnc.checked != true) {
    $("#labelCheckTnc").addClass("alert alert-danger");
  } else {
    $("#labelCheckTnc").removeClass("alert alert-danger");
    document.getElementById("id_main_container").style.display = "none";
    $("#indexBody").load("quizQuestions.html", function() {
      loadFirstQuestion();
    });
  }
}

function loadFirstQuestion() {
  
  $.get("quizQuestions.json", function(data) {
    var jsonQuestionObject=JSON.parse(JSON.stringify(data));
    totalque = Object.keys(jsonQuestionObject).length;
    $("#queId").html(jsonQuestionObject[queNo].que);
    $("#opt1Id").html(jsonQuestionObject[queNo].options[0]);
    $("#opt2Id").html(jsonQuestionObject[queNo].options[1]);
    $("#opt3Id").html(jsonQuestionObject[queNo].options[2]);
    $("#opt4Id").html(jsonQuestionObject[queNo].options[3]);
    initlizeUserAnswerMap();
    
  });
}


function initlizeUserAnswerMap() {
  for (var i = 0; i < totalque; i++) {
    userAnswerMap.set(i, undefined);
  }
}

function validateCheck() {
  var checkTnc = document.getElementById("chktnc");
  if (checkTnc.checked == false) {
    $("#labelCheckTnc").addClass("alert alert-danger");
  } else {
    $("#labelCheckTnc").removeClass("alert alert-danger");
  }
}


function nextQuestion() {
  
  $.get("quizQuestions.json", function(data) {
    var jsonQuestionObject=JSON.parse(JSON.stringify(data));
  

      var optionsRadioGroup = document.getElementsByName("ansOption");
      for (var i = 0; i < optionsRadioGroup.length; i++) {
        if (optionsRadioGroup[i].checked == true) {
          userAnswerMap.set(queNo, i);
        }
      }
  
      queNo++;
      if (queNo == totalque - 1) {
        document.getElementById("btnNext").value = "Finish Quiz";
      } else {
        document.getElementById("btnPrev").disabled = false;
      }
      clearAllRadioBtns();

      if (queNo == totalque) {
        $("#indexBody").load("quizResult.html", function() {
          document.getElementById("id_main_container").style.display = "contents";
          insertRowsInTable();
        });
      }




  if (userAnswerMap.get(queNo) != undefined) {
    var optionsRadioGroup = document.getElementsByName("ansOption");
    optionsRadioGroup[userAnswerMap.get(queNo)].checked = true;
  }
  //console.log(jsonQuestionObject);
  (document.getElementById("crtAnsDiv")).style.display = 'none';
  $("#queId").html(jsonQuestionObject[queNo].que);
  $("#opt1Id").html(jsonQuestionObject[queNo].options[0]);
  $("#opt2Id").html(jsonQuestionObject[queNo].options[1]);
  $("#opt3Id").html(jsonQuestionObject[queNo].options[2]);
  $("#opt4Id").html(jsonQuestionObject[queNo].options[3]);
});
}
function previousQuestion() {


  var optionsRadioGroup = document.getElementsByName("ansOption");
  for (var i = 0; i < optionsRadioGroup.length; i++) {
    if (optionsRadioGroup[i].checked == true) {
      userAnswerMap.set(queNo, i);
      document.getElementById("btn" + queNo).className = "btn-circle-answred";
    }
  }
  queNo--;
  if (queNo == 0) {
    document.getElementById("btnPrev").disabled = true;
  } else {
    document.getElementById("btnPrev").disabled = false;
    document.getElementById("btnNext").value = "Next";
  }
  clearAllRadioBtns();


  if (userAnswerMap.get(queNo) != undefined) {
    var optionsRadioGroup = document.getElementsByName("ansOption");
    optionsRadioGroup[userAnswerMap.get(queNo)].checked = true;
  }
  (document.getElementById("crtAnsDiv")).style.display = 'none';
  $.get("quizQuestions.json", function(jsonQuestionObject, status) {
    totalque = Object.keys(jsonQuestionObject).length;

    $("#queId").html(jsonQuestionObject[queNo].que);
    $("#opt1Id").html(jsonQuestionObject[queNo].options[0]);
    $("#opt2Id").html(jsonQuestionObject[queNo].options[1]);
    $("#opt3Id").html(jsonQuestionObject[queNo].options[2]);
    $("#opt4Id").html(jsonQuestionObject[queNo].options[3]);
  });
}

function showAnswer() {
  $.get("quizQuestions.json", function(data) {
    var jsonQuestionObject=JSON.parse(JSON.stringify(data));
  
  (document.getElementById("crtAnsDiv")).style.display = 'block';
  $("#crtAns").html("Correct Answer : " + jsonQuestionObject[queNo].ans);
  });
}

function clearAllRadioBtns() {
  var optionsRadioGroup = document.getElementsByName("ansOption");
  for (var i = 0; i < optionsRadioGroup.length; i++) {
    if (optionsRadioGroup[i].checked == true) {
      optionsRadioGroup[i].checked = false;
    }
  }
}




function insertRowsInTable() {
  $.get("quizQuestions.json", function(data) {
    var jsonQuestionObject=JSON.parse(JSON.stringify(data));
  
  var table = document.getElementById("resultTable");
  for (var i = 0; i < totalque; i++) {
    var row = table.insertRow(i + 1);
    for (var j = 0; j < 3; j++) {
      var cell = row.insertCell(j);
      if (j == 0) {
        cell.innerHTML = i + 1;
      }
      if (j == 1) {
        cell.innerHTML = jsonQuestionObject[i].options[userAnswerMap.get(i)];
      }
      if (j == 2) {
        if (jsonQuestionObject[i].options[userAnswerMap.get(i)] == jsonQuestionObject[i].ans) {
          cell.innerHTML = "1 Mark";
          row.className = "alert alert-success";
          score++;
        } else {
          cell.innerHTML = "0 Mark";
          row.className = "alert alert-danger";
        }
      }
    }
  }
  showUserResult();
});
}

function showUserResult() {
  var uResult = (score / totalque) * 100;
  if (uResult >= 70) {
    $("#resultPnl").removeClass("panel-primary").addClass("panel-success");
    (document.getElementById("usrRemark")).innerHTML = "Excellent Job !! You are doing Great";
  } else if (uResult < 70 && uResult >= 50) {
    $("#resultPnl").removeClass("panel-primary").addClass("panel-warning");
    (document.getElementById("usrRemark")).innerHTML = "Good Job !! You can do Better";
  } else if (uResult < 50) {
    $("#resultPnl").removeClass("panel-primary").addClass("panel-danger");
    (document.getElementById("usrRemark")).innerHTML = "Upsss !! You need Serious Improvement";
  }

  (document.getElementById("ttlQuestion")).innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Total number of Questions : " + totalque;
  (document.getElementById("uncorrAns")).innerHTML = "Total number of Wrong Answer : " + (totalque - score);



}
