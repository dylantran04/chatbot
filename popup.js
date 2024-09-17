// // Function to toggle chat popup
// function toggleChat() {
// 	const chatbox = document.getElementById("chatbox");
// 	chatbox.classList.toggle("show");
// }
// function sendMessage(event) {
// 	event.preventDefault();
// 	const messageInput = document.getElementById("messageInput").value;
// 	const messageDisplay = document.getElementById("contentApi");
// 	messageDisplay.innerText = "Loading...";
// 	findAppSheetRecord(messageInput);

// 	event.preventDefault();
// 	// const messageInput = document.getElementById('messageInput');
// 	const message = messageInput.value.trim();
// 	if (message !== "") {
// 		const chatboxContent = document.querySelector('.chatbox-message-content');
// 		const newMessage = document.createElement('p');
// 		newMessage.innerHTML = `tên nội dung là: ${message}`;
// 		chatboxContent.appendChild(newMessage);
// 		messageInput.value = "";
// 		chatboxContent.scrollTop = chatboxContent.scrollHeight;
// }
// function findAppSheetRecord(report_id) {
// 	const APP_ID = 'a8cc83c0-c3bf-45e3-8739-8621466bf243';
// 	const TABLE_NAME = 'REPORTS';
// 	const API_KEY = 'V2-2wA1Z-6ER21-AMs2u-uCMkd-bWDjY-7Ev0S-LMnmu-rkPya';

// 	const url = `https://api.appsheet.com/api/v2/apps/${APP_ID}/tables/${TABLE_NAME}/Action`;

// 	const payload = {
// 		"Action": "Find",
// 		"Properties": {
// 			"Locale": "vi-VN",
// 			"Location": "21.028511, 105.804817",
// 			// "RunAsUserEmail": "dylan.tran@mps-asis.com",
// 			"TimeZone": "Asia/Ho_Chi_Minh"
// 		},
// 		"Rows": [
// 			{
// 				"REPORT ID": report_id
// 			}
// 		]
// 	};

// 	fetch(url, {
// 		method: 'POST',
// 		headers: {
// 			'ApplicationAccessKey': API_KEY,
// 			'Content-Type': 'application/json'
// 		},
// 		body: JSON.stringify(payload)
// 	})
// 	.then(response => response.json())
// 	.then(data => {
// 		const taskRequestProduct = data[0]['PRODUCT NAME'];
// 		const DESCRIPTION = data[0]['PRODUCT TYPE'];
// 		const description = data[0]['DESCRIPTION'];

// 		const messageDisplay = document.getElementById("contentApi");
// 		messageDisplay.innerText = `Product: ${taskRequestProduct}.
// 		Type: ${DESCRIPTION}.
// 		Description: ${description}.`;
// 	})
// 	.catch(error => {
// 		console.error('Error:', error);
// 		const messageDisplay = document.getElementById("messageDisplay");
// 		messageDisplay.innerText = "Failed to fetch data!";
// 	});
// }
// //---------------------------------------------------------------------------------
// //add api 
// function sendfindMessage(event) {
// 	event.preventDefault();
// 	const taskRequestProduct = document.getElementById("taskRequestProduct").value;
// 	const DESCRIPTION = document.getElementById("DESCRIPTION").value;
// 	const reportCategory = document.getElementById("reportCategory").value;
// 	const healthCheckScore = document.getElementById("healthCheckScore").value;
// 	const messageDisplay = document.getElementById("contentApi");
// 	messageDisplay.innerText = "...";
// 	addAppSheetRecord(taskRequestProduct, DESCRIPTION, reportCategory, healthCheckScore);
// }
// function addAppSheetRecord(taskRequestProduct, DESCRIPTION, reportCategory, healthCheckScore) {
// 	const APP_ID = 'a8cc83c0-c3bf-45e3-8739-8621466bf243';
// 	const TABLE_NAME = 'REPORTS';
// 	const API_KEY = 'V2-2wA1Z-6ER21-AMs2u-uCMkd-bWDjY-7Ev0S-LMnmu-rkPya';

