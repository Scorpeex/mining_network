function bundles(btk_price) { //функция поиска по атомику с перебором всех бандлов
	var urlRequest = "https://wax.eosusa.io/atomicmarket/v2/sales?state=1&min_assets=2&symbol=WAX&collection_name=miningntwrkc&schema_name=asics&page=1&limit=100&order=asc&sort=price"; //урл запроса
    var xhr = new XMLHttpRequest();    //конструкция иксмл реквеста
	xhr.open('GET', urlRequest, true); //продолжение конструкции. True - асинхронный запрос
	xhr.onload = (e) => {              //продолжение конструкции
        if (xhr.readyState === 4) { //если запрос вернулся со статусом 4 - готов
            if (xhr.status === 200) {   //если запрос вернулся со статусом 200 - загружен
                var result = (xhr.responseText);    //пишем в результ результат запроса
                var json = JSON.parse(result);  //распарсим его в жсон
                var waxprice = Number(document.getElementById("wax_price").innerHTML.slice(10,17)); //запишем вакспрайс, взятый со страницы
                var rate1 = Number(document.getElementById("rate").innerHTML.slice(34,44)); //запишем обменный курс, взятый со страницы
                var exchange = rate1/100000; //шары в бтк, текущий расчет к 100к шар, в дальнейшем надо менять
                if (json.data.length === 0){    //есл жсон пустой
                    document.getElementById(element_id).innerHTML="No listings found";  //то нет листингов по этому ассету
                    return;
                    }
                var minroi1 = 999999999; //ставим минимальный рой намного выше реального, для сортировки
                var minroi2 = 999999999; //ставим минимальный рой намного выше реального, для сортировки
                var minroi3 = 999999999; //ставим минимальный рой намного выше реального, для сортировки
                var data_id1 = 0;    //переменная для лучшего ассета по итогам сортировки, потом обращаемся к ней через json.data[data_id].sale_id; чтобы сгенерить линк на атомик
                var data_id2 = 0;    //переменная для лучшего ассета по итогам сортировки, потом обращаемся к ней через json.data[data_id].sale_id; чтобы сгенерить линк на атомик
                var data_id3 = 0;    //переменная для лучшего ассета по итогам сортировки, потом обращаемся к ней через json.data[data_id].sale_id; чтобы сгенерить линк на атомик
                var total_farm = 0;
                for (let i = 0; i < json.data.length; i++ ) {   //цикл по списку листингов
                    for (let j = 0; j < json.data[i].assets.length; j++){
                        if (json.data[i].listing_symbol === "USD"){ //бывают цены в баксах и их надо переводить в вакс
                            var price = json.data[i].listing_price/waxprice*10;  //перевод цены в вакс
                        } else {var price = Number(json.data[i].listing_price)/100000000};  //берем цену листинга без лишних нулей
                        var rarity = json.data[i].assets[j].template.immutable_data.rarity; //берем рарность листинга
                        switch (rarity){    //в зависимости от рарности меняется формула расчета роя
                            case 'free':
                                rarity = 0.5;
                                break;
                            case 'common':
                                rarity = 1;
                                break;
                            case 'rare':
                                rarity = 1.5;
                                break;
                            case 'epic':
                                rarity = 2.5;
                                break;
                            case 'legendary':
                                rarity = 4;
                                break;
                            case 'gold':
                                rarity = 8;
                                break;
                            default:
                                rarity = 0;
                                break;
                            };
                        var classs = json.data[i].assets[j].template.immutable_data.class;   //в зависимости от класса меняется формула расчета роя
                        switch (classs){
                            case '0':
                            case 0:
                                classs = 0.1;
                                break;
                            case '1':
                            case 1:
                                classs = 0.15;
                                break;
                            case '2':
                            case 2:
                                classs = 0.225;
                                break;
                            case '3':
                            case 3:
                                classs = 0.3375;
                                break;
                            case '4':
                            case 4:
                                classs = 0.5062;
                                break;
                            case '5':
                            case 5:
                                classs = 1.5187;
                                break;
                            case '6':
                            case 6:
                                classs = 2.2781;
                                break;
                            case '7':
                            case 7:
                                classs = 3.4171;
                                break;
                            case '8':
                            case 8:
                                classs = 5.1257;
                                break;
                            default:
                                classs = 0;
                                break;
                            };
                        var lvl = json.data[i].assets[j].mutable_data.level;    //берем лвл
                        if (lvl === undefined){lvl = 1};    //у нулевого лвла нет параметра, пишем его вручную
                        var farm = classs*rarity*1.05**(lvl-1); //считаем фарм листинга в секунду
                        var daily = farm*exchange*btk_price*60*60*24;   //считаем фарм листинга в сутки
                        total_farm = total_farm + daily;
                        //console.log('bundle '+i+' asset '+j+' class '+classs+' rarity '+rarity+' level '+lvl+' farm '+farm+' daily '+daily+' total farm '+total_farm+' price '+price);
                    }
                    var rroi = price/total_farm; //считаем рой
                    if (rroi < minroi1 & rroi) {    //сортируем, ищем минимальный рой в цикле
                        minroi1 = rroi;
                        data_id1 = i;    //фиксируем порядковый номер листинга с минимальным роем
                        }else if (rroi < minroi2 & rroi > minroi1){
                            minroi2 = rroi;
                            data_id2 = i;
                        }else if (rroi < minroi3 & rroi > minroi2){
                            minroi3 = rroi;
                            data_id3 = i;
                        }
                }
                var sale_id1 = json.data[data_id1].sale_id;   //берем ид листинга на атомике
                var sale_id2 = json.data[data_id2].sale_id;   //берем ид листинга на атомике
                var sale_id3 = json.data[data_id3].sale_id;   //берем ид листинга на атомике
                var link1 = "https://wax.atomichub.io/market/sale/"+sale_id1; //генерим ссылку на атомик
                var link2 = "https://wax.atomichub.io/market/sale/"+sale_id2; //генерим ссылку на атомик
                var link3 = "https://wax.atomichub.io/market/sale/"+sale_id3; //генерим ссылку на атомик
                if (json.data[data_id1].listing_symbol === "USD"){   //цена лучшего листинга может быть в баксах
                    var price1 = json.data[data_id1].listing_price/waxprice*10;  //меняем на цену в ваксах
                    } else {var price1 = Number(json.data[data_id1].listing_price)/100000000};    //убираем лишние нули в цене
                if (json.data[data_id2].listing_symbol === "USD"){   //цена лучшего листинга может быть в баксах
                    var price2 = json.data[data_id2].listing_price/waxprice*10;  //меняем на цену в ваксах
                    } else {var price2 = Number(json.data[data_id2].listing_price)/100000000};    //убираем лишние нули в цене
                if (json.data[data_id3].listing_symbol === "USD"){   //цена лучшего листинга может быть в баксах
                    var price3 = json.data[data_id3].listing_price/waxprice*10;  //меняем на цену в ваксах
                    } else {var price3 = Number(json.data[data_id3].listing_price)/100000000};    //убираем лишние нули в цене
                document.getElementById('bn1').innerHTML="<a href='"+link1+"' target='_blank'>link</a> ROI "+minroi1.toFixed(2)+" days for "+price1+" WAX";   //заполняем ячейку таблицы линком, роем, ценой листинга
                document.getElementById('bn2').innerHTML="<a href='"+link2+"' target='_blank'>link</a> ROI "+minroi2.toFixed(2)+" days for "+price2+" WAX";   //заполняем ячейку таблицы линком, роем, ценой листинга
                document.getElementById('bn3').innerHTML="<a href='"+link3+"' target='_blank'>link</a> ROI "+minroi3.toFixed(2)+" days for "+price3+" WAX";   //заполняем ячейку таблицы линком, роем, ценой листинга
                } else {
                    console.error(xhr.statusText);  //если запрос вернулся с ошибкой, консолим ошибку
                    }
            }
        };
    xhr.onerror = (e) => {
        console.error(xhr.statusText);  //если запрос вернулся с ошибкой, консолим ошибку
        };
    xhr.send(null);
}