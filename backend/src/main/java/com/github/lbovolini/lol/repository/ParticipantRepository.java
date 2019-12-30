package com.github.lbovolini.lol.repository;

import com.github.lbovolini.lol.model.Participant;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ParticipantRepository extends JpaRepository<Participant, Integer> {
}
