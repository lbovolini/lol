package com.github.lbovolini.lol.service;

import com.github.lbovolini.lol.model.SummonerMatch;
import com.github.lbovolini.lol.repository.MatchRepository;
import com.github.lbovolini.lol.util.Region;
import net.rithms.riot.api.RiotApi;
import net.rithms.riot.api.RiotApiException;
import net.rithms.riot.api.endpoints.match.dto.Match;
import net.rithms.riot.api.endpoints.match.dto.MatchReference;
import net.rithms.riot.constant.Platform;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MatchService {

    @Autowired
    RiotApi riotApi;

    @Autowired
    MatchRepository matchRepository;

    public SummonerMatch findMatchHistory(String platform, String accountId) {

        Platform region = Region.get(platform);

//        List<MatchHistoryModel> all = matchHistoryRepository.findAll();
//
//        if (!all.isEmpty()) {
//            return all;
//        }

        List<Match> matchList = new ArrayList<>();
        SummonerMatch summonerMatch = new SummonerMatch();

        try {
            List<MatchReference> matchReferenceList = riotApi.getMatchListByAccountId(region, accountId).getMatches().subList(0, 20);

            for (MatchReference matchReference: matchReferenceList) {
                Match match = riotApi.getMatch(region, matchReference.getGameId());
                matchList.add(match);
                //matchHistoryRepository.save(matchHistoryModel);
            }
        } catch (RiotApiException e) { e.printStackTrace(); }

        summonerMatch.setMatchList(matchList);

        return summonerMatch;
    }

}
