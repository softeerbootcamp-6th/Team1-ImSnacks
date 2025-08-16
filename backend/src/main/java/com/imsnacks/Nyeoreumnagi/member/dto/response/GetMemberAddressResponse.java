package com.imsnacks.Nyeoreumnagi.member.dto.response;

public record GetMemberAddressResponse(
        String state,
        String city,
        String town,
        String address
) {
}
