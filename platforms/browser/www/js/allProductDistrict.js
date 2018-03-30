

firebase.database().ref('/dataCollection/').once('value', function (snap) {
    controller(snap.val());
});

function controller(collectionData) {
    // console.log(collectionData);
    function allProductDistrict(district) {
        var districtData = {};
        var itemKey;
        $.each(collectionData, (categoryKey, categoryObject) => {
            $.each(categoryObject, (subCategoryKey, subCategoryObject) => {
                if (typeof (subCategoryObject) === 'object') {
                    name = subCategoryObject.ItemName;
                    itemKey = subCategoryKey;
                    $.each(subCategoryObject, (dataCollectionKey, dataCollection) => {
                        if (dataCollectionKey != 'ItemName') {
                            $.each(dataCollection, (collectedDataKey, collectedData) => {
                                if (collectedData.city === district) {
                                    //console.log(collectedData);
                                    collectedData.ItemName = name;
                                    districtData[subCategoryKey] = {};
                                    districtData[subCategoryKey][dataCollectionKey] = {};
                                    districtData[subCategoryKey][dataCollectionKey][collectedDataKey] = collectedData;
                                }
                            });
                        }
                    });
                }
            });
            //districtData[itemKey]['name'] = name;
        });
        return districtData;
    }
    

    function compareData(districtData1, districtData2) {

        if (Object.keys(districtData1).length < Object.keys(districtData2).length) {
            populatePriceData(districtData1, districtData2);
        }else {
            populatePriceData(districtData2, districtData1);
        }
    }

    function populatePriceData(districtData1, districtData2) {
        var dataArray = [];
        $.each(districtData1, (subcategoryKey1, subcategoryObject1) => {
            $.each(districtData2, (subcategoryKey2, subcategoryObject2) => {
                if (subcategoryKey1 === subcategoryKey2) {
                    var keys = Object.keys(subcategoryObject1);
                    var dateData = subcategoryObject1[keys[0]];
                    var name = dateData[Object.keys(dateData)[0]].ItemName;
                    district1 = dateData[Object.keys(dateData)[0]].price;

                    keys = Object.keys(subcategoryObject2);
                    dateData = subcategoryObject2[keys[0]];
                    district2 = dateData[Object.keys(dateData)[0]].price;

                    var priceData = {
                        name: name,
                        district1: district1,
                        district2: district2
                    };
                    dataArray.push(priceData);
                }
            });
        });
        console.log(dataArray);
    }
    console.log(allProductDistrict('Hubballi'));
    //compareData(allProductDistrict('Hubballi'),allProductDistrict('Chennai') );
}



