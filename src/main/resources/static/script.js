console.log("JavaScript 파일이 로드되었습니다.");

// Leaflet 지도를 초기화
var map = L.map('map').setView([37.5665, 126.9780], 11); // 서울 좌표

// OSM 타일 추가
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// API에서 미세먼지 데이터 가져오기
fetch("/api/air-quality")
    .then(response => response.json())  // JSON 응답으로 변환
    .then(data => {
        const items = data.response.body.items;

        // items 배열을 제대로 가져왔는지 확인
        console.log("미세먼지 데이터:", items);

        items.forEach(item => {
            const stationName = item.stationName;
            const pm10Value = item.pm10Value;
            const pm25Value = item.pm25Value;
            const o3Value = item.o3Value;

            // 각 관측소 이름에 맞는 좌표를 반환하는 함수
            const latLng = getStationCoordinates(stationName);

            // 각 관측소에 대해 처리된 데이터를 콘솔에 출력
            console.log(`관측소: ${stationName}, 좌표: ${latLng}, PM10: ${pm10Value}, PM2.5: ${pm25Value}, O3: ${o3Value}`);

            // 지도에 마커 추가, 마커 클릭 시 팝업으로 미세먼지 정보 표시
            L.marker(latLng).addTo(map)
                .bindPopup(`<b>${stationName}</b><br>PM10: ${pm10Value}<br>PM2.5: ${pm25Value}<br>O3: ${o3Value}`);
        });
    });

// 서울 주요 관측소의 좌표를 반환하는 함수
function getStationCoordinates(stationName) {
    switch (stationName) {
        case "중구": return [37.5636, 126.9977];
        case "종로구": return [37.5729, 126.9793];
        case "한강대로": return [37.5547, 126.9707];
        // 추가 관측소의 좌표 필요시 추가
        default: return [37.5665, 126.9780]; // 기본 서울 좌표
    }
}
