package com.github.lbovolini.lol.service;

import com.github.lbovolini.lol.model.League;
import com.github.lbovolini.lol.model.SummonerLeague;
import com.github.lbovolini.lol.repository.LeagueRepository;
import com.github.lbovolini.lol.util.Convert;
import com.github.lbovolini.lol.util.Region;
import net.rithms.riot.api.RiotApi;
import net.rithms.riot.api.RiotApiException;
import net.rithms.riot.api.endpoints.league.dto.LeagueEntry;
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

    public SummonerLeague findAllLeague(String summonerId, String platform, boolean update) {

        Platform region = Region.get(platform);

        if (update) {
            update(region, summonerId);
        }

        Set<League> leagues = leagueRepository.findBySummonerId(summonerId);
        SummonerLeague summonerLeague = new SummonerLeague();
        summonerLeague.setPositionsSet(leagues);

        return summonerLeague;
    }

    private void update(Platform region, String summonerId) {
        try {
            Set<League> leagues = new HashSet<>();
            Set<LeagueEntry> dtos = riotApi.getLeagueEntriesBySummonerId(region, summonerId);

            for (LeagueEntry dto : dtos) {
                leagues.add(Convert.dtoToLeagueModel(dto));
            }
            leagueRepository.saveAll(leagues);
        } catch (RiotApiException e) {
            e.printStackTrace();
        }
    }
}