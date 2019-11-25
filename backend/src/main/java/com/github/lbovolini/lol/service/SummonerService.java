package com.github.lbovolini.lol.service;

import com.github.lbovolini.lol.exception.ResourceNotFoundException;
import com.github.lbovolini.lol.repository.SummonerRepository;
import com.github.lbovolini.lol.util.Region;
import net.rithms.riot.api.RiotApi;
import net.rithms.riot.api.RiotApiException;
import net.rithms.riot.api.endpoints.summoner.dto.Summoner;
import net.rithms.riot.constant.Platform;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

@Service
public class SummonerService {

    @Autowired
    RiotApi riotApi;

    @Autowired
    MongoTemplate mongoTemplate;

    @Autowired
    SummonerRepository summonerRepository;

    public Summoner findByNameAndPlatform(String name, String platform) {

        //Query query = new Query(Criteria.where("name").regex("^" + name + "$", "i").and("platform").is(platform));

        //SummonerModel summonerModel = mongoTemplate.findOne(query, SummonerModel.class);

        Platform region = Region.get(platform);



        try {
            Summoner summoner = riotApi.getSummonerByName(region, name);
            return summoner;
        } catch (RiotApiException e) {
            throw new ResourceNotFoundException(e.getMessage());
        }
     }




}
