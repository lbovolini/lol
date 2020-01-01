package com.github.lbovolini.lol.util;

import com.github.lbovolini.lol.model.League;
import com.github.lbovolini.lol.model.MatchHistory;
import com.github.lbovolini.lol.model.Participant;
import com.github.lbovolini.lol.model.Summoner;
import net.rithms.riot.api.endpoints.league.dto.LeagueEntry;
import net.rithms.riot.api.endpoints.match.dto.ParticipantStats;
import net.rithms.riot.api.endpoints.match.dto.Player;

public class Convert {

    public static Summoner dtoToSummonerModel(net.rithms.riot.api.endpoints.summoner.dto.Summoner dto) {

        Summoner summoner = new Summoner();

        summoner.setId(dto.getId());
        summoner.setAccountId(dto.getAccountId());
        summoner.setName(dto.getName());
        summoner.setProfileIconId(dto.getProfileIconId());
        summoner.setPuuid(dto.getPuuid());
        summoner.setRevisionDate(dto.getRevisionDate());
        summoner.setSummonerLevel(dto.getSummonerLevel());

        return summoner;
    }

    public static League dtoToLeagueModel(LeagueEntry dto) {

        League league = new League();

        league.setId(dto.getLeagueId());
        league.setFreshBlood(dto.isFreshBlood());
        league.setHotStreak(dto.isHotStreak());
        league.setInactive(dto.isInactive());
        league.setLeaguePoints(dto.getLeaguePoints());
        league.setLosses(dto.getLosses());
        league.setQueueType(dto.getQueueType());
        league.setRank(dto.getRank());
        league.setSummonerId(dto.getSummonerId());
        league.setSummonerName(dto.getSummonerName());
        league.setTier(dto.getTier());
        league.setVeteran(dto.isVeteran());
        league.setWins(dto.getWins());

        return league;
    }

    public static MatchHistory dtoToMatchModel(net.rithms.riot.api.endpoints.match.dto.Match dto, String accountId) {

        MatchHistory matchHistory = new MatchHistory();

        matchHistory.setId(dto.getGameId());
        matchHistory.setGameCreation(dto.getGameCreation());
        matchHistory.setGameDuration(dto.getGameDuration());
        matchHistory.setGameMode(dto.getGameMode());
        matchHistory.setGameType(dto.getGameType());
        matchHistory.setGameVersion(dto.getGameVersion());
        matchHistory.setMapId(dto.getMapId());
        matchHistory.setPlatformId(dto.getPlatformId());
        matchHistory.setQueueId(dto.getQueueId());
        matchHistory.setSeasonId(dto.getSeasonId());
        matchHistory.setAccountId(accountId);

        return matchHistory;
    }

    public static Summoner playerDtoToSummonerModel(Player dto) {

        Summoner summoner = new Summoner();

        summoner.setId(dto.getSummonerId());
        summoner.setName(dto.getSummonerName());
        summoner.setProfileIconId(dto.getProfileIcon());
        summoner.setAccountId(dto.getAccountId());
        summoner.setPlatform(dto.getCurrentPlatformId().replace("1", ""));

        return summoner;
    }