// 	const url = `https://api.appsheet.com/api/v2/apps/${APP_ID}/tables/${TABLE_NAME}/Action`;
// 	const payload = {
// 		"Action": "Add",
// 		"Properties": {
// 			"Locale": "vi-VN",
// 			"Location": "21.028511, 105.804817",
// 			// "RunAsUserEmail": "dylan.tran@mps-asis.com",
// 			"TimeZone": "Asia/Ho_Chi_Minh"
// 		},
// 		"Rows": [
// 			{
// 				"TASK REQUEST PRODUCT": taskRequestProduct,
// 				"DESCRIPTION": DESCRIPTION,
// 				"REPORT CATEGORY": reportCategory,
// 				"HEALTH CHECK SCORE": healthCheckScore
// 			}
// 		]
// 	};
	
// 	fetch(url, {
// 		method: 'POST',
// 		headers: {
// 			'ApplicationAccessKey': API_KEY,
// 			'Content-Type': 'application/json'
// 		},
// 		body: JSON.stringify(payload)
// 	})
// 	.then(response => {
// 		console.log('HTTP Status:', response.status); 
// 		if (response.status === 400) {
// 			return response.text().then(text => {
// 				throw new Error('Vui lòng kiểm tra lại các trường');
// 			});
// 		}
// 		return response.json();
// 	})
// 	.then(data => {
// 		if (data && data.Status === '200') {
// 			const messageDisplay = document.getElementById("contentApi");
// 			messageDisplay.innerText = "Successfully!";
// 		} else {
// 			throw new Error(' ' + (data.Message || 'Successfully!'));
// 		}
// 	})
// 	.catch(error => {
// 		console.error('Error:', error);
// 		const messageDisplay = document.getElementById("contentApi");
// 		messageDisplay.innerText = error.message;
// 	});
	
// }}

//clikc chatbot
function toggleChat() {
    const chatbox = document.getElementById("chatbox");
    chatbox.classList.toggle("show");
}
//ấn nút gửi 
function sendMessage(event) {
    event.preventDefault();
    const messageInput = document.getElementById("messageInput");
    const messageContent = messageInput.value.trim();
    
    if (messageContent) {
        addMessageToChat("sent", messageContent); // Tin nhắn của người dùng
        
        // Gọi API để tìm bản ghi từ AppSheet dựa vào REPORT ID, hàm ở dưới
        findAppSheetRecord(messageContent);

        messageInput.value = ""; // Reset trường nhập liệu
    }
}
//xu ly đoạn chat 
function addMessageToChat(type, message) {
    //chatContent đoạn hiênj chat bên html
    const chatContent = document.getElementById("chatContent");
    // Tạo một phần tử tin nhắn mới
    const messageItem = document.createElement("div");
    messageItem.classList.add("chatbox-message-item", type);
    messageItem.innerHTML = `
        <p>${message}</p>
        <span class="chatbox-message-item-time">${new Date().toLocaleTimeString()}</span>
    `;

    // Thêm tin nhắn vào nội dung cuộc hội thoại
    chatContent.appendChild(messageItem);

    // Cuộn xuống dưới cùng khi có tin nhắn mới
    chatContent.scrollTop = chatContent.scrollHeight;
}

// API: Tìm bản ghi từ AppSheet dựa vào REPORT ID
function findAppSheetRecord(report_id) {
    const APP_ID = 'a8cc83c0-c3bf-45e3-8739-8621466bf243';
    const TABLE_NAME = 'REPORTS';
    const API_KEY = 'V2-2wA1Z-6ER21-AMs2u-uCMkd-bWDjY-7Ev0S-LMnmu-rkPya';
    const url = `https://api.appsheet.com/api/v2/apps/${APP_ID}/tables/${TABLE_NAME}/Action`;

    const payload = {
        "Action": "Find",
        "Properties": {
            "Locale": "vi-VN",
            "Location": "21.028511, 105.804817",
            "TimeZone": "Asia/Ho_Chi_Minh"
        },
        "Rows": [
            {
                "REPORT ID": report_id
            }
        ]
    };

    fetch(url, {
        method: 'POST',
        headers: {
            'ApplicationAccessKey': API_KEY,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(data => {
		//hiển thị api
        const taskRequestProduct = data[0]['PRODUCT NAME'];
        const DESCRIPTION = data[0]['PRODUCT TYPE'];
        const description = data[0]['DESCRIPTION'];
		addMessageToChat("received", `Product: ${taskRequestProduct}.<br>Type: ${DESCRIPTION}.<br>Description: ${description}.`);
    })
    .catch(error => {
        console.error('Error:', error);
        const messageDisplay = document.getElementById("chatContent");
        messageDisplay.innerText = "Failed to fetch data!";
    });
}
