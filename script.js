function submitSymptoms() {
      var gender = document.getElementById("gender").value;
      var age = document.getElementById("age").value;
      var symptoms = [];
      var checkboxes = document.getElementsByName("symptom");
      for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
          symptoms.push({
            id: checkboxes[i].value,
            choice_id: "present"
          });
        }
      }
      var postData = {
        sex: gender,
        age: {
          value: age
        },
        evidence: symptoms
      };
	  console.log(postData);
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          var response = JSON.parse(this.responseText);
          var diagnosis = response.conditions[0].name;
          var probability = response.conditions[0].probability;
          var message = "You may have " + diagnosis + " with a probability of " + probability.toFixed(2) + "%.";
          document.getElementById("diagnosis").innerHTML = message;
		}
		};
		xhr.open("POST", "https://api.infermedica.com/v3/diagnosis");
		xhr.setRequestHeader("Content-Type", "application/json");
		xhr.setRequestHeader("App-Id", "c72f7ef6");
		xhr.setRequestHeader("App-Key", "49cbe9fec5a0213273b052beba4e68c5");
		xhr.send(JSON.stringify(postData));
		}
