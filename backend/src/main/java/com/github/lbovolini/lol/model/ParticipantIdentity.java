package com.github.lbovolini.lol.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

@Entity
@AssociationOverrides({
        @AssociationOverride(name = "pk.matchHistory",
            joinColumns = @JoinColumn(name = "match_history_id")),
        @AssociationOverride(name = "pk.summoner",
            joinColumns = @JoinColumn(name = "summoner_id"))
})
public class ParticipantIdentity {

    @JsonIgnore
    private ParticipantIdentityId pk = new ParticipantIdentityId();

    @EmbeddedId
    public ParticipantIdentityId getPk() {
        return pk;
    }

    public void setPk(ParticipantIdentityId pk) {
        this.pk = pk;
    }

    private int participantId;
    //private Summoner summoner;

    @Transient
    @JsonIgnore
    public MatchHistory getMatchHistory() {
        return getPk().getMatchHistory();
    }

    public void setMatchHistory(MatchHistory matchHistory) {
        getPk().setMatchHistory(matchHistory);
    }

    @Transient
    public Summoner getSummoner() {
        return getPk().getSummoner();
    }

    public void setSummoner(Summoner summoner) {
        getPk().setSummoner(summoner);
    }

    public int getParticipantId() {
        return participantId;
    }

    public void setParticipantId(int participantId) {
        this.participantId = participantId;
    }


}
