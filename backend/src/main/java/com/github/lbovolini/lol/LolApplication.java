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
		return new ApiConfig().setKey("RGAPI-66773194-00f0-467d-b8c1-29cdf5de4f49");
	}

	@Bean
	public RiotApi riotApi() {
		return new RiotApi(apiConfig());
	}

}
