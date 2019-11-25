package com.github.lbovolini.lol.model;

import net.rithms.riot.api.endpoints.league.dto.LeagueEntry;

import java.util.Set;

public class SummonerLeague {

    private Set<LeagueEntry> positionsSet;

    public Set<LeagueEntry> getPositionsSet() {
        return positionsSet;
    }

    public void setPositionsSet(Set<LeagueEntry> positionsSet) {
        this.positionsSet = positionsSet;
    }
}
