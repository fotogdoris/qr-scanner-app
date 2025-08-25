const materialCodeInput = document.getElementById('materialCode');
const batchNumbersInput = document.getElementById('batchNumbers');
const resultElement = document.getElementById('result');
const comparisonResultElement = document.getElementById('comparisonResult');
const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');

// 스캐너 객체 생성
const html5QrCode = new Html5Qrcode("reader");

// QR 코드 스캔 성공 시 실행될 함수
const onScanSuccess = (decodedText, decodedResult) => {
    resultElement.textContent = decodedText;

    const scannedData = decodedText.split('_');
    const scannedMaterialCode = scannedData[0];
    const scannedBatchNumber = scannedData[1];

    const inputMaterialCode = materialCodeInput.value.trim();
    const inputBatchNumbers = batchNumbersInput.value.trim().split('\n').map(item => item.trim());

    if (scannedMaterialCode === inputMaterialCode && inputBatchNumbers.includes(scannedBatchNumber)) {
        comparisonResultElement.textContent = 'OK ✅';
        comparisonResultElement.style.color = 'green';
        alert('🟢 OK: 자재 코드와 배치 번호가 모두 일치합니다!');
    } else {
        comparisonResultElement.textContent = 'NG ❌';
        comparisonResultElement.style.color = 'red';
        alert('🔴 NG: 자재 코드 또는 배치 번호가 일치하지 않습니다.');
    }
};

// QR 코드 스캔 에러 시 실행될 함수
const onScanFailure = (error) => {
    // 에러 로그는 콘솔에만 표시합니다.
    console.warn(`QR code scan error: ${error}`);
};

// '스캔 시작' 버튼 클릭 이벤트
startButton.addEventListener('click', () => {
    // HTML5-QR-Code 스캐너 시작
    html5QrCode.start({ facingMode: "environment" }, {
        fps: 10,
        qrbox: { width: 250, height: 250 }
    }, onScanSuccess, onScanFailure)
    .then(() => {
        startButton.style.display = 'none';
        stopButton.style.display = 'inline-block';
    })
    .catch(err => {
        console.error("스캐너 시작 오류: ", err);
        alert('카메라 시작에 실패했습니다. 권한을 확인해 주세요.');
    });
});

// '스캔 중지' 버튼 클릭 이벤트
stopButton.addEventListener('click', () => {
    html5QrCode.stop()
    .then(ignore => {
        startButton.style.display = 'inline-block';
        stopButton.style.display = 'none';
    })
    .catch(err => {
        console.error("스캐너 중지 오류: ", err);
    });
});

stopButton.style.display = 'none'; // 초기에는 중지 버튼 숨기기
