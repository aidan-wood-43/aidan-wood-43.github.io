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

        // get form data from tableau.connectionData
        var connectionData = JSON.parse(tableau.connectionData);
        var access_Key = connectionData.accessKey;
        var endpoint_URL = connectionData.endpoint;
        var limit_execs = connectionData.limit;

        var payload = JSON.stringify({"access_key": access_Key,"limit":limit_execs});
        var config = {
        method: 'post',
        url: endpoint_URL,
        headers: { 
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

    $(document).ready(function() {
        $("#submitButton").click(function () {
            var endpoint_ = $('#endpoint').val();
            var accessKey_ = $('#accessKey').val();
            var limit_ = parseInt($('#limit').val());
            tableau.connectionName = "Lumen Data Source";
            tableau.connectionData = JSON.stringify({
                endpoint: endpoint_,
                accessKey: accessKey_,
                limit: limit_});
            tableau.submit();
        });
    });
})();