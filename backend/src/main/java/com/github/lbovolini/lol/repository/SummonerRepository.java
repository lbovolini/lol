package com.github.lbovolini.lol.repository;

import com.github.lbovolini.lol.model.Summoner;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SummonerRepository extends JpaRepository<Summoner, String> {
    Summoner findByNameIgnoreCaseAndPlatform(String name, String platform);
}
