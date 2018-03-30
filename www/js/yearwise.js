
// var productId = '110111101';
// var month = '03';
// var year = '2018';
// var day = `${year}_${month}`;
// console.log(day);
// var categoryId = Math.floor(productId / 100);
// var dbRef = firebase.database().ref(`/dataCollection/${categoryId}/${productId}`);

// dbRef.once('value', function (snap) {
//     productValue = snap.val();

//     $.each(productValue, function (key, value) {
//         console.log(key.substring(0, 4));
//         if (key !== 'ItemName' && key.substring(0, 4) === year) {
//             console.log(value);
//         }
//     });
// });

function getDataYearWise(productId, year) {
    var categoryId = Math.floor(productId / 100);
    var dbRef = firebase.database().ref(`/dataCollection/${categoryId}/${productId}`);
    
    dbRef.once('value', function (snap) {
        productValue = snap.val();
        // console.log(productValue);
        returnData = [];
        $.each(productValue, function (key, value) {
            //console.log(key.substring(0, 4));
            console.log(key);
            console.log(value);

            if (key !== 'ItemName' && key.substring(0, 4) === year) {
                $.each(value, function(key, value){
                    returnData.push(value);
                }); 
            }
        });
        dataController(returnData);
    });
}