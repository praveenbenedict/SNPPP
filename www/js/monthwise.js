

function getDataMonthWise(productId, month, year){
    var day = `${year}_${month}`;
    console.log(day);
    var categoryId = Math.floor(productId/100);
    var dbRef = firebase.database().ref(`/dataCollection/${categoryId}/${productId}`);
    
    dbRef.once('value', function(snap){
        var returnData = [];
        productValue = snap.val();
        $.each(productValue, function(key, value){
            if(key !== 'ItemName' && key.substring(0,7) === day ){
                // console.log(value);
                $.each(value, function(productKey, productData){
                    returnData.push(productData);
                });
            }
        });
        dataController(returnData);
    }); 
    
}