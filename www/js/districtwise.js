
function getDataDistrictWise(products, district) {
    var returnData = [];
    $.each(products, function (key, value) {
        if (value.city === district) {
            returnData.push(value);
        }
    });
    return returnData;

}


function allDistrictData(district) {
    var districtData = [];
    var itemKey;


    var dbRef = firebase.database().ref('/dataCollection/').once('value', (snap) => {
        var collectionData = snap.val();
        $.each(collectionData, (categoryKey, categoryObject) => {
            $.each(categoryObject, (subCategoryKey, subCategoryObject) => {
                if (typeof (subCategoryObject) === 'object') {
                    $.each(subCategoryObject, (dataCollectionKey, dataCollection) => {
                        if (dataCollectionKey != 'ItemName') {
                            $.each(dataCollection, (collectedDataKey, collectedData) => {
                                if (collectedData.city === district) {
                    
                                    districtData.push(collectedData);
                                }
                            });
                        }
                    });
                }
            });
        });
        dataController(districtData);
    });
    
}

