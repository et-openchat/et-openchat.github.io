// contact.js
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contact-form');
  const emailInput = document.getElementById('email');
  const successMessage = document.getElementById('success-message');
  const submitButton = document.getElementById('submit-button');

  // ※ここにデプロイしたGASの「ウェブアプリURL」を貼り付けてください
  const GAS_WEBAPP_URL = 'https://script.google.com/macros/s/AKfycbyzk7RJqf5XM2K514t_kD7pbI22QNF2aMkJTFW-8ebCQ4kGfhugtFPFhc7dHnxDZLrE/exec';

  form.addEventListener('submit', function(e) {
    e.preventDefault(); // 通常の画面遷移（Googleフォームへの移動）をストップ
    
    // 1. メールアドレスの形式チェック（正規表現バリデーション）
    const emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (!emailPattern.test(emailInput.value)) {
      alert('有効なメールアドレスの形式で入力してください。');
      emailInput.focus();
      return;
    }

    // ボタンの二重サブミット防止
    submitButton.disabled = true;
    submitButton.innerText = '送信中...';

    // 2. データの整形（URLエンコード形式に変換）
    const formData = new FormData(form);
    const URLencoded = new URLSearchParams(formData);
    
    // 3. GASのウェブアプリへ送信
    fetch(GAS_WEBAPP_URL, {
      method: 'POST',
      body: URLencoded,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    .then(response => {
      if (response.ok) {
        // 送信成功時の処理（フォームを隠して完了メッセージを表示）
        form.style.display = 'none';
        successMessage.style.display = 'block';
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        throw new Error('サーバーエラーが発生しました');
      }
    })
    .catch(error => {
      alert('送信に失敗しました。お手数ですが、時間をおいて再度お試しください。');
      submitButton.disabled = false;
      submitButton.innerText = '送信する';
    });
  });
});
