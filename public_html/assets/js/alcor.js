const token_id = 518; //id маркета
const token_name = "BTK"; //имя токена
const url = "https://wax.alcor.exchange/api/markets/"+token_id;
fetch(url) //берем жсон с алкора
	.then(response => {
		return response.json();
	})
	.then( jsondata => {
        document.getElementById('token').id=token_name; //меняем универсальный ид на актуальный
        document.getElementById('token24').id=token_name+'24';  //меняем универсальный ид на актуальный
        document.getElementById('token_vol').id=token_name+'_vol';  //меняем универсальный ид на актуальный
		document.getElementById(token_name).innerHTML = token_name+' price '+jsondata.last_price+' WAX'; //ставим цену токена
		document.getElementById(token_name+'24').innerHTML = token_name+' 24h volume '+Math.round(jsondata.volume24)+' WAX'; //ставим обьем торгов за сутки
		document.getElementById(token_name+'_vol').innerHTML = token_name+' Week volume '+Math.round(jsondata.volumeWeek)+' WAX'; //ставим обьем тогров за неделю
	});