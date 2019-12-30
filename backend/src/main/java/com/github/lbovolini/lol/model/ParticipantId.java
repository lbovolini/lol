package com.github.lbovolini.lol.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.Embeddable;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class ParticipantId implements Serializable {

    @JsonIgnore
    private int participantId;

    @JsonIgnore
    private MatchHistory matchHistory;

    public int getParticipantId() {
        return participantId;
    }

    public void setParticipantId(int participantId) {
        this.participantId = participantId;
    }

    @ManyToOne
    @JoinColumn(name = "match_history_id")
    public MatchHistory getMatchHistory() {
        return matchHistory;
    }

    public void setMatchHistory(MatchHistory matchHistory) {
        this.matchHistory = matchHistory;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ParticipantId that = (ParticipantId) o;
        return participantId == that.participantId &&
                matchHistory.equals(that.matchHistory);
    }

    @Override
    public int hashCode() {
        return Objects.hash(participantId, matchHistory);
    }
}
