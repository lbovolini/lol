package com.github.lbovolini.lol.repository;

import net.rithms.riot.api.endpoints.league.dto.LeagueEntry;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LeagueRepository extends MongoRepository<LeagueEntry, String> {
}
