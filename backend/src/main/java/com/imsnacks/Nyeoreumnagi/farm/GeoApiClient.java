package com.imsnacks.Nyeoreumnagi.farm;

import com.imsnacks.Nyeoreumnagi.farm.dto.response.GeoApiResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.util.Pair;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;
import org.springframework.web.util.UriComponentsBuilder;

@Component
public class GeoApiClient {
    @Value("${secret.geo-api-service-key}")
    public String key;

    public Pair<Double, Double> getCoordinates(String address) {

        String uriString = getGeoCoderURI(address);


        RestClient restClient = RestClient.create();

        ResponseEntity<GeoApiResponse> response = restClient.get()
                .uri(uriString)
                .retrieve()
                .toEntity(GeoApiResponse.class);

        return StringToDoubleOfNxNy(response.getBody().getNxNy());
    }

    private String getGeoCoderURI(String address) {
        String uriString = UriComponentsBuilder.newInstance()
                .scheme("https")
                .host("api.vworld.kr")
                .path("/req/address")
                .queryParam("service", "address")
                .queryParam("request", "getcoord")
                .queryParam("version", "2.0")
                .queryParam("crs", "epsg:4326")
                .queryParam("refine", "true")
                .queryParam("simple", "true")
                .queryParam("type", "PARCEL")
                .queryParam("address", address)
                .queryParam("key", key)
                .build().toString();
        return uriString;
    }

    private Pair<Double, Double> StringToDoubleOfNxNy(Pair<String, String> nxNy){
        double nx =  Double.parseDouble(nxNy.getFirst());
        double ny =  Double.parseDouble(nxNy.getSecond());

        return Pair.of(nx, ny);
    }
}
