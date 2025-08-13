package com.ImSnacks.NyeoreumnagiBatch;

import java.net.URI;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;


import org.springframework.web.client.RestClient;
import org.springframework.http.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.io.BufferedReader;
import java.io.IOException;

//public class ApiExplorer
//{
//    public static void main(String[] args) throws IOException
//    {
//        StringBuilder urlBuilder = new StringBuilder("http://apis.data.go.kr/1360000/LivingWthrIdxServiceV4/getUVIdxV4"); /*URL*/
////        urlBuilder.append("?" + URLEncoder.encode("ServiceKey","UTF-8") + "=서비스키"); /*Service Key*/
//        urlBuilder.append("?" + URLEncoder.encode("serviceKey","UTF-8") + "=" + URLEncoder.encode("eZoqTJOIoRf6Nvn/eKTOi8YquojKNfmDi2ZizR3cruLku6JZ2iTtEgcXAcFcv/Nbw+f0dLzUOAP/KVBz4dcmhg==", "UTF-8")); /*공공데이터포털에서 받은 인증키*/
//        urlBuilder.append("&" + URLEncoder.encode("areaNo","UTF-8") + "=" + URLEncoder.encode("1100000000", "UTF-8")); /*서울지점*/
//        urlBuilder.append("&" + URLEncoder.encode("time","UTF-8") + "=" + URLEncoder.encode("2025081300", "UTF-8")); /*2022년7월11일18시*/
//        urlBuilder.append("&" + URLEncoder.encode("dataType","UTF-8") + "=" + URLEncoder.encode("JSON", "UTF-8")); /*xml, json 선택(미입력시 xml)*/
//        URL url = new URL(urlBuilder.toString());
//        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
//        conn.setRequestMethod("GET");
//        conn.setRequestProperty("Content-type", "application/json");
//        System.out.println("Response code: " + conn.getResponseCode());
//        BufferedReader rd;
//
//        if(conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300)
//        {
//            rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
//        } else
//        {
//            rd = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
//        }
//        StringBuilder sb = new StringBuilder();
//        String line;
//        while ((line = rd.readLine()) != null)
//        {
//            sb.append(line);
//        }
//        rd.close();
//        conn.disconnect();
//        System.out.println("body: " + sb.toString());
//    }
//}

//public class ApiExplorer {
//    public static void main(String[] args) {
//        String url = "http://apis.data.go.kr/1360000/LivingWthrIdxServiceV4/getUVIdxV4";
//        String serviceKey = "eZoqTJOIoRf6Nvn/eKTOi8YquojKNfmDi2ZizR3cruLku6JZ2iTtEgcXAcFcv/Nbw+f0dLzUOAP/KVBz4dcmhg==";
//
//        String uri = UriComponentsBuilder.fromHttpUrl(url)
//                .queryParam("serviceKey", serviceKey)
//                .queryParam("areaNo", "1100000000")
//                .queryParam("time", "2025081300")
//                .queryParam("dataType", "JSON")
//                .encode() // 인코딩은 여기서!
//                .toUriString();
//
//        RestClient restClient = RestClient.create();
//        ResponseEntity<String> response = restClient.get()
//                .uri(uri)
//                .header("Content-type", "application/json")
//                .retrieve()
//                .toEntity(String.class);
//        System.out.println(response.getBody());
//    }
//}

public class ApiExplorer {
    public static void main(String[] args) {
        try {
            String serviceKey = URLEncoder.encode("eZoqTJOIoRf6Nvn/eKTOi8YquojKNfmDi2ZizR3cruLku6JZ2iTtEgcXAcFcv/Nbw+f0dLzUOAP/KVBz4dcmhg==", StandardCharsets.UTF_8);
            String areaNo = URLEncoder.encode("1100000000", StandardCharsets.UTF_8);
            String time = URLEncoder.encode("2025081300", StandardCharsets.UTF_8);
            String dataType = URLEncoder.encode("JSON", StandardCharsets.UTF_8);

            String url = String.format(
                    "http://apis.data.go.kr/1360000/LivingWthrIdxServiceV4/getUVIdxV4?serviceKey=%s&areaNo=%s&time=%s&dataType=%s",
                    serviceKey, areaNo, time, dataType
            );

            HttpClient client = HttpClient.newHttpClient();
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(url))
                    .header("Content-type", "application/json")
                    .GET()
                    .build();

            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

            System.out.println("Response code: " + response.statusCode());
            System.out.println("body: " + response.body());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}