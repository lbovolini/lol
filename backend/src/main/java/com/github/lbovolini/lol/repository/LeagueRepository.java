package com.github.lbovolini.lol.repository;

import com.github.lbovolini.lol.model.League;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Set;

public interface LeagueRepository extends JpaRepository<League, String> {
    Set<League> findBySummonerId(String summonerId);
}
