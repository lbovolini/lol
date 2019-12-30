package com.github.lbovolini.lol.service;

import com.github.lbovolini.lol.model.*;
import com.github.lbovolini.lol.repository.MatchRepository;
import com.github.lbovolini.lol.repository.ParticipantIdentityRepository;
import com.github.lbovolini.lol.repository.ParticipantRepository;
import com.github.lbovolini.lol.repository.SummonerRepository;
import com.github.lbovolini.lol.util.Convert;
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

    @Autowired
    ParticipantIdentityRepository participantIdentityRepository;

    @Autowired
    SummonerRepository summonerRepository;

    @Autowired
    ParticipantRepository participantRepository;

    public SummonerMatch findMatchHistory(String platform, String accountId, boolean update) {

        Platform region = Region.get(platform);

        List<MatchHistory> matchHistoryList = new ArrayList<>();
        SummonerMatch summonerMatch = new SummonerMatch();

        if (update) {
            try {
                List<MatchReference> matchReferenceList = riotApi.getMatchListByAccountId(region, accountId).getMatches().subList(0, 20);

                for (MatchReference matchReference : matchReferenceList) {
                    Match match = riotApi.getMatch(region, matchReference.getGameId());
                    MatchHistory matchHistory = Convert.dtoToMatchModel(match, accountId);

                    if (matchHistory.getId() == 0) {
                        System.out.println("ERRRRORRORR");
                    }

                    matchHistoryList.add(matchHistory);

                    List<ParticipantIdentity> participantIdentityList = new ArrayList<>();
                    List<Participant> participantList = new ArrayList<>();


                    matchHistory.setParticipants(participantList);
                    matchHistory.setParticipantIdentities(participantIdentityList);

                    matchRepository.save(matchHistory);

                    for (net.rithms.riot.api.endpoints.match.dto.ParticipantIdentity dto: match.getParticipantIdentities()) {
                        ParticipantIdentity participantIdentity = new ParticipantIdentity();
                        participantIdentity.setParticipantId(dto.getParticipantId());

                        Summoner summoner = Convert.playerDtoToSummonerModel(dto.getPlayer());
                        participantIdentity.setSummoner(summoner);
                        participantIdentity.setMatchHistory(matchHistory);
                        summonerRepository.save(summoner);

                        participantIdentityList.add(participantIdentity);
                        participantIdentityRepository.save(participantIdentity);
                    }

                    for (net.rithms.riot.api.endpoints.match.dto.Participant dto : match.getParticipants()) {
                        Participant participant = Convert.dtoToParticipantModel(dto);
                        participant.setMatchHistory(matchHistory);

                        participantList.add(participant);
                        participantRepository.save(participant);
                    }

                }
         
            } catch (RiotApiException e) {
                e.printStackTrace();
            }
        } else {

            matchHistoryList = matchRepository.findByAccountId(accountId);

            System.out.println(matchHistoryList);

/*            for (MatchHistory matchHistory : matchHistoryList) {
                List<ParticipantIdentity> participantIdentityList = participantIdentityRepository.findByMatchHistoryId(matchHistory.getId(), matchHistory);
                matchHistory.setParticipantIdentities(participantIdentityList);
            }*/
        }

        summonerMatch.setMatchHistoryList(matchHistoryList);

        return summonerMatch;
    }

}