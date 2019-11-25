package com.github.lbovolini.lol.service;

import com.github.lbovolini.lol.model.SummonerLeague;
import com.github.lbovolini.lol.repository.LeagueRepository;
import com.github.lbovolini.lol.util.Region;
import net.rithms.riot.api.RiotApi;
import net.rithms.riot.api.RiotApiException;
import net.rithms.riot.api.endpoints.league.dto.LeagueEntry;
import net.rithms.riot.api.endpoints.league.dto.LeaguePosition;
import net.rithms.riot.constant.Platform;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class LeagueService {

    @Autowired
    RiotApi riotApi;

    @Autowired
    LeagueRepository leagueRepository;

    public SummonerLeague findAllLeague(String summonerId, String platform) {

        Platform region = Region.get(platform);

        SummonerLeague summonerLeague = new SummonerLeague();

        try {
            Set<LeagueEntry> positionsSet = riotApi.getLeagueEntriesBySummonerId(region, summonerId);
            summonerLeague.setPositionsSet(positionsSet);
        } catch (RiotApiException e) { e.printStackTrace(); }

        return summonerLeague;
    }
}
