專題報告

1. 名稱

專題名稱：簡易通訊錄管理系統

學號：24113110

GitHub連結：https://github.com/lavachocolate01/telebook

2. 目的

方便現代人不想寫字與用紙筆紀錄周遭人的電話或是電子郵件時候，可以利用線上雲端的方式紀錄屬於現代人的專屬通訊錄

3. 功能

1.輸入姓名與電話後按 新增聯絡人，可以將輸入的聯絡人與電話號碼加入到右方的清單

2.在搜尋欄輸入聯絡人或電話等關鍵搜尋字會立即過濾並搜尋出符合搜尋的目標

3.點及右方聯絡人清單中的刪除按鈕後會先出現確認刪除的提示窗，再次點及確認後會刪除選取的對應聯絡人

4.如果搜尋中並未出現符合搜尋關鍵字的聯絡人，或是清單位有聯絡人的話，會出現 目前沒有符合的聯絡人資料 的提示字

4. 程式運作流程說明

步驟 1：建立 contacts 陣列與初始化

說明：在網頁後台系統啟動時載入初始範例聯絡人資料，並綁定所有按鈕與輸入框的監聽器

class AddressBookSystem {
  constructor() {
    this.contacts = [
      { id: 1, name: "王小明", phone: "0912-345-678" },
      { id: 2, name: "李小華", phone: "0987-654-321" }
    ];
    this.searchKeyword = "";
    // 取得 DOM 元素並初始化
    this.init();
  }
}


程式碼說明：用類別將資料與操作包裝起來，並在 init() 中設定點擊與輸入事件

步驟 2：新增聯絡人防呆處理

說明：讀取輸入框內容，檢查是否空白或電話重複，通過後加入陣列並重新渲染

addContact() {
  const name = this.nameInput.value.trim();
  const phone = this.phoneInput.value.trim();

  if (name === "" || phone === "") {
    alert("姓名與電話欄位不得為空白！");
    return;
  }

  const isDuplicate = this.contacts.some(contact => contact.phone === phone);
  if (isDuplicate) {
    alert("此電話號碼已經存在通訊錄中！");
    return;
  }

  this.contacts.push({ id: Date.now(), name, phone });
  this.render();
}


程式碼說明：透過 if 條件判斷欄位空白與 some 方法檢查重複，避免錯誤資料進入陣列

步驟 3：即時過濾與畫面渲染

說明：利用陣列方法 filter 與字串方法 includes 做出關鍵字搜尋，並根據結果即時更新 HTML 畫面

render() {
  const filteredContacts = this.contacts.filter(contact => {
    return contact.name.includes(this.searchKeyword) || contact.phone.includes(this.searchKeyword);
  });

  this.contactListEl.innerHTML = '';
  if (filteredContacts.length === 0) {
    this.contactListEl.innerHTML = '<p>目前沒有符合的聯絡人資料</p>';
    return;
  }

  filteredContacts.forEach(contact => {
    // 產生聯絡人清單 HTML 並加入畫面中
  });
}


程式碼說明：filter 會篩選出符合條件的子陣列，includes 則用來比對姓名或電話是否包含關鍵字