package com.example.air_quality_map;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@Controller
public class AirQualityController {

    // API 데이터 가져오는 부분
    @GetMapping("/api/air-quality")
    @ResponseBody
    public String getAirQuality() {
        String url = "http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty?serviceKey=UFT7P7tmWISSJ8jbElaHrHch5evkuFmadwU5w6aNwXJZJmneLHUEl5y67vhpbzjwhdD9wCBxR5f109cn2fpLPQ%3D%3D&returnType=json&numOfRows=10&pageNo=1&sidoName=서울&ver=1.0";
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.getForObject(url, String.class);
    }

    // HTML 페이지를 반환하는 부분
    @GetMapping("/")
    public String getHomePage() {
        return "index";  // resources/templates/index.html 페이지를 반환
    }
}
