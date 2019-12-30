package com.github.lbovolini.lol.model;

import java.util.List;

public class SummonerMatch {

    private List<MatchHistory> matchHistoryList;

    public List<MatchHistory> getMatchHistoryList() {
        return matchHistoryList;
    }

    public void setMatchHistoryList(List<MatchHistory> matchHistoryList) {
        this.matchHistoryList = matchHistoryList;
    }
}
