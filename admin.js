const API_URL = "https://script.google.com/macros/s/AKfycbzi7JjJY5A4iY1jvQtPM13gz34mdZTJL8AEo03rQN2hs29utybUIv2CP4Zc5t44J0AH/exec";

async function onboard() {
  const data = {
    shop_name: document.getElementById("shop_name").value.trim(),
    owner_email: document.getElementById("owner_email").value.trim(),
    owner_password: document.getElementById("owner_password").value,
    master_key: document.getElementById("master_key").value
  };

  if (!data.shop_name || !data.owner_email || !data.owner_password || !data.master_key) {
    alert("Vui lòng nhập đủ thông tin");
    return;
  }

  document.getElementById("result").style.display = "block";
  document.getElementById("result").innerText = "⏳ Đang tạo shop...";

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify({
        action: "system.onboard",
        data
      })
    });

    const json = await res.json();

    if (!json.success) {
      throw json.error;
    }

    document.getElementById("result").innerText =
`✅ TẠO SHOP THÀNH CÔNG

SHOP: ${data.shop_name}

API KEY:
${json.data.api_key}

GOOGLE SHEET:
${json.data.sheet_url}

HƯỚNG DẪN KHÁCH:
1. Mở Google Sheet
2. Share Editor cho email Apps Script
3. Dán API KEY vào FE
`;

  } catch (err) {
    document.getElementById("result").innerText =
      "❌ LỖI:\n" + err;
  }
}
