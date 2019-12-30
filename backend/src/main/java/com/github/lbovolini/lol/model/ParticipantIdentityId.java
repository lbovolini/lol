package com.github.lbovolini.lol.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class ParticipantIdentityId implements Serializable {

    @JsonIgnore
    private MatchHistory matchHistory;
    @JsonIgnore
    private Summoner summoner;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "match_history_id")
    public MatchHistory getMatchHistory() {
        return matchHistory;
    }

    public void setMatchHistory(MatchHistory matchHistory) {
        this.matchHistory = matchHistory;
    }

    @OneToOne
    @JoinColumn(name = "summoner_id")
    public Summoner getSummoner() {
        return summoner;
    }

    public void setSummoner(Summoner summoner) {
        this.summoner = summoner;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ParticipantIdentityId that = (ParticipantIdentityId) o;
        return matchHistory.equals(that.matchHistory) &&
                summoner.equals(that.summoner);
    }

    @Override
    public int hashCode() {
        return Objects.hash(matchHistory, summoner);
    }
}
