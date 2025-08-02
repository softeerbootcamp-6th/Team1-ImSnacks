package dto;

import java.util.List;

public class VilageFcstResponse {
    private Response response;

    // getters, setters
    public Response getResponse() { return response; }
    public void setResponse(Response response) { this.response = response; }

    public static class Response {
        private Header header;
        private Body body;

        public Header getHeader() { return header; }
        public void setHeader(Header header) { this.header = header; }

        public Body getBody() { return body; }
        public void setBody(Body body) { this.body = body; }
    }

    public static class Header {
        private String resultCode;
        private String resultMsg;

        public String getResultCode() { return resultCode; }
        public void setResultCode(String resultCode) { this.resultCode = resultCode; }

        public String getResultMsg() { return resultMsg; }
        public void setResultMsg(String resultMsg) { this.resultMsg = resultMsg; }
    }

    public static class Body {
        private String dataType;
        private Items items;

        public String getDataType() { return dataType; }
        public void setDataType(String dataType) { this.dataType = dataType; }

        public Items getItems() { return items; }
        public void setItems(Items items) { this.items = items; }
    }

    public static class Items {
        private List<Item> item;

        public List<Item> getItem() { return item; }
        public void setItem(List<Item> item) { this.item = item; }
    }

    public static class Item {
        private String baseDate;
        private String baseTime;
        private String category;
        private String fcstDate;
        private String fcstTime;
        private String fcstValue;
        private int nx;
        private int ny;

        // getters and setters
        public String getBaseDate() { return baseDate; }
        public void setBaseDate(String baseDate) { this.baseDate = baseDate; }

        public String getBaseTime() { return baseTime; }
        public void setBaseTime(String baseTime) { this.baseTime = baseTime; }

        public String getCategory() { return category; }
        public void setCategory(String category) { this.category = category; }

        public String getFcstDate() { return fcstDate; }
        public void setFcstDate(String fcstDate) { this.fcstDate = fcstDate; }

        public String getFcstTime() { return fcstTime; }
        public void setFcstTime(String fcstTime) { this.fcstTime = fcstTime; }

        public String getFcstValue() { return fcstValue; }
        public void setFcstValue(String fcstValue) { this.fcstValue = fcstValue; }

        public int getNx() { return nx; }
        public void setNx(int nx) { this.nx = nx; }

        public int getNy() { return ny; }
        public void setNy(int ny) { this.ny = ny; }
    }
}