package com.github.lbovolini.lol;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import net.rithms.riot.api.ApiConfig;
import net.rithms.riot.api.RiotApi;
import net.rithms.riot.api.endpoints.summoner.dto.Summoner;
import net.rithms.riot.constant.Platform;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.core.MongoTemplate;

@Configuration
@SpringBootApplication
public class LolApplication {

	public static void main(String[] args) throws Exception {
		SpringApplication.run(LolApplication.class, args);
	}

	@Bean
	public MongoClient mongoClient() {
		return MongoClients.create("mongodb://localhost:27017");
	}

	@Bean
	public MongoTemplate mongoTemplate() {
		return new MongoTemplate(mongoClient(), "lol");
	}

	@Bean
	public ApiConfig apiConfig() {
		return new ApiConfig().setKey("RGAPI-a17c9b26-5f7d-4aa6-a59c-4bed3a121426");
	}

	@Bean
	public RiotApi riotApi() {
		return new RiotApi(apiConfig());
	}

}
