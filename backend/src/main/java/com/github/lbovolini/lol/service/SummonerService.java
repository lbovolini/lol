package com.github.lbovolini.lol.service;

import com.github.lbovolini.lol.exception.ResourceNotFoundException;
import com.github.lbovolini.lol.model.Summoner;
import com.github.lbovolini.lol.repository.SummonerRepository;
import com.github.lbovolini.lol.util.Convert;
import com.github.lbovolini.lol.util.Region;
import net.rithms.riot.api.RiotApi;
import net.rithms.riot.api.RiotApiException;
import net.rithms.riot.constant.Platform;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SummonerService {

    @Autowired
    RiotApi riotApi;


    @Autowired
    SummonerRepository summonerRepository;

    public Summoner findByNameAndPlatform(String name, String platform, boolean update) {

        Platform region = Region.get(platform);

        net.rithms.riot.api.endpoints.summoner.dto.Summoner dto = null;
        Summoner summoner = null;

        if (update) {
            try {
                dto = riotApi.getSummonerByName(region, name);
            } catch (RiotApiException e) {
                e.printStackTrace();
            }
            summoner = Convert.dtoToSummonerModel(dto);
            summoner.setPlatform(platform);
            summonerRepository.save(summoner);
        } else {
            summoner = summonerRepository.findByNameIgnoreCaseAndPlatform(name, platform);
        }
        return summoner;
     }




}