    public static Participant dtoToParticipantModel(net.rithms.riot.api.endpoints.match.dto.Participant dto) {

        Participant participant = new Participant();

        participant.setChampionId(dto.getChampionId());
        participant.setParticipantId(dto.getParticipantId());
        participant.setSpell1Id(dto.getSpell1Id());
        participant.setSpell2Id(dto.getSpell2Id());
        participant.setTeamId(dto.getTeamId());

        ParticipantStats stats = dto.getStats();

        participant.setAssists(stats.getAssists());
        participant.setChampLevel(stats.getChampLevel());
        participant.setCombatPlayerScore(stats.getCombatPlayerScore());
        participant.setDamageDealtToObjectives(stats.getDamageDealtToObjectives());
        participant.setDamageDealtToTurrets(stats.getDamageDealtToTurrets());
        participant.setDamageSelfMitigated(stats.getDamageSelfMitigated());
        participant.setDeaths(stats.getDeaths());
        participant.setDoubleKills(stats.getDoubleKills());
        participant.setFirstBloodAssist(stats.isFirstBloodAssist());
        participant.setFirstBloodKill(stats.isFirstBloodKill());
        participant.setFirstInhibitorAssist(stats.isFirstInhibitorAssist());
        participant.setFirstInhibitorKill(stats.isFirstInhibitorKill());
        participant.setFirstTowerAssist(stats.isFirstTowerAssist());
        participant.setFirstTowerKill(stats.isFirstTowerKill());
        participant.setGoldEarned(stats.getGoldEarned());
        participant.setGoldSpent(stats.getGoldSpent());
        participant.setInhibitorKills(stats.getInhibitorKills());
        participant.setItem0(stats.getItem0());
        participant.setItem1(stats.getItem1());
        participant.setItem2(stats.getItem2());
        participant.setItem3(stats.getItem3());
        participant.setItem4(stats.getItem4());
        participant.setItem5(stats.getItem5());
        participant.setItem6(stats.getItem6());
        participant.setKillingSprees(stats.getKillingSprees());
        participant.setKills(stats.getKills());
        participant.setLargestCriticalStrike(stats.getLargestCriticalStrike());
        participant.setLargestKillingSpree(stats.getLargestKillingSpree());
        participant.setLargestMultiKill(stats.getLargestMultiKill());
        participant.setLongestTimeSpentLiving(stats.getLongestTimeSpentLiving());
        participant.setMagicDamageDealt(stats.getMagicDamageDealt());
        participant.setMagicDamageDealtToChampions(stats.getMagicDamageDealtToChampions());
        participant.setMagicalDamageTaken(stats.getMagicalDamageTaken());
        participant.setNeutralMinionsKilled(stats.getNeutralMinionsKilled());
        participant.setPentaKills(stats.getPentaKills());
        participant.setPhysicalDamageDealt(stats.getPhysicalDamageDealt());
        participant.setPhysicalDamageDealtToChampions(stats.getPhysicalDamageDealtToChampions());
        participant.setPhysicalDamageTaken(stats.getPhysicalDamageTaken());
        participant.setQuadraKills(stats.getQuadraKills());
        participant.setSightWardsBoughtInGame(stats.getSightWardsBoughtInGame());
        participant.setTeamObjective(stats.getTeamObjective());
        participant.setTotalDamageDealt(stats.getTotalDamageDealt());
        participant.setTotalDamageDealtToChampions(stats.getTotalDamageDealtToChampions());
        participant.setTotalDamageTaken(stats.getTotalDamageTaken());
        participant.setTotalHeal(stats.getTotalHeal());
        participant.setTotalMinionsKilled(stats.getTotalMinionsKilled());
        participant.setTotalPlayerScore(stats.getTotalPlayerScore());
        participant.setTripleKills(stats.getTripleKills());
        participant.setTrueDamageDealt(stats.getTrueDamageDealt());
        participant.setTrueDamageDealtToChampions(stats.getTrueDamageDealtToChampions());
        participant.setTrueDamageTaken(stats.getTrueDamageTaken());
        participant.setTurretKills(stats.getTurretKills());
        participant.setUnrealKills(stats.getUnrealKills());
        participant.setVisionScore(stats.getVisionScore());
        participant.setVisionWardsBoughtInGame(stats.getVisionWardsBoughtInGame());
        participant.setWardsKilled(stats.getWardsKilled());
        participant.setWardsPlaced(stats.getWardsPlaced());
        participant.setWin(stats.isWin());
        participant.setPerk0(stats.getPerk0());
        participant.setPerk1(stats.getPerk1());
        participant.setPerk2(stats.getPerk2());
        participant.setPerk3(stats.getPerk3());
        participant.setPerk4(stats.getPerk4());
        participant.setPerk5(stats.getPerk5());
        participant.setPerkPrimaryStyle(stats.getPerkPrimaryStyle());
        participant.setPerkSubStyle(stats.getPerkSubStyle());
        participant.setStatPerk0(stats.getStatPerk0());
        participant.setStatPerk1(stats.getStatPerk1());
        participant.setStatPerk2(stats.getStatPerk2());

        return participant;
    }
}
