
const scanButton = document.querySelector('#scan-button');
let collectionName = document.querySelector('#collection-name');

const wax_price_link = 'https://api.coingecko.com/api/v3/simple/price?ids=wax&vs_currencies=usd'; //урл запроса к коингеко
let waxprice = 1;
fetch(wax_price_link) //берем жсон с коингеко
	.then(response => {
		return response.json();
	})
	.then( jsondata => {
        waxprice = jsondata.wax.usd; //ставим курс вакса к доллару
    console.log(waxprice);
	});

const scan = function(){
    let collection = collectionName.value;
    let urlRequest = "https://wax.eosusa.io/atomicassets/v1/schemas?collection_name="+collection+"&page=1&limit=100&order=desc&sort=created" //урл запроса
    let json;
    var xhr = new XMLHttpRequest();    //конструкция иксмл реквеста
	xhr.open('GET', urlRequest, true); //продолжение конструкции. True - асинхронный запрос
	xhr.onload = (e) => {              //продолжение конструкции
        if (xhr.readyState === 4) { //если запрос вернулся со статусом 4 - готов
            if (xhr.status === 200) {   //если запрос вернулся со статусом 200 - загружен
                var result = (xhr.responseText);    //пишем в результ результат запроса
                var json = JSON.parse(result);  //распарсим его в жсон
                //console.log(json);
                let schema_links = [];
                let schema_names = [];
                const firstDiv = document.getElementById('schemas--div');                
                const schemas = document.createElement('div');
                firstDiv.append(schemas);
                if (json.data.length === 0) {
                    schemas.textContent = "Wrong collection name";
                } else {                    
                    for (let i = 0; i < json.data.length; i++ ) {                        
                        const schema_name = json.data[i].schema_name;
                        const schema_link = "https://wax.eosusa.io/atomicassets/v1/templates?collection_name="+collection+"&schema_name="+schema_name+"&page=1&limit=100&order=desc&sort=created"
                        schema_names.push(schema_name);
                        schema_links.push(schema_link);
                    };
                };
                for (let i=0; i<schema_names.length; i++){
                    const new_button = document.createElement('button');
                    const first_div = document.querySelector('#schemas--div');
                    first_div.append(new_button);
                    new_button.textContent=schema_names[i];
                    new_button.id=schema_names[i];
                    new_button.className='schemas';
                };
                const new_div = document.createElement('div');
                const second_div = document.querySelector('#templates--div');
//                second_div.after(new_div);
//                second_div.className='assets';
//                second_div.id='assets';
                const schema_buttons = document.querySelectorAll('.schemas');                 
                for (i = 0; i < schema_buttons.length; i++){
                    schema_buttons[i].addEventListener('click', function () {
                        const current_schema = this.id;
                        const schema_assets_link = `https://wax.eosusa.io/atomicassets/v1/templates?collection_name=${collection}&schema_name=${current_schema}&page=1&limit=100&order=desc&sort=created`;
                        var xhr1 = new XMLHttpRequest();    //конструкция иксмл реквеста
	                    xhr1.open('GET', schema_assets_link, true); //продолжение конструкции. True - асинхронный запрос
	                    xhr1.onload = (e) => {              //продолжение конструкции
                        if (xhr1.readyState === 4) { //если запрос вернулся со статусом 4 - готов
                            if (xhr1.status === 200) {   //если запрос вернулся со статусом 200 - загружен
                                var result = (xhr1.responseText);    //пишем в результ результат запроса
                                var json1 = JSON.parse(result);  //распарсим его в жсон
                                let template_names = [];
                                let template_ids = [];
                                let template_links = [];
//                                console.log(json1);
                                if (json1.data.length === 0) {
                                    schemas.textContent = "Wrong collection name";
                                } else {                    
                                    for (let i = 0; i < json1.data.length; i++ ) {                        
                                    const template_name = json1.data[i].name;
                                    const template_id = json1.data[i].template_id;
                                    const template_link = `https://wax.eosusa.io/atomicmarket/v2/sales?state=1&collection_name=${collection}&schema_name=${current_schema}&template_id=${template_id}&page=1&limit=100&order=asc&sort=price`;
                                    template_names.push(template_name);
                                    template_ids.push(template_id); 
                                    template_links.push(template_link);
                                    minprice(template_link);
                                    };
//                                    console.log(template_ids);
//                                    console.log(template_names);
                                    
                                };
                            } else {
                                console.error(xhr1.statusText);  //если запрос вернулся с ошибкой, консолим ошибку
                            }
                            }
                        };
                        xhr1.onerror = (e) => {
                            console.error(xhr1.statusText);  //если запрос вернулся с ошибкой, консолим ошибку
                        };
                        xhr1.send(null);                    
                    });
                };
            } else {
                    console.error(xhr.statusText);  //если запрос вернулся с ошибкой, консолим ошибку
            }
            }
        };
    xhr.onerror = (e) => {
        console.error(xhr.statusText);  //если запрос вернулся с ошибкой, консолим ошибку
        };
    xhr.send(null);
    
    
};
const minprice = function (template_link) { //функция поиска по атомику с перебором всех ассетов
var xhr2 = new XMLHttpRequest();    //конструкция иксмл реквеста
	xhr2.open('GET', template_link, true); //продолжение конструкции. True - асинхронный запрос
	xhr2.onload = (e) => {              //продолжение конструкции
        if (xhr2.readyState === 4) { //если запрос вернулся со статусом 4 - готов
            if (xhr2.status === 200) {   //если запрос вернулся со статусом 200 - загружен
                var result2 = (xhr2.responseText);    //пишем в результ результат запроса
                var json2 = JSON.parse(result2);  //распарсим его в жсон
//                console.log(json2);
//                var waxprice = 1;           
                if (json2.data.length === 0){    //есл жсон пустой
//                    document.getElementById(element_id).innerHTML="No listings found";  //то нет листингов по этому ассету
                    return;
                    }
                var minprice = 99999999999999; //ставим минимальный рой намного выше реального, для сортировки
                var data_id = 0;    //переменная для лучшего ассета по итогам сортировки, потом обращаемся к ней через json.data[data_id].sale_id; чтобы сгенерить линк на атомик
                for (let i = 0; i < json2.data.length; i++ ) {   //цикл по списку листингов
                    if (json2.data[i].listing_symbol === "USD"){ //бывают цены в баксах и их надо переводить в вакс
                        var price = json2.data[i].listing_price/waxprice/100;  //перевод цены в вакс
                    } else {var price = Number(json2.data[i].listing_price)/100000000};  //берем цену листинга без лишних нулей
                    if (price < minprice){
                        minprice=price;
                        data_id=i;
                    };
                    
                };
                const templates_div = document.querySelector('#templates--div');
                const new_template = document.createElement('button');
                const current_sale_id = json2.data[data_id].sale_id;
                const sale_link = `https://wax.atomichub.io/market/sale/${current_sale_id}`
                templates_div.append(new_template);
                new_template.innerHTML=`<a href="${sale_link}" target="_blank">name=${json2.data[data_id].assets[0].name} and minprice=${minprice}</a>`;
                new_template.className='template_card';
                new_template.id=json2.data[data_id].sale_id;     
                    
                
                
//                console.log(`name=${json2.data[data_id].assets[0].name} and minprice=${minprice}`);
//                console.log(json2);
                
                } else {
                    console.error(xhr2.statusText);  //если запрос вернулся с ошибкой, консолим ошибку
                };
            }
        };
    xhr2.onerror = (e) => {
        console.error(xhr2.statusText);  //если запрос вернулся с ошибкой, консолим ошибку
        };
    xhr2.send(null);
    };

scanButton.addEventListener('click', scan);