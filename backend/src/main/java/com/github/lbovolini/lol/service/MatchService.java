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
        SummonerMatch summonerMatch = new SummonerMatch();

        List<MatchHistory> matchHistoryList = matchRepository.findByAccountIdOrderByGameCreationDesc(accountId);

        if (update) {
            matchHistoryList = updateMatchHistory(region, accountId);
        }

        summonerMatch.setMatchHistoryList(matchHistoryList);

        return summonerMatch;
    }

    private List<Participant> saveParticipant(Match match, MatchHistory matchHistory) {

        List<Participant> participantList = new ArrayList<>();

        for (net.rithms.riot.api.endpoints.match.dto.Participant dto : match.getParticipants()) {
            Participant participant = Convert.dtoToParticipantModel(dto);
            participant.setMatchHistory(matchHistory);
            participantList.add(participant);
        }

        participantRepository.saveAll(participantList);
        return participantList;
    }

    private List<ParticipantIdentity>  saveParticipantIdentity(Match match, MatchHistory matchHistory) {

        List<ParticipantIdentity> participantIdentityList = new ArrayList<>();

        for (net.rithms.riot.api.endpoints.match.dto.ParticipantIdentity dto: match.getParticipantIdentities()) {
            ParticipantIdentity participantIdentity = new ParticipantIdentity();
            participantIdentity.setParticipantId(dto.getParticipantId());

            Summoner summoner = Convert.playerDtoToSummonerModel(dto.getPlayer());
            participantIdentity.setSummoner(summoner);
            participantIdentity.setMatchHistory(matchHistory);

            String id = summoner.getId();
            if (!summonerRepository.existsById(id)) {
                summonerRepository.saveAndFlush(summoner);
            }

            participantIdentityList.add(participantIdentity);
        }

        participantIdentityRepository.saveAll(participantIdentityList);
        return participantIdentityList;
    }

    private List<MatchHistory> updateMatchHistory(Platform region, String accountId) {

        List<MatchHistory> matchHistoryList = new ArrayList<>();

        try {
            List<MatchReference> matchReferenceList = riotApi.getMatchListByAccountId(region, accountId).getMatches().subList(0, 20);

            for (MatchReference matchReference : matchReferenceList) {
                Match match = riotApi.getMatch(region, matchReference.getGameId());
                MatchHistory matchHistory  = Convert.dtoToMatchModel(match, accountId);

                matchRepository.save(matchHistory);

                matchHistory.setParticipantIdentities(saveParticipantIdentity(match, matchHistory));
                matchHistory.setParticipants(saveParticipant(match, matchHistory));
                matchHistoryList.add(matchHistory);
            }
        } catch (RiotApiException e) {
            e.printStackTrace();
        }

        return matchHistoryList;
    }

}