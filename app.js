// Instascan 라이브러리를 사용해 스캐너를 생성합니다.
let scanner = new Instascan.Scanner({ video: document.getElementById('preview') });
const startButton = document.getElementById('startButton'); // 이 변수가 필요합니다.

// 스캔 성공 시 발생하는 이벤트 리스너를 추가합니다.
scanner.addListener('scan', function (content) {
    document.getElementById('result').textContent = content;
    
    // QR 코드 내용을 '_' 기준으로 분리합니다.
    const scannedData = content.split('_');
    const scannedMaterialCode = scannedData[0];
    const scannedBatchNumber = scannedData[1];

    // 사용자가 입력한 자재 코드와 배치 번호 목록 가져오기
    const inputMaterialCode = document.getElementById('materialCode').value.trim();
    // textarea에서 여러 줄로 입력된 배치 번호를 배열로 만듭니다.
    const inputBatchNumbers = document.getElementById('batchNumbers').value.trim().split('\n').map(item => item.trim());

    const comparisonResultElement = document.getElementById('comparisonResult');

    // 입력값과 스캔값 비교
    if (scannedMaterialCode === inputMaterialCode && inputBatchNumbers.includes(scannedBatchNumber)) {
        comparisonResultElement.textContent = 'OK ✅';
        comparisonResultElement.style.color = 'green';
        alert('🟢 OK: 자재 코드와 배치 번호가 모두 일치합니다!');
    } else {
        comparisonResultElement.textContent = 'NG ❌';
        comparisonResultElement.style.color = 'red';
        alert('🔴 NG: 자재 코드 또는 배치 번호가 일치하지 않습니다.');
    }

    scanner.stop(); // 스캔 성공 후 스캐너를 중지합니다.
});

// 시작 버튼을 클릭했을 때만 카메라를 켜도록 변경합니다.
// 이 이벤트 리스너가 있어야 버튼이 작동합니다.
startButton.addEventListener('click', function() {
    Instascan.Camera.getCameras().then(function (cameras) {
        if (cameras.length > 0) {
            scanner.start(cameras[0]);
            startButton.style.display = 'none'; // 버튼을 숨깁니다.
        } else {
            console.error('카메라를 찾을 수 없습니다.');
            alert('카메라가 없어 QR 코드를 스캔할 수 없습니다. 😥');
        }
    }).catch(function (e) {
        console.error(e);
    });
});

