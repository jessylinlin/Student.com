let defaultState = [{
	"id": "eyJ0eXBlIjoiUHJvcGVydHkiLCJpZCI6NzI1fQ==",
	"name": "urbanest North Terrace",
	"currency": "GBP",
	"symbol": "£",
	"room": [
		{
			'name' : "testtoom1",
			'price' : 1,
			'index' : 0
		}
	],
	"saved": true,
}, {
	"id": "eyJ0eXBlIjoiUHJvcGVydHkiLCJpZCI6NTg5fQ==",
	"name": "urbanest Cleveland Street",
	"currency": "GBP",
	"symbol": "£",
	"room": [
		{
			'name' : "testtoom2",
			'price' : 1,
			'index' : 0
		}
	],
	"saved": true
}, {
	"id": "eyJ0eXBlIjoiUHJvcGVydHkiLCJpZCI6NTk0fQ==",
	"name": "urbanest Quay Street",
	"currency": "GBP",
	"symbol": "£",
	"room": [],
}, {
	"id": "eyJ0eXBlIjoiUHJvcGVydHkiLCJpZCI6MTA4Nn0==",
	"name": "urbanest Glebe",
	"currency": "GBP",
	"symbol": "£",
	"room": [],
}, {
	"id": "eyJ0eXBlIjoiUHJvcGVydHkiLCJpZCI6NTkwfQ==",
	"name": "urbanest Darlington",
	"currency": "GBP",
	"symbol": "£",
	"room": []
}, {
	"id": "eyJ0eXBlIjoiUHJvcGVydHkiLCJpZCI6NTg4fQ==",
	"name": "urbanest Carlton",
	"currency": "GBP",
	"symbol": "£",
	"room": []
}, {
	"id": "eyJ0eXBlIjoiUHJvcGVydHkiLCJpZCI6NTk1fQ==",
	"name": "urbanest South Bank",
	"currency": "GBP",
	"symbol": "£",
	"room": []
}, {
	"id": "eyJ0eXBlIjoiUHJvcGVydHkiLCJpZCI6NTk3fQ==",
	"name": "urbanest Sydney Central",
	"currency": "GBP",
	"symbol": "£",
	"room": []
}, {
	"id": "eyJ0eXBlIjoiUHJvcGVskk3iuf2aZCI6NzI1fQ==",
	"name": "E 10th & 1st Ave",
	"currency": "USD",
	"symbol": "$",
	"room": []
}, {
	"id": "eyJ0eXBlIjoiUHJvcppqolKKJNKpZCI6NzI1fQ==",
	"name": "Elizabeth & Spring",
	"currency": "AUD",
	"symbol": "$",
	"room": []
}, {
	"id": "eyJ0eXBlIjoioo1j28dkJSO88uIJHNKwNzI1fQ==",
	"name": "Ludlow & Hester",
	"currency": "AUD",
	"symbol": "$",
	"room": []
}, {
	"id": "eyJ0eXBlIjoiUHJvcde3JJLqKIPpZCI6NzI1fQ==",
	"name": "Scape Abercrombie",
	"currency": "AUD",
	"symbol": "$",
	"room": []
}, {
	"id": "eyJ0eXBlIjoiUHJvcGVydHkiL00oJJIONzI1fQ==",
	"name": "Iglu Chatswood",
	"currency": "AUD",
	"symbol": "$",
	"room": []
}, {
	"id": "eyJ0eXBlIjoiUHJvcGVydKOOEg22ZCI6NzI1fQ==",
	"name": "Western Sydney University Village - Hawkesbury",
	"currency": "AUD",
	"symbol": "$",
	"room": []
}, {
	"id": "eyJ0eXBlIjoiUHksk3ls1ssiLCJpZCI6NzI1fQ==",
	"name": "Western Sydney University Village - Bankstown",
	"currency": "AUD",
	"symbol": "$",
	"room": []
}, {
	"id": "eyJ0eXBlIjoiUHJvc00o19kiLCJpZCI6NzI1fQ==",
	"name": "Western Sydney University Village - Bankstown",
	"currency": "AUD",
	"symbol": "$",
	"room": []
}, {
	"id": "eyJ0eXBlIjoiUHJvcGVydHkiLCJpmmaYUoI1fQ==",
	"name": "Sydney City",
	"currency": "AUD",
	"symbol": "$",
	"room": []
}, {
	"id": "eyJ0eXBlIjoiUHJvcGV0IIjqjndfZCI6NzI1fQ==",
	"name": "Jack’s Place",
	"currency": "AUD",
	"symbol": "$",
	"room": []
}, {
	"id": "eyJ0eXBlIjoiUHJvcG551HkiLCJpZCI6NzI1fQ==",
	"name": "Forest Lodge",
	"currency": "AUD",
	"symbol": "$",
	"room": []
}, {
	"id": "eyJ0eXBlIjoiUHJvcGVydHk9o2JpZCI6NzI1fQ==",
	"name": "Empire Hotel",
	"currency": "AUD",
	"symbol": "$",
	"room": []
}];


const Edit = (state = defaultState, action) => {
	let arrProperty = [...state];
	switch (action.type) {
		case "SELECT_MENU":
			arrProperty.forEach((item, index) => {
				item.id === action.payload.key ? item.selectMenu = true : item.selectMenu = false;
			});
			return arrProperty;
		case "SELECT_PROPERTY":
			arrProperty.forEach((item, index) => {
				item.id === action.payload ? item.selectProperty = true : item.selectProperty = false;
			});
			return arrProperty;
		case "DESELECT_PROPERTY":
			arrProperty.forEach((item, index) => {
				if (item.selectProperty) {
					item.selectProperty = false;
				}
			});
			return arrProperty;
		case "ADD_ROOM":
			arrProperty.forEach((item, index) => {
				if (item.selectMenu || item.selectProperty) {
					action.payload.index = item.room.length;
					item.room.push(action.payload);
					item.selectMenu = true;
				}
			});
			return arrProperty;
		case "SAVE_EDITED_ROOM":
			arrProperty.forEach((item, index) => {
				if (item.selectMenu) {
					item.room.forEach((subItem, subIndex) => {
						item.room[subIndex] = action.payload;
					});
				}
			});
			return arrProperty;
		case "DELETE_ROOM":
			arrProperty.forEach((item, index) => {
				if (item.selectMenu) {
					item.room.forEach((subItem, subIndex) => {
						if (subItem.index=== action.payload) {
							item.room.splice(subIndex, 1);
							return
						}
					});
				}
			});
			return arrProperty;
		case "SAVE_PROPERTY":
			arrProperty.forEach((item, index) => {
				if (item.room.length > 0  && item.selectProperty && item.selectMenu) {
					item.selectProperty = false;
					item.selectMenu = true;
					item.saved = true;
				}
			});
			return arrProperty;
		case "DELETE_PROPERTY":
			arrProperty.forEach((item, index) => {
				if (item.id === action.payload && !item.saved) {
					arrProperty[index].room = [];
				}
			});
			return arrProperty;
		default:
			return state;
	}
}

export default Edit;
