function highlight(){ //подсветка лучших роев
    const $elem = document.querySelectorAll('td'); //$elem - все ячейки таблицы
    var st = 9999999999; //ставим макс рой для лучшего роя
    var nd = 9999999999; //ставим макс рой для второго роя
    var rd = 9999999999; //ставим макс рой для третьего роя
    var ids = [];   //массив с id ячеек с роями(не шапка таблицы)
    var k = 0;  //счетчик для цикла  
    var id1 = 0;    // ид ячейки с лучшим роем
    var id2 = 0;    //ид ячейки со вторым роем
    var id3 = 0;    //ид ячейки с третьим роем
    $elem.forEach(($item) => {  //перебор $elem
        var number = Number($item.textContent.slice(9,14)); //вырезаем из текста в ячейке рой в виде числа
        if (number > 0 & number != NaN){    //если больше 0 и не пустое значение 
            if (number < st) {  //если меньше лучшего роя, то 
                ids[k] = $item.id;  //пихаем в массив с ид ячеек (именно в массив, т.к. дальше будем искать второй рой по этому массиву)
                k = k + 1; //счетчик
            }
        }
        
    });

    for (let j=0; j < ids.length; j++) {    //перебираем массив с роями
        var roii = Number(document.getElementById(ids[j]).textContent.slice(9, 15));    //вырезаем из текста в ячейке рой в виде числа
        if (roii < st) {    //если рой меньше лучшего роя, то
            st = roii;  //пишем его в переменную
            id1 = j;    //пишем ид лучшего роя
        }
    }
    for (let j=0; j<ids.length;j++){    //перебираем массив с роями
        var roii = Number(document.getElementById(ids[j]).textContent.slice(9, 15));    //вырезаем из текста в ячейке рой в виде числа
        if (roii > st & roii < nd) {    //если рой больше лучшего роя и меньше второго роя, то
            nd = roii;  //пишем его в переменную
            id2 = j;    //пишем ид второго роя
        }
    }
    for (let j=0; j<ids.length;j++){    //перебираем массив с роями
        var roii = Number(document.getElementById(ids[j]).textContent.slice(9, 15));    //вырезаем из текста в ячейке рой в виде числа
        if (roii > nd & roii < rd) {    //если рой больше второго роя и меньше третьего роя, то
            rd = roii;  //пишем его в переменную
            id3 = j;    //пишем ид третьего роя
        }
    }
    document.getElementById(ids[id3]).style.backgroundColor = "#ebc781";    //меняем цвет заливки третьего роя
    document.getElementById(ids[id2]).style.backgroundColor = "#ebeb80";    //меняем цвет заливки второго роя
    document.getElementById(ids[id1]).style.backgroundColor = "#8fe390";    //меняем цвет заливки лучшего роя
}

function refresh(){ //обновление таблицы без перезагрузки страницы
    var ids = [];   //массив с id ячеек с роями(не шапка таблицы)
    var k = 0;  //счетчик
    const $elem = document.querySelectorAll('td');  //$elem - все ячейки таблицы
    $elem.forEach(($item) => {  //перебор $elem
        var number = $item.textContent.slice(0,2);  //вырезаем из текста в ячейке два первых символа,
        if (number === 'li' || number === 'No'){    //чтобы понять, что это не ячейка шапки таблицы
            ids[k] = $item.id;  //пихаем в массив с ид ячеек, по которым будем работать дальше
            k = k + 1;  //счетчик
        }
        for (let j=0; j < ids.length; j++) {    //перебираем массив с ид ячеек
            document.getElementById(ids[j]).innerHTML = ''; //убираем текст
            document.getElementById(ids[j]).style.backgroundColor = "#ffffff";  //ставим белый фон
        }        
    });
    const token_id = 518; //id маркета
    const token_name = "BTK"; //имя токена
    const url = "https://wax.alcor.exchange/api/markets/"+token_id; //запрос к алкору
    fetch(url) //берем жсон с алкора
	   .then(response => {
		  return response.json();
	   })
	   .then( jsondata => {        
		document.getElementById(token_name).innerHTML = token_name+' price '+jsondata.last_price+' WAX'; //ставим цену токена
		document.getElementById(token_name+'24').innerHTML = token_name+' 24h volume '+Math.round(jsondata.volume24)+' WAX'; //ставим обьем торгов за сутки
		document.getElementById(token_name+'_vol').innerHTML = token_name+' Week volume '+Math.round(jsondata.volumeWeek)+' WAX'; //ставим обьем тогров за неделю
	});
    const blockchainWaxAccount = 'miningntwrkc' //имя контракта
    rate = async function() {   //парсим внутренний обменный курс из блокчейна
    const request2 = {  //тело пост запроса
            json: true,
            code: blockchainWaxAccount, //ключ
            table: 'config',    //имя таблицы
            scope: blockchainWaxAccount,    //фильтр поиска, обязательно
        }        		
    const multiplier = await wax.rpc.get_table_rows(request2); //запрос таблицы из бч
    var token = multiplier.rows[0].tokens_pool/1;   //пул бтк
    var share = multiplier.rows[0].shares_pool/1;   //пул шар
    var rate = token/share*10;  //обменный курс
    document.getElementById('rate').innerHTML = 'Current exchange rate is 100Ksh / '+rate.toFixed(7)+' BTK' //ставим обменный курс 
    }
    roi_list();
}