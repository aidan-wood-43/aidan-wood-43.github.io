(function () {
    // Create the connector object
    var myConnector = tableau.makeConnector();

    // Define the schema
    myConnector.getSchema = function (schemaCallback) {
        var cols = [{
            id: "TransactionTimestamp",
            dataType: tableau.dataTypeEnum.int
        },  {
            id: "TransactionValue",
            dataType: tableau.dataTypeEnum.string
        }];

        var tableSchema = {
            id: "executionResults",
            alias: "Execution results imported from Lumen",
            columns: cols    
        };

        schemaCallback([tableSchema]);

    };

    // Download the data
    myConnector.getData = function (table, doneCallback) {

        //import axios from 'axios';

        var payload = JSON.stringify({"access_key":"0bcedaf1-9f55-44c7-a70e-24d73b37c518","limit":2});

        var config = {
        method: 'post',
        //url: 'https://cors-anywhere.herokuapp.com/https://demo-poseidon.lumen.live/documents/external/filter?=',
        url: 'https://demo-poseidon.lumen.live/documents/external/filter?=',
        headers: { 
            //'Content-Type': 'application/json'
        },
        data : payload
        };

        axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
          
          var feat = response.data,
            tableData = [];
        
          for (var i = 0, len = feat.length; i < len; i++) {
              tableData.push({
                "TransactionTimestamp": feat[i]['execution-results']['Transaction Timestamp'],
                "TransactionValue": feat[i]['execution-results']['Transaction Value']
              })
          }
          
          table.appendRows(tableData);
            doneCallback();

        })
        .catch(function (error) {
          console.log(error);
        });


    };

    tableau.registerConnector(myConnector);
    
    $(document).ready(function () {
        $("#submitButton").click(function () {
            tableau.connectionName = "Lumen Data Source";
            tableau.submit();
        });
    });

})();