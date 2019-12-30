package com.github.lbovolini.lol.repository;

import com.github.lbovolini.lol.model.ParticipantIdentity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ParticipantIdentityRepository extends JpaRepository<ParticipantIdentity, String> {

    //List<ParticipantIdentity> findByMatchHistoryId(long matchHistoryId, String summonerId);
}
