
class AddressBookSystem {
constructor() {
    // 儲存聯絡人的位置
    this.contacts = [
    { id: 1, name: "王小明", phone: "0912-345-678" },
    { id: 2, name: "李小華", phone: "0987-654-321" }
    ];

    // 搜尋欄目前使用者的字
    this.searchKeyword = "";

    // 取得網頁元素，並標註保存起來方便等等系統後台取用
    this.nameInput = document.querySelector('#name-input');
    this.phoneInput = document.querySelector('#phone-input');
    this.addBtn = document.querySelector('#add-btn');
    this.searchInput = document.querySelector('#search-input');
    this.contactListEl = document.querySelector('#contact-list');
    this.countDisplayEl = document.querySelector('#count-display');

    // 防呆，防止出錯
    if (!this.nameInput || !this.phoneInput || !this.addBtn || !this.searchInput || !this.contactListEl) {
    console.error('找不到必要的 HTML 元素，請檢查 id 設定！');
    return;
    }

    this.init();
}

  // 初始化：將畫面渲染與事件綁定
init() {
    this.render();

    // 綁定新增按鈕
    this.addBtn.addEventListener('click', () => this.addContact());

    // 綁定搜尋輸入框的事件（即時加載並顯示搜尋後的結果）
    this.searchInput.addEventListener('input', (e) => {
    this.searchKeyword = e.target.value.trim();
      this.render(); // 無須重新整理就會顯示搜尋後的結果
    });

    // 綁定刪除聯絡人按鈕的功能
    this.contactListEl.addEventListener('click', (e) => this.handleDelete(e));
}

  // 新增聯絡人的涵式
addContact() {
    const name = this.nameInput.value.trim();
    const phone = this.phoneInput.value.trim();

    // 檢查姓名與電話號碼的欄位是否空白未輸入
    if (name === "" || phone === "") {
    alert("姓名與電話欄位不得為空白！");
    return;
    }

    // 檢查電話號碼是否重複
    const isDuplicate = this.contacts.some(contact => contact.phone === phone);
    if (isDuplicate) {
    alert("此電話號碼已經存在通訊錄中！");
    return;
    }

    // 建立新聯絡人物件，並加入紀錄聯絡人的清單內
    const newContact = {
      id: Date.now(), // 使用時間來作為清單內聯絡人的唯一UID
    name: name,
    phone: phone
    };

    this.contacts.push(newContact);

    // 清空輸入框
    this.nameInput.value = "";
    this.phoneInput.value = "";

    // 重新渲染整個畫面
    this.render();
}

  // 處理刪除聯絡人的涵式
handleDelete(e) {
    const btn = e.target.closest('.delete-btn');
    if (!btn) return;

    const id = Number(btn.dataset.id);

    // 刪除前跳出確認視窗
    const isConfirm = confirm("確定要刪除這位聯絡人嗎？");
    if (isConfirm) {
      // 找出這筆資料並刪除
    const index = this.contacts.findIndex(c => c.id === id);
    if (index !== -1) {
        this.contacts.splice(index, 1);
        this.render();
    }
    }
}

  // 渲染畫面的涵式
render() {
    // 根據輸入的關鍵字過濾聯絡人
    const filteredContacts = this.contacts.filter(contact => {
    return contact.name.includes(this.searchKeyword) || contact.phone.includes(this.searchKeyword);
    });

    // 清空目前的列表
    this.contactListEl.innerHTML = '';
    this.countDisplayEl.textContent = filteredContacts.length;

    // 當清單或搜尋為空白時顯示提示文字提醒使用者
    if (filteredContacts.length === 0) {
    this.contactListEl.innerHTML = '<p style="color:#888; text-align:center;">目前沒有符合的聯絡人資料</p>';
    return;
    }

    // 產生以及渲染聯絡人清單
    filteredContacts.forEach(contact => {
    const div = document.createElement('div');
    div.className = 'item';
    div.innerHTML = `
        <div>
        <strong>${contact.name}</strong><br>
        <span style="font-size: 14px; color: #666;">${contact.phone}</span>
        </div>
        <button class="delete-btn" data-id="${contact.id}">刪除</button>
    `;
    this.contactListEl.append(div);
    });
}
}

// 確保網頁加載好之後才將整個程式碼的功能加載避免提早加載產生報錯
document.addEventListener('DOMContentLoaded', () => {
new AddressBookSystem();
});
