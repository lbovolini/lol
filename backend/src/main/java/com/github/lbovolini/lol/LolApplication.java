package com.github.lbovolini.lol;

import net.rithms.riot.api.ApiConfig;
import net.rithms.riot.api.RiotApi;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@SpringBootApplication
public class LolApplication {

	public static void main(String[] args) throws Exception {
		SpringApplication.run(LolApplication.class, args);
	}

	@Bean
	public ApiConfig apiConfig() {
		return new ApiConfig().setKey("RGAPI-67a7eb9e-979d-43d8-b79a-1451a7df15e1");
	}

	@Bean
	public RiotApi riotApi() {
		return new RiotApi(apiConfig());
	}

}
