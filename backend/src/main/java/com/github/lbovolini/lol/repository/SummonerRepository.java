package com.github.lbovolini.lol.repository;

import net.rithms.riot.api.endpoints.summoner.dto.Summoner;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SummonerRepository extends MongoRepository<Summoner, String> {
    Summoner findByNameIgnoreCase(String name);
}
