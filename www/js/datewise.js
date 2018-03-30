
// var productId = '110111101';
// var month = '03';
// var year = '2018';
// var date = '22';
//var returnData = {};

function getDataDateWise(productId, date, month, year) {
    var day = `${year}_${month}_${date}`;
    var returnData = {};
    var categoryId = Math.floor(productId / 100);
    var dbRef = firebase.database().ref(`/dataCollection/${categoryId}/${productId}/${day}`);
    var returnData = [];
    dbRef.once('value', function(snap) {
        var productData = snap.val();
        // getDataDayWiseController(returnData);
        $.each(productData, function(key, value){
            returnData.push(value);
        });
        dataController(returnData);
    });
    
}
