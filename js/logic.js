(function () { 
    var theUrl = "http://www.mrsoft.by/data.json"; 
    var firstElement; 

    var yql = 'http://query.yahooapis.com/v1/public/yql?' 
    + 'q=' + encodeURIComponent('select * from json where url=@url') 
    + '&url=' + encodeURIComponent(theUrl) 
    + '&format=json&callback=?'; 

    $.getJSON(yql, 
        function (dataQuery) { 
            var jsonDoc = dataQuery.query.results.json; 
            firstElement = jsonDoc["data"]; 
        } 
        ) 
    .done(function () {
        var data = firstElement; 

        document.querySelector('.filter-by-length').addEventListener("click", function () {
            document.querySelector('.output-field').value = "";

            var filterNumber = parseInt(document.querySelector('.input-field').value);

            for (var i = 0; i < data.length; i++) {
                if (data[i].length > filterNumber) {
                    document.querySelector('.output-field').value += data[i] + "\n";
                }
            }
        });

        document.querySelector('.filter-by-substring').addEventListener("click", function () {
            var outputText = document.querySelector('.output-field');
            outputText.value = "";

            var inputText = document.querySelector('.input-field').value;

            var reg;

            if (document.querySelector('.my-checkbox').checked) {
                reg = new RegExp(inputText, 'ig');
            }
            else {
                reg = new RegExp(inputText, 'g');
            }

            for (var i = 0; i < data.length; i++) {
                if (reg.test(data[i]) && inputText != "") {
                    outputText.value += data[i] + "\n";
                }
            }
        });
    }); 
})();
