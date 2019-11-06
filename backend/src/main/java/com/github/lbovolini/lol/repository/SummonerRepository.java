package com.github.lbovolini.lol.repository;

import net.rithms.riot.api.endpoints.summoner.dto.Summoner;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface SummonerRepository extends MongoRepository<Summoner, Long> {
}
