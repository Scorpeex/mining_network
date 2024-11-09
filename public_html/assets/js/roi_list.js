function roi_list() {
    const token_id = 518; //id маркета
    const token_name = "BTK"; //имя токена
    const url = "https://wax.alcor.exchange/api/markets/"+token_id; //запрос к алкору
	fetch(url)
	.then(response => {
		return response.json();
	})
	.then( jsondata => {
//		console.log(jsondata);
        var token_price = jsondata.last_price;    //берем цену токена из жсона
        roi('0', 'common', '0c',token_price);    //вызываем функцию roi с параметрами класс, рарность, ид ячейки таблицы, цена токена
        roi('1', 'common', '1c',token_price);
        roi('2', 'common', '2c',token_price);
        roi('3', 'common', '3c',token_price);
        roi('4', 'common', '4c',token_price);
        roi('5', 'common', '5c',token_price);
        roi('6', 'common', '6c',token_price);
        roi('7', 'common', '7c',token_price);
        roi('8', 'common', '8c',token_price);
        roi('0', 'rare', '0r',token_price);
        roi('1', 'rare', '1r',token_price);
        roi('2', 'rare', '2r',token_price);
        roi('3', 'rare', '3r',token_price);
        roi('4', 'rare', '4r',token_price);
        roi('5', 'rare', '5r',token_price);
        roi('6', 'rare', '6r',token_price);
        roi('7', 'rare', '7r',token_price);
        roi('8', 'rare', '8r',token_price);
        roi('0', 'epic', '0e',token_price);
        roi('1', 'epic', '1e',token_price);
        roi('2', 'epic', '2e',token_price);
        roi('3', 'epic', '3e',token_price);
        roi('4', 'epic', '4e',token_price);
        roi('5', 'epic', '5e',token_price);
        roi('6', 'epic', '6e',token_price);
        roi('7', 'epic', '7e',token_price);
        roi('8', 'epic', '8e',token_price);
        roi('0', 'legendary', '0l',token_price);
        roi('1', 'legendary', '1l',token_price);
        roi('2', 'legendary', '2l',token_price);
        roi('3', 'legendary', '3l',token_price);
        roi('4', 'legendary', '4l',token_price);
        roi('5', 'legendary', '5l',token_price);
        roi('6', 'legendary', '6l',token_price);
        roi('7', 'legendary', '7l',token_price);
        roi('8', 'legendary', '8l',token_price);
        roi('0', 'gold', '0g',token_price);
        roi('1', 'gold', '1g',token_price);
        roi('2', 'gold', '2g',token_price);
        roi('3', 'gold', '3g',token_price);
        roi('4', 'gold', '4g',token_price);
        roi('5', 'gold', '5g',token_price);
        roi('6', 'gold', '6g',token_price);
        roi('7', 'gold', '7g',token_price);
        roi('8', 'gold', '8g',token_price);
        bundles(token_price);
	});
    
    
}

