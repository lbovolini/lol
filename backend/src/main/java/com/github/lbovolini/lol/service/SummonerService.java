package com.github.lbovolini.lol.service;

import com.github.lbovolini.lol.repository.SummonerRepository;
import net.rithms.riot.api.RiotApi;
import net.rithms.riot.api.RiotApiException;
import net.rithms.riot.api.endpoints.summoner.dto.Summoner;
import net.rithms.riot.constant.Platform;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
public class SummonerService {

    @Autowired
    RiotApi riotApi;

    @Autowired
    MongoTemplate mongoTemplate;

    @Autowired
    SummonerRepository summonerRepository;

    public Summoner findByNameAndPlatform(String name, String platform) {
        Query query = new Query();
        query.addCriteria(Criteria.where("name").regex("^" + name + "$", "i"));

        Summoner summoner = mongoTemplate.findOne(query, Summoner.class);

        if (Objects.isNull(summoner)) {
            try {
                summoner = riotApi.getSummonerByName(Platform.BR, name);
                summonerRepository.save(summoner);
            } catch (RiotApiException e) {
                e.printStackTrace();
                summoner = null;
            }
        }
        return summoner;
    }
}
