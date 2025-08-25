package com.imsnacks.Nyeoreumnagi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class NyeoreumnagiApplication {

	public static void main(String[] args) {
		SpringApplication.run(NyeoreumnagiApplication.class, args);
	}

}
