package com.github.lbovolini.lol.model;

import net.rithms.riot.api.endpoints.match.dto.Match;

import java.util.List;

public class SummonerMatch {

    private List<Match> matchList;

    public List<Match> getMatchList() {
        return matchList;
    }

    public void setMatchList(List<Match> matchList) {
        this.matchList = matchList;
    }
}
