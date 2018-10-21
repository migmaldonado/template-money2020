$('#section1').hide();
$('#section2').hide();
$('#section3').hide();
$('#section4').hide();
$('#section5').hide();
//var numberB = getRandomNumber();
var text = 'Welcome to E Z Pay! What is your name';
var response;
//merchantLocator()
$('#section1').show();
// ask the problem
ask(text, function (err, result) {
    if (err) {
        document.getElementById('result').innerHTML = 'No Answer.';
    } else {
	$('#section1').hide();
	$('#section2').show();
	response = 'Welcome back CoCo!'
	speak(response);
        var text = "How can I help you today?"
	ask(text, function (err, result) {
    	if (err) {
        document.getElementById('result').innerHTML = 'No Answer.';
    } else {
        $('#section2').hide();
        $('#section3').show();
        response = 'Alright. Here are the last 5 bills you payed. You can chosse one of those or pay a different bill.'
        speak(response);
        var text = "What bill would you like to pay?"
        ask(text, function (err, result) {
    if (err) {
        document.getElementById('result').innerHTML = 'No Answer.';
    } else {
        response = 'We see an old bill payed to ABC cable compnay.'
        speak(response);
	var text = "Would you like to pay to same company"
      $('#section3').hide();
      $('#section4').show();
	ask(text, function (err, result) {
    if (err) {
        document.getElementById('result').innerHTML = 'No Answer.';
    } else {

	var text = "What is the bill amount?"
       ask(text, function (err, result) {
    if (err) {
        document.getElementById('result').innerHTML = 'No Answer.';
    } else {
        $('#pmt_amount').val('$20.00');
        response = 'Paying the bill amount of $20 to ABC cable company'
        merchantLocator();
        speak(response);
        $('#section4').hide();
        $('#section5').show();
        response = 'Your cable bill is payed. Thank you for using EZ Pay.Quick TiP: As you are paying your bills on time in last 6 months you are eligible for 100$ loan'

        speak(response);
        }
})
        speak(response);
        }
})
        }
})
        }
})
        }
})



// ask a question and get an answer
function ask(text, callback) {
    // ask question
    speak(text, function () {
        // get answer
        var recognition = new webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.onend = function (e) {
            if (callback) {
                callback('no results');
            }
        };

        recognition.onresult = function (e) {
            // cancel onend handler
            recognition.onend = null;
            if (callback) {
                callback(null, {
                    transcript: e.results[0][0].transcript,
                    confidence: e.results[0][0].confidence
                });
            }
        }

        // start listening
        recognition.start();
    });
}


// say a message
function speak(text, callback) {
    var u = new SpeechSynthesisUtterance();
    u.text = text;
    u.lang = 'en-US';

    u.onend = function () {
        if (callback) {
            callback();
        }
    };

    u.onerror = function (e) {
        if (callback) {
            callback(e);
        }
    };

    speechSynthesis.speak(u);
}

//merchant Locator
function merchantLocator(){

paymentDetails = {"header": {
"messageDateTime": "2018-10-21T06:43:09.903",
"requestMessageId": "Request_001",
"startIndex": "0"
},
"searchAttrList": {
"merchantName": "Starbucks",
"merchantCountryCode": "840",
"latitude": "37.363922",
"longitude": "-121.929163",
"distance": "2",
"distanceUnit": "M"
},
"responseAttrList": [
"GNLOCATOR"
],
"searchOptions": {
"maxRecords": "5",
"matchIndicators": "true",
"matchScore": "true"
}
}
$.ajax({
  type: "POST",
  beforeSend: function(request) {

    request.setRequestHeader("Content-Type", "application/json");
    request.setRequestHeader("Authorization", "Basic N1Q0SVJRN09FNUE4MFNZNTVQQkcyMUk3ejk5SldfdmtqMDF4WUxCVkhXNFhSMFJhUTo1RzBrNUFGRURuT0xBd0RDNEU4bkdGdw==");
    request.setRequestHeader("Accept","application/json");

  },
url: "https://sandbox.api.visa.com/merchantlocator/v1/locator",

  data: JSON.stringify(paymentDetails),
  processData: false,
  success: function(msg) {
    $("#results").append("The result =" + JSON.stringify(msg));
    console.log(msg);
  }
});




var settings = {
 "async": true,
 "crossDomain": true,
 "url": "https://sandbox.api.visa.com/merchantlocator/v1/locator",
 "method": "POST",
 "headers": {
   "Authorization":"Basic N1Q0SVJRN09FNUE4MFNZNTVQQkcyMUk3ejk5SldfdmtqMDF4WUxCVkhXNFhSMFJhUTo1RzBrNUFGRURuT0xBd0RDNEU4bkdGdw==",
   "Accept": "application/json",
   "Content-Type": "application/json",
   "Access-Control-Allow-Origin":"*",
   "dataType":"jsonp"
 },
 "processData": false,
 "data": " \r\n{\r\n\"header\": {\r\n\"messageDateTime\": \"2018-10-21T06:43:09.903\",\r\n\"requestMessageId\": \"Request_001\",\r\n\"startIndex\": \"0\"\r\n},\r\n\"searchAttrList\": {\r\n\"merchantName\": \"Starbucks\",\r\n\"merchantCountryCode\": \"840\",\r\n\"latitude\": \"37.363922\",\r\n\"longitude\": \"-121.929163\",\r\n\"distance\": \"2\",\r\n\"distanceUnit\": \"M\"\r\n},\r\n\"responseAttrList\": [\r\n\"GNLOCATOR\"\r\n],\r\n\"searchOptions\": {\r\n\"maxRecords\": \"5\",\r\n\"matchIndicators\": \"true\",\r\n\"matchScore\": \"true\"\r\n}\r\n}"
}

$.ajax(settings).done(function (response) {
 console.log(response);
});

}

//transaction history
function transactionHistory(){
var settings = {
 "async": true,
 "crossDomain": true,
 "url": "https://api.sandbox.paypal.com/v1/reporting/transactions?start_date=2018-05-15T00:00:00-0700&end_date=2018-06-14T23:59:59-0700",
 "method": "GET",
 "headers": {
   "Content-Type": "application/json",
   "Authorization": "Bearer A21AAHKg_CYiOQKqfb0EzDnyjwCCMGKBjp2DEdc6WSRhtCn1KJCnF7NC6a_5GNEUj7Qi3HNvXPml1AzvkhSf1QItk_Xxj9iqA",
   "cache-control": "no-cache",
   "Postman-Token": "471e9f57-4243-429f-87ac-fea53f03cc3d"
 }
}

$.ajax(settings).done(function (response) {
 console.log(response);
});
}
